import Image from "next/image";
import Container from "../ui/Container";
import Reveal from "../ui/Reveal";
import SectionIntro from "../ui/SectionIntro";
import Floret from "../ui/Floret";
import { album } from "@/content/album";
import { florets } from "@/content/florets";
import { externalLinkProps } from "@/lib/externalLinkProps";
import styles from "./Music.module.css";

export default function Music() {
  return (
    <section id="music" className={styles.music}>
      <Container>
        <SectionIntro>Music</SectionIntro>

        <div className={styles.record}>
          <Reveal art>
            {/* The sleeve is assembled from its own parts, positioned relative
                to a fixed square container, so the proportions hold at every
                size — not stacked in flex with percentage widths/margins. */}
            <div className={styles.sleeve}>
              <Image
                src="/images/logo.webp"
                alt=""
                width={1280}
                height={181}
                className={styles.sleeveLogo}
                loading="lazy"
              />
              <Image
                src="/images/birddog.webp"
                alt=""
                width={820}
                height={870}
                className={styles.sleeveDog}
                loading="lazy"
              />
              <Image
                src="/images/birddog-title.webp"
                alt="Bird Dog"
                width={800}
                height={275}
                className={styles.sleeveTitle}
                loading="lazy"
              />
            </div>
          </Reveal>

          <div>
            <Reveal>
              <h2 className={styles.heading}>{album.title}</h2>
              <p className={styles.lede}>{album.lede}</p>
              <p className={styles.format}>{album.format}</p>
              <div className={styles.actions}>
                <a className={styles.action} href={album.listenHref} {...externalLinkProps(album.listenHref)}>
                  Listen
                </a>
                <a className={styles.action} href={album.buyHref} {...externalLinkProps(album.buyHref)}>
                  Buy Vinyl
                </a>
              </div>
            </Reveal>
            <Reveal>
              <Image
                src="/images/record-label.webp"
                alt="The Snake Piss Records centre label"
                width={1000}
                height={1042}
                className={styles.disc}
                loading="lazy"
              />
            </Reveal>
          </div>
        </div>

        <div className={styles.tracks}>
          {album.sides.map((side, i) => (
            <Reveal key={side.label} delayMs={(i % 3) * 90}>
              <div className={styles.sideHead}>
                <Image src={side.doodle.src} alt={side.doodle.alt} width={side.doodle.width} height={side.doodle.height} loading="lazy" />
                <h3>{side.label}</h3>
              </div>
              <ol>
                {side.tracks.map((track) => (
                  <li key={track.title}>
                    {track.title}
                    {track.feat && <span className={styles.feat}>{track.feat}</span>}
                  </li>
                ))}
              </ol>
            </Reveal>
          ))}
        </div>

        <Reveal className={styles.personnel}>
          {album.personnel.map((credit) => (
            <span key={credit.role} className={styles.creditLine}>
              {credit.role}: <span className={styles.creditName}>{credit.name}</span>
            </span>
          ))}
        </Reveal>

        <Floret {...florets.music} />
      </Container>
    </section>
  );
}
