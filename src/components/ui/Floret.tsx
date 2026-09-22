import Image from "next/image";
import Reveal from "./Reveal";
import styles from "./Floret.module.css";

interface FloretProps {
  src: string;
  width: number;
  height: number;
  align: "left" | "right";
}

/** Section-transition flower. Sits in its own flex slot, aligned by the layout — not a margin hack. */
export default function Floret({ src, width, height, align }: FloretProps) {
  return (
    <div className={align === "left" ? styles.slotLeft : styles.slotRight}>
      <Reveal className={styles.floret}>
        <Image src={src} alt="" width={width} height={height} aria-hidden loading="lazy" />
      </Reveal>
    </div>
  );
}
