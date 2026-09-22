import Reveal from "./Reveal";
import styles from "./SectionIntro.module.css";

export default function SectionIntro({ children }: { children: string }) {
  return (
    <Reveal as="p" className={styles.opener}>
      {children}
    </Reveal>
  );
}
