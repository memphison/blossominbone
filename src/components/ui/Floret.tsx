import Image from "next/image";
import type { CSSProperties } from "react";
import Reveal from "./Reveal";
import type { FloretAsset } from "@/content/florets";
import styles from "./Floret.module.css";

/** Section-transition flower. Sits in its own flex slot, aligned by the layout — not a margin hack. */
export default function Floret({ src, alt, width, height, align, maxWidth }: FloretAsset) {
  const style = maxWidth ? ({ "--floret-max": `${maxWidth}px` } as CSSProperties) : undefined;

  return (
    <div className={align === "left" ? styles.slotLeft : styles.slotRight}>
      <Reveal className={styles.floret} style={style}>
        <Image src={src} alt={alt} width={width} height={height} aria-hidden loading="lazy" />
      </Reveal>
    </div>
  );
}
