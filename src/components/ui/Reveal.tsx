"use client";

import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from "react";
import styles from "./Reveal.module.css";

interface RevealProps {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Use the slight-rotate variant for hand-drawn art. */
  art?: boolean;
  /** Stagger multiple Reveal siblings, e.g. 0, 90, 180. */
  delayMs?: number;
}

export default function Reveal({
  as: Tag = "div",
  children,
  className,
  style,
  art = false,
  delayMs = 0,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry], obs) => {
        if (!entry.isIntersecting) return;
        el.classList.add(styles.bloomed);
        obs.disconnect();
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const classes = [styles.bloom, art ? styles.art : "", className].filter(Boolean).join(" ");

  const mergedStyle = delayMs ? { ...style, transitionDelay: `${delayMs}ms` } : style;

  return (
    <Tag ref={ref} className={classes} style={mergedStyle}>
      {children}
    </Tag>
  );
}
