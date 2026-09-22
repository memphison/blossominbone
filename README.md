# Blossomin' Bone — website

This is the source for the band's website. You don't need to know how
to code to update tour dates, Road Stories, merch, or photos — you
just need to edit a few plain text files. This guide walks through
the three things you'll do most often, plus how to preview your
changes before they go live.

Everything editable lives in one folder: **`src/content/`**. You
should never need to touch anything outside that folder (and
`public/images/`, where photos live) for day-to-day updates.

## Before you start

You'll need someone to run these one-time setup steps on your
computer (or use GitHub Codespaces / a similar cloud setup — ask
whoever manages the site to help with this part):

```bash
npm install       # installs everything the site needs
npm run dev        # starts a local preview at http://localhost:3000
```

Leave `npm run dev` running while you edit. Every time you save a
file, the preview in your browser updates automatically — no need to
restart anything.

Each content file lives in `src/content/` and is a plain list of
entries. Copy an existing entry, change the words inside the quote
marks, and save. As long as you keep the commas, colons, and quote
marks in the same place, you can't break anything by editing text.

---

## Adding a tour date

Open **`src/content/shows.ts`**.

When there are no shows booked, the file looks like this:

```ts
export const shows: Show[] = [];
```

The Tour section shows an honest "nothing on the books right now"
message instead of hiding itself when this list is empty. To add a
show, put something between the brackets:

```ts
export const shows: Show[] = [
  {
    date: "2026-10-08",
    city: "Savannah, Georgia",
    venue: "The Wormhole",
    ticketHref: "https://example.com/tickets",
  },
];
```

- `date` must be in `YYYY-MM-DD` format — it gets turned into "Oct 08"
  automatically on the site.
- Add a comma after each show's closing `}` if you're adding another
  one below it.
- `ticketHref` is the link the "Get Tickets" button opens. If you
  don't have a link yet, leave it as `"#"`.

## Writing a Road Story

Open **`src/content/posts.ts`**. Each story is one entry in the list:

```ts
{
  date: "Aug 14",
  location: "Waycross, Georgia",
  title: "Somewhere Between Brantley County and Hell",
  excerpt: "Truck quit on us outside Waycross with the banjo and the suitcase kick still in the back...",
  href: "#",
},
```

Copy one of the existing entries, change `date`, `location`, `title`,
and `excerpt`, and save. `href` can point to a full write-up elsewhere
(or stay `"#"` for now). New stories can go anywhere in the list —
order on the page follows the order in the file.

To add a photo to a story, see **Swapping in a real photo** below.

## Adding merch

Open **`src/content/products.ts`**. Same idea:

```ts
{
  name: "Bird Dog Vinyl",
  price: "$20",
  buyHref: "#",
  placeholderLabel: "Product photo\nBird Dog LP",
},
```

`buyHref` is where the "Buy" button sends people.

---

## Swapping in a real photo

Right now the band portrait, the three Road Stories photos, and the
three product photos are all gray placeholder boxes — that's
intentional until real photos are ready. Swapping one in takes two
steps:

**1. Add the photo file.**
Drop the image into `public/images/` (any normal filename, e.g.
`ayron-and-bobby.jpg`). You'll also need its pixel dimensions — on
Windows, right-click the file → Properties → Details → look for
"Width" and "Height"; on a Mac, right-click → Get Info.

**2. Point to it from the content file.**

- **Band portrait** — open `src/content/site.ts`, find the `about`
  section, and add a `portrait` field:

  ```ts
  about: {
    // ...existing fields stay as they are...
    portrait: {
      src: "/images/ayron-and-bobby.jpg",
      alt: "Ayron and Bobby standing outside a gas station",
      width: 1200,
      height: 1500,
    },
  },
  ```

- **Road Story photo** — in `src/content/posts.ts`, add an `image`
  field to that story:

  ```ts
  {
    date: "Aug 14",
    location: "Waycross, Georgia",
    title: "Somewhere Between Brantley County and Hell",
    excerpt: "...",
    href: "#",
    image: {
      src: "/images/waycross-tow.jpg",
      alt: "The van on the shoulder outside Waycross",
      width: 1200,
      height: 960,
    },
  },
  ```

- **Product photo** — same pattern in `src/content/products.ts`, using
  an `image` field on that product.

The `width`/`height` you enter don't need to be exact — they just need
to match the photo's real proportions (a 4:5 photo should keep roughly
that ratio), so the page doesn't jump around while the photo loads.
Once an `image` is set, the gray placeholder is replaced automatically
— nothing else on the page needs to change.

---

## Other things you can edit in `src/content/`

- **`site.ts`** — booking email, social links, the "Don't give up on
  ya dreams" footer line, the About section bio text, and the Media
  panel descriptions (Photos / Live Video / Press / Booking).
- **`album.ts`** — the track list, album blurb, and the personnel
  credits at the bottom of the Music section.

A small formatting trick used in the bio text: wrapping a word or
phrase in underscores italicizes it, e.g. `_State Line Schemers_`
renders as *State Line Schemers*.

## Previewing before it goes live

With `npm run dev` running, visit `http://localhost:3000` in your
browser — that's a live preview of exactly what visitors will see,
running on your own computer. Nothing you do there affects the real
site until someone deploys the changes (ask whoever manages hosting
about that step, or see below if that's you).

## For whoever manages hosting

Standard Next.js app, App Router, TypeScript, no Tailwind (CSS Modules
per component + `src/app/globals.css` for design tokens). `npm run
build` produces a static-optimized production build. Deploys cleanly
to Vercel with zero configuration — connect the repo and it just
works. `next/image` handles photo optimization automatically.

**A note on this repo:** it currently lives under a personal GitHub
account as a temporary home during development. It's intended to be
transferred to the band's own GitHub account before or at launch —
so please keep it free of anything personal to that account (no
personal access tokens, no unrelated project references, no comments
assuming a specific maintainer). Everything in it should read as
belonging to Blossomin' Bone, not to whoever set it up.
