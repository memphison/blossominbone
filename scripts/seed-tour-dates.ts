/**
 * One-off seed for the known October 2026 tour dates.
 *
 * Idempotent: upserts on the (date, venue) unique constraint, so
 * running this repeatedly never creates duplicates — it just brings
 * matching rows in line with the list below. Fields not listed here
 * (city, state, address, url, zip) are left untouched on existing
 * rows, so anything filled in later through the admin panel survives
 * a re-run.
 *
 * Run with: npx tsx scripts/seed-tour-dates.ts
 */
import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

interface SeedEntry {
  date: string; // YYYY-MM-DD
  venue: string;
  time: string;
  socialLink?: string;
  note?: string;
}

const entries: SeedEntry[] = [
  { date: "2026-10-02", venue: "Spinster Abbott's", time: "7:00 PM", socialLink: "@spinsterabbotts" },
  { date: "2026-10-03", venue: "Mallery Street", time: "8:00 PM", socialLink: "@thebaratmallery" },
  { date: "2026-10-04", venue: "Hootenanny's", time: "12:00 PM", socialLink: "@hootenannys_bbq" },
  { date: "2026-10-09", venue: "Mallery Street", time: "8:00 PM", socialLink: "@thebaratmallery" },
  {
    date: "2026-10-10",
    venue: "Coachella",
    time: "3:00 PM",
    socialLink: "@silvercowjax",
    note: "with @theericareeseshow, @sun.lowly, @meganmckenziemusic, @adamcottonmusic, @indefjax",
  },
  {
    date: "2026-10-16",
    venue: "Blue Jay Listening Room",
    time: "7:00 PM",
    socialLink: "@bluejayjax",
    note: "with @robert.taylor.smith, @hardlucksociety, @thewirebirds_gnv, @ramblerkane",
  },
  {
    date: "2026-10-17",
    venue: "Pareidolia Brewing Co.",
    time: "6:00 PM",
    socialLink: "@pareidoliabrewing",
    note: "with @ramblerkane",
  },
  {
    date: "2026-10-18",
    venue: "Guanabanas",
    time: "2:00 PM",
    socialLink: "@guanabanasrestaurant",
    note: "with @ramblerkane",
  },
  { date: "2026-10-23", venue: "Shrimp & Grits", time: "7:00 PM", note: "at the Skeet House Stage" },
];

async function main() {
  for (const entry of entries) {
    const date = new Date(entry.date);
    const socialLink = entry.socialLink ?? null;
    const note = entry.note ?? null;

    const result = await prisma.tourDate.upsert({
      where: { date_venue: { date, venue: entry.venue } },
      update: { time: entry.time, socialLink, note },
      create: { date, venue: entry.venue, time: entry.time, socialLink, note },
    });

    console.log(`#${result.id}  ${entry.date}  ${entry.venue}`);
  }
}

main()
  .then(() => {
    console.log(`Seeded ${entries.length} tour dates.`);
  })
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
