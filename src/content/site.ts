export interface NavLink {
  label: string;
  href: string;
}

export interface AboutMember {
  name: string;
  alias?: string;
  role: string;
}

export interface MediaPanel {
  title: string;
  description: string;
  href: string;
  cta: string;
}

export interface AboutPhoto {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface AboutContent {
  heading: string;
  lede: string;
  paragraphs: string[];
  members: AboutMember[];
  /** Omit to render the placeholder shot instead of a photo. */
  portrait?: AboutPhoto;
  portraitCaption?: string;
}

export const BANDCAMP_URL = "https://blossominbone.bandcamp.com";
export const BIRD_DOG_VINYL_URL = "https://www.snakepissrecords.com/product/blossomin-bone-bird-dog-lp";

export const site = {
  name: "Blossomin' Bone",
  origin: "Brantley County, Georgia",
  bookingEmail: "blossominbonebooking@gmail.com",

  label: {
    name: "Snake Piss Records",
    url: "https://www.snakepissrecords.com",
  },

  social: {
    instagram: "https://instagram.com/blossominbone",
    facebook: "https://www.facebook.com/blossominbone/",
    youtube: "https://www.youtube.com/channel/UCnC_he3u5koFnmwIjm3uGRw",
    spotify: "https://open.spotify.com/artist/0q0f6cOnDvBnTg5KKAsTK8",
    appleMusic: "https://music.apple.com/us/artist/blossomin-bone/1571072932",
  },

  motto: ["Don't give up on ya dreams.", "Not once, not now, not ever."],

  nav: [
    { label: "About", href: "#about" },
    { label: "Music", href: "#music" },
    { label: "Tour", href: "#tour" },
    { label: "Road Stories", href: "#stories" },
    { label: "Merch", href: "#merch" },
    { label: "Media", href: "#media" },
  ] satisfies NavLink[],

  hero: {
    // same destination as Music's "Listen" — the record's the record
    listenHref: BANDCAMP_URL,
    tourHref: "#tour",
  },

  about: {
    heading: "It all started on the sidewalk.",
    lede: "Open a case, set an old coffee can down, and play until people quit walking. That is still most of what they do.",
    paragraphs: [
      `Ayron grew up out in Nahunta. She came to music late — Bobby taught her guitar after they met, and she was busking with the crew not long after. Bobby has wanted to be in a band since he was eleven, banging on his grandmother's upright lime-green piano. He writes close to a song a week and sends them to the group chat, lyrics and all.`,
      `They named an early record _State Line Schemers_ after the habit that paid for it: setting up outside a gas station somewhere between Georgia and Florida and playing for gas money, whether or not they needed the gas. Eventually they quit their jobs and went out full time.`,
    ],
    members: [
      { name: "Ayron Moleen", role: "Guitar / Vocals" },
      { name: "Joshua Tison", alias: '"Hollering Bob"', role: "Stomp / Tam / Banjo / Vocals" },
    ] satisfies AboutMember[],
    // PLACEHOLDER — pulled from the band's own social media; photographer
    // is unknown and uncredited. Do not let this go live until Ayron and
    // Bobby confirm it's theirs to use, or send the original + credit.
    portrait: {
      src: "/images/band-photo.webp",
      alt: "Ayron and Bobby playing guitar and banjo outside a bar at night",
      width: 970,
      height: 647,
    },
    portraitCaption: "Ayron & Bobby",
  } as AboutContent,

  tour: {
    // shown only once real shows exist
    note: "Half of what we do never makes this list. Pier, gas station lot, somebody's porch.",
    // shown instead of `note` while `shows` is empty — the two used to say this twice
    emptyState:
      "Nothing on the books right now — and half of what we play never makes this list anyway: pier, gas station lot, somebody's porch. Reach out about booking a show, or follow along for the next date.",
  },

  media: [
    { title: "Photos", description: "High resolution, free to use with a credit.", href: "#", cta: "Open" },
    { title: "Live Video", description: "Sidewalks, stages and parking lots.", href: "#", cta: "Watch" },
    { title: "Press", description: "Write-ups, interviews and the one-page bio.", href: "#", cta: "Read" },
    {
      title: "Booking",
      description: "Bars, festivals, porches, weddings, pier benches.",
      href: "mailto:blossominbonebooking@gmail.com",
      cta: "Email",
    },
  ] satisfies MediaPanel[],

  mailingList: {
    heading: "Join the list",
    body: "New records, new towns, and a heads up before we come through yours. We send this rarely.",
    buttonLabel: "Sign up",
  },
  /**
   * POST target for the mailing list form. Leave empty until a provider
   * is chosen — the signup falls back to a prefilled mailto: to
   * bookingEmail so it still does something real. Once you have an
   * embed-form endpoint, put its URL here (no other code changes needed).
   */
  mailingListAction: "",
};
