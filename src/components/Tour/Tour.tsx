import Container from "../ui/Container";
import Reveal from "../ui/Reveal";
import SectionIntro from "../ui/SectionIntro";
import Floret from "../ui/Floret";
import MailingListSignup from "../MailingListSignup/MailingListSignup";
import { site } from "@/content/site";
import { florets } from "@/content/florets";
import { externalLinkProps } from "@/lib/externalLinkProps";
import { prisma } from "@/lib/prisma";
import styles from "./Tour.module.css";

function formatTourDate(date: Date) {
  const includeYear = date.getUTCFullYear() !== new Date().getUTCFullYear();
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: includeYear ? "numeric" : undefined,
    timeZone: "UTC",
  }).format(date);
}

function venueHref(tourDate: { url: string | null; socialLink: string | null }) {
  if (tourDate.url) return tourDate.url;
  if (tourDate.socialLink) return `https://instagram.com/${tourDate.socialLink.replace(/^@/, "")}`;
  return null;
}

export default async function Tour() {
  // Stored dates are UTC midnight (a plain calendar date, no time-of-day
  // meaning) — comparing against UTC-midnight-today, rather than the
  // server's local midnight, keeps "today" from drifting a day depending
  // on where this runs.
  const now = new Date();
  const todayUtc = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));

  // The /api/tour-dates route intentionally returns every date, past and
  // future — the admin archive view depends on that. This "upcoming only"
  // filter is specific to the public page, so it lives here instead.
  const upcoming = await prisma.tourDate.findMany({
    where: { date: { gte: todayUtc } },
    orderBy: { date: "asc" },
  });

  return (
    <section id="tour" className={styles.tour}>
      <Container>
        <SectionIntro>Tour</SectionIntro>

        {upcoming.length === 0 ? (
          <Reveal className={styles.empty}>
            <p>{site.tour.emptyState}</p>
          </Reveal>
        ) : (
          <>
            <Reveal as="div" className={styles.shows}>
              {upcoming.map((show) => {
                const href = venueHref(show);
                const location = [show.city, show.state].filter(Boolean).join(", ");

                return (
                  <div key={show.id} className={styles.show}>
                    <div className={styles.dateCol}>
                      <span className={styles.date}>{formatTourDate(show.date)}</span>
                      <span className={styles.time}>{show.time}</span>
                    </div>
                    <div>
                      {href ? (
                        <a className={styles.venueName} href={href} {...externalLinkProps(href)}>
                          {show.venue}
                        </a>
                      ) : (
                        <span className={styles.venueName}>{show.venue}</span>
                      )}
                      {location && <span className={styles.location}>{location}</span>}
                      {show.note && <span className={styles.showNote}>{show.note}</span>}
                    </div>
                  </div>
                );
              })}
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
