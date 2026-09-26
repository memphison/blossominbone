import Image from "next/image";
import Container from "../ui/Container";
import Reveal from "../ui/Reveal";
import SectionIntro from "../ui/SectionIntro";
import Placeholder from "../ui/Placeholder";
import { site } from "@/content/site";
import { renderEmphasis } from "./emphasis";
import styles from "./About.module.css";

export default function About() {
  const { about } = site;

  return (
    <section id="about" className={styles.about}>
      <Container>
        <SectionIntro>About</SectionIntro>

        <div className={styles.intro}>
          <Reveal className={styles.photoBlock}>
            {about.portrait ? (
              <Image
                src={about.portrait.src}
                alt={about.portrait.alt}
                width={about.portrait.width}
                height={about.portrait.height}
                className={styles.portrait}
                loading="lazy"
              />
            ) : (
              <Placeholder aspectRatio="3/2" label={"Band portrait\n3:2"} className={styles.portrait} />
            )}
            {(about.portraitCaption || !about.portrait) && (
              <p className={styles.caption}>{about.portraitCaption ?? "Ayron & Bobby — photo needed"}</p>
            )}
          </Reveal>

          <Reveal className={styles.copy}>
            <h2 className={styles.heading}>{about.heading}</h2>
            <p className={styles.lede}>{about.lede}</p>
            {about.paragraphs.map((paragraph, i) => (
              <p key={i}>{renderEmphasis(paragraph)}</p>
            ))}
          </Reveal>
        </div>

        <div className={styles.people}>
          {about.members.map((member, i) => (
            <Reveal key={member.name} delayMs={(i % 3) * 90}>
              <div className={styles.name}>{member.name}</div>
              {member.alias && <div className={styles.alias}>{member.alias}</div>}
              <div className={styles.role}>{member.role}</div>
            </Reveal>
          ))}
        </div>

        {/* the band's name, drawn: flowers growing out of bone */}
        <div className={styles.signature}>
          <Reveal art>
            <Image
              src="/images/bouquet.webp"
              alt="A bouquet of hydrangeas, dahlias, honeysuckle and magnolia growing out of two bone vessels"
              width={1150}
              height={1279}
              sizes="(max-width: 700px) 92vw, 680px"
              loading="lazy"
              className={styles.artImg}
            />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
