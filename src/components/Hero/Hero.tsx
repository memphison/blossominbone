import Image from "next/image";
import Container from "../ui/Container";
import MailingListSignup from "../MailingListSignup/MailingListSignup";
import { site } from "@/content/site";
import { externalLinkProps } from "@/lib/externalLinkProps";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section id="hero" className={styles.hero}>
      <Container className={styles.inner}>
        <Image
          src="/images/logo.webp"
          alt={site.name}
          width={1280}
          height={181}
          className={styles.logo}
          sizes="(max-width: 700px) 77vw, 720px"
          priority
        />
        <p className={styles.origin}>{site.origin}</p>
        <Image
          src="/images/birddog.webp"
          alt="The Bird Dog — a winged dog, drawn in ink"
          width={820}
          height={870}
          className={styles.birddog}
          sizes="(max-width: 700px) 56vw, 400px"
        />
        <div className={styles.actions}>
          <a className={styles.action} href={site.hero.listenHref} {...externalLinkProps(site.hero.listenHref)}>
            Listen to Bird Dog
          </a>
          <a className={styles.action} href={site.hero.tourHref}>
            Tour Dates ↓
          </a>
        </div>

        <MailingListSignup className={styles.signup} />
      </Container>
    </section>
  );
}
