export interface PostImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface RoadStoryPost {
  date: string;
  location: string;
  title: string;
  excerpt: string;
  href: string;
  /** Omit to render the placeholder shot instead of a photo. */
  image?: PostImage;
}

export const posts: RoadStoryPost[] = [
  {
    date: "Aug 14",
    location: "Waycross, Georgia",
    title: "Somewhere Between Brantley County and Hell",
    excerpt:
      "Truck quit on us outside Waycross with the banjo and the suitcase kick still in the back. Played the parking lot for three hours waiting on a tow and made more than the show would've paid.",
    href: "#",
  },
  {
    date: "Jul 02",
    location: "St. Simons Island, Georgia",
    title: "The Dog That Sat In On Two Songs",
    excerpt:
      "Placeholder entry. Swap for something real — the pier, the crowd that gathered, whoever's dog it was.",
    href: "#",
  },
  {
    date: "Jun 19",
    location: "Lulaton, Georgia",
    title: "Twelve Songs at Turkey Ridge",
    excerpt:
      "Placeholder entry. Cutting the record — what the room sounded like, who brought what, how long it took.",
    href: "#",
  },
];
