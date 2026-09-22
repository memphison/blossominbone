import Container from "../ui/Container";
import Reveal from "../ui/Reveal";
import SectionIntro from "../ui/SectionIntro";
import Floret from "../ui/Floret";
import MailingListSignup from "../MailingListSignup/MailingListSignup";
import { shows } from "@/content/shows";
import { site } from "@/content/site";
import { florets } from "@/content/florets";
import { externalLinkProps } from "@/lib/externalLinkProps";
import styles from "./Tour.module.css";

function formatShowDate(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", { month: "short", day: "2-digit" });
}

export default function Tour() {
  return (
    <section id="tour" className={styles.tour}>
      <Container>
        <SectionIntro>Tour</SectionIntro>

        {shows.length === 0 ? (
          <Reveal className={styles.empty}>
            <p>{site.tour.emptyState}</p>
          </Reveal>
        ) : (
          <>
            <Reveal as="div" className={styles.shows}>
              {shows.map((show) => (
                <a
                  key={`${show.date}-${show.city}`}
                  className={styles.show}
                  href={show.ticketHref}
                  {...externalLinkProps(show.ticketHref)}
                >
                  <span className={styles.date}>{formatShowDate(show.date)}</span>
                  <span className={styles.city}>
                    {show.city}
                    <span className={styles.venue}>{show.venue}</span>
                  </span>
                  <span className={styles.go}>Get Tickets →</span>
                </a>
              ))}
            </Reveal>

            <Reveal as="p" className={styles.note}>
              {site.tour.note}
            </Reveal>
          </>
        )}

        <MailingListSignup className={styles.signup} />

        <Floret {...florets.tour} />
      </Container>
    </section>
  );
}
