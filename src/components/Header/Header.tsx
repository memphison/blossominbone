"use client";

import { useEffect, useRef, useState } from "react";
import Container from "../ui/Container";
import { site } from "@/content/site";
import styles from "./Header.module.css";

export default function Header() {
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Expose the header's real rendered height so #hero and scroll-padding
  // can size against it exactly, instead of a guessed pixel constant.
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const setHeaderHeight = () => {
      document.documentElement.style.setProperty("--header-h", `${el.offsetHeight}px`);
    };
    setHeaderHeight();
    const observer = new ResizeObserver(setHeaderHeight);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <header ref={headerRef} className={stuck ? `${styles.header} ${styles.stuck}` : styles.header}>
      <Container className={styles.bar}>
        <a className={styles.home} href="#hero">
          {site.name}
        </a>
        <button
          className={styles.menuBtn}
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "Close" : "Menu"}
        </button>
        <nav id="site-nav" aria-label="Main" className={open ? `${styles.nav} ${styles.navOpen}` : styles.nav}>
          <ul>
            {site.nav.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={() => setOpen(false)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  );
}
