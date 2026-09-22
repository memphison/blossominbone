import { BANDCAMP_URL, BIRD_DOG_VINYL_URL } from "./site";

export interface Track {
  title: string;
  feat?: string;
}

export interface AlbumSide {
  label: string;
  doodle: { src: string; alt: string; width: number; height: number };
  tracks: Track[];
}

export interface PersonnelCredit {
  role: string;
  name: string;
}

export const album = {
  title: "Bird Dog",
  format: '12" black vinyl · Snake Piss Records',
  lede: "Twelve songs about trains, heartache, couch-surfin' and campin' stories. Cut at Turkey Ridge Syndicate in Lulaton, Georgia.",
  listenHref: BANDCAMP_URL,
  buyHref: BIRD_DOG_VINYL_URL,

  sides: [
    {
      label: "Side A",
      doodle: { src: "/images/doodle-guitar.webp", alt: "", width: 640, height: 668 },
      tracks: [
        { title: "Boots Off" },
        { title: "Wasted Youth" },
        { title: "How Things End Up" },
        { title: "Caroline" },
        { title: "Tomorrow's Goodbye" },
        { title: "Love Life" },
      ],
    },
    {
      label: "Side B",
      doodle: { src: "/images/doodle-banjo.webp", alt: "", width: 640, height: 678 },
      tracks: [
        { title: "Raise Hell" },
        { title: "Never Hear Your Name" },
        { title: "Created to Be" },
        { title: "Tell Ya Again" },
        { title: "Dogs in Brantley" },
        { title: "Down the Line", feat: 'ft. "The Whistling Butcher" Nick Solomon' },
      ],
    },
  ] satisfies AlbumSide[],

  personnel: [
    { role: "Guitar / Vocals", name: "Ayron Moleen" },
    { role: "Stomp / Tam / Banjo / Vocals", name: 'Joshua Tison aka "Hollering Bob"' },
    { role: "Washboard / Accordion / Vocals", name: "Amanda Syrinek" },
    { role: "Upright Bass / Vocals", name: "Holly Bassett" },
    { role: "Harmonica", name: '"The Whistling Butcher" Nick Solomon' },
    { role: "Recording / Mixing / Mastering", name: "Turkey Ridge Syndicate & Ryan Stanley" },
    { role: "Album Artwork", name: 'Goran Rister & Taylin "Tater Mae" Dickerson' },
    { role: "Layout & Design", name: "Sean Hanson" },
  ] satisfies PersonnelCredit[],
};
