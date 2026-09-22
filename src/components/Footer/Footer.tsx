import Image from "next/image";
import Container from "../ui/Container";
import Reveal from "../ui/Reveal";
import { site } from "@/content/site";
import { externalLinkProps } from "@/lib/externalLinkProps";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <Reveal className={styles.creed}>
          <Image
            src="/images/skull-ram.webp"
            alt=""
            aria-hidden
            width={820}
            height={853}
            className={styles.creedImg}
            loading="lazy"
          />
          <p className={styles.mottoText}>
            {site.motto.map((line, i) => (
              <span key={i}>
                {i > 0 && <br />}
                {line}
              </span>
            ))}
          </p>
        </Reveal>

        <div className={styles.meta}>
          <a className={styles.label} href={site.label.url} {...externalLinkProps(site.label.url)}>
            {site.label.name}
          </a>
          <div className={styles.socials}>
            <a className={styles.label} href={site.social.instagram} {...externalLinkProps(site.social.instagram)}>
              Instagram
            </a>
            <a className={styles.label} href={site.social.facebook} {...externalLinkProps(site.social.facebook)}>
              Facebook
            </a>
            <a className={styles.label} href={site.social.youtube} {...externalLinkProps(site.social.youtube)}>
              YouTube
            </a>
            <a className={styles.label} href={site.social.spotify} {...externalLinkProps(site.social.spotify)}>
              Spotify
            </a>
            <a
              className={styles.label}
              href={site.social.appleMusic}
              {...externalLinkProps(site.social.appleMusic)}
            >
              Apple Music
            </a>
            <a className={styles.label} href={`mailto:${site.bookingEmail}`}>
              Email
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
