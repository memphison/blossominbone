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

Tour dates are **not** edited as a file anymore — they live in a
database, managed through a password-protected admin panel at
`/admin` (e.g. `https://yoursite.com/admin`). Log in there and use
"+ Add a tour date" to add one, or "Edit" / "Delete" on an existing
one. No code changes, no deploy needed — it shows up on the public
Tour section as soon as you save it (within about a minute).

The Tour section only ever shows *upcoming* dates — anything before
today quietly drops off the public page on its own but stays in the
admin panel's "Show past shows" archive, so nothing needs to be
deleted just because the show already happened.

A few fields worth knowing when adding one:

- **Venue name** becomes a link if you fill in a **URL** (a ticket
  page, venue site, etc.) or a **social link** (just the Instagram
  handle, with or without the `@`). If both are filled in, the URL
  wins.
- **Note** renders as a small italic line under the venue — it's meant
  for something like "with The Whistling Butcher", not a full
  paragraph.
- **City / State** are optional; leave them blank for a house show or
  anywhere you'd rather not publish the exact location.

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

The three Road Stories photos and the three product photos are all
gray placeholder boxes — that's intentional until real photos are
ready. Swapping one in takes two steps below.

**⚠️ The band portrait is a placeholder that needs your OK before it
can stay.** `band-photo.webp` (Ayron and Bobby playing outside a bar)
was pulled from the band's own social media to get the layout right.
The photographer is unknown and uncredited, and nobody has confirmed
it's cleared to use on the site. **Do not let this go live** until
Ayron and Bobby either confirm it's theirs to use, or send the
original file and the photographer's name so they can be credited.
Once that's settled, update `portraitCaption` in `src/content/site.ts`
(currently just "Ayron & Bobby") to include the photographer credit if
one is owed.

**1. Add the photo file.**
Drop the image into `public/images/` (any normal filename, e.g.
`ayron-and-bobby.jpg`). You'll also need its pixel dimensions — on
Windows, right-click the file → Properties → Details → look for
"Width" and "Height"; on a Mac, right-click → Get Info.

**2. Point to it from the content file.**

- **Band portrait** — open `src/content/site.ts`, find the `about`
  section, and update the `portrait` field (it's already set to the
  placeholder photo — see the warning above). The layout expects a
  landscape (wider-than-tall) photo, roughly 3:2:

  ```ts
  about: {
    // ...existing fields stay as they are...
    portrait: {
      src: "/images/ayron-and-bobby.jpg",
      alt: "Ayron and Bobby standing outside a gas station",
      width: 1200,
      height: 800,
    },
    portraitCaption: "Ayron & Bobby",
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
to Vercel — connect the repo, set the two environment variables below,
and it works. `next/image` handles photo optimization automatically.

The rest of the site is static content edited through the files in
`src/content/`, but tour dates are the one piece backed by a real
database (Postgres via Prisma — see `prisma/schema.prisma`) behind a
small admin panel at `/admin`. The homepage revalidates every 60
seconds (`export const revalidate = 60` in `src/app/page.tsx`) so a
date added in the admin panel shows up on the public page without a
redeploy — everything else on the page is unaffected by that and
stays effectively static.

**A note on this repo:** it currently lives under a personal GitHub
account as a temporary home during development. It's intended to be
transferred to the band's own GitHub account before or at launch —
so please keep it free of anything personal to that account (no
personal access tokens, no unrelated project references, no comments
assuming a specific maintainer). Everything in it should read as
belonging to Blossomin' Bone, not to whoever set it up.

**Pushing this local repo to GitHub for the first time:**

```bash
# on github.com: create a new PRIVATE repo named "blossominbone" — leave it
# empty (no README/license/gitignore, this repo already has all three)

git remote add origin https://github.com/<your-username>/blossominbone.git
git branch -M main
git push -u origin main
```

**Connecting Vercel:** on vercel.com, "Add New… → Project", import the
`blossominbone` GitHub repo, leave every build setting on its default
(Next.js is auto-detected), and deploy.

**Environment variables** (set these in Vercel's Project Settings →
Environment Variables, and in a local `.env` for development — see
`.env` on this machine for the working values):

- `DATABASE_URL` — the Postgres connection string the tour dates admin
  panel and the public Tour section both read from.
- `ADMIN_PASSWORD` — the password that gates `/admin` and any
  non-`GET` request to `/api/tour-dates`. `GET` requests (what the
  public Tour section uses) are open to anyone, by design.
