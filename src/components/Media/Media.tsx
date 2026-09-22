import Container from "../ui/Container";
import Reveal from "../ui/Reveal";
import SectionIntro from "../ui/SectionIntro";
import { site } from "@/content/site";
import { externalLinkProps } from "@/lib/externalLinkProps";
import styles from "./Media.module.css";

export default function Media() {
  return (
    <section id="media" className={styles.media}>
      <Container>
        <SectionIntro>Media</SectionIntro>

        <Reveal as="div" className={styles.panels}>
          {site.media.map((panel) => (
            <a key={panel.title} className={styles.panel} href={panel.href} {...externalLinkProps(panel.href)}>
              <div>
                <h3>{panel.title}</h3>
                <p>{panel.description}</p>
              </div>
              <span className={styles.go}>
                {panel.cta} →
              </span>
            </a>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
