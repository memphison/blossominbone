export interface FloretAsset {
  src: string;
  alt: string;
  width: number;
  height: number;
  align: "left" | "right";
  /** Overrides the shared display-size clamp's upper bound (px), for
   * artwork whose visible content sits smaller within its canvas than
   * its siblings — same wrapper box, different cap so it reads at a
   * comparable size. */
  maxWidth?: number;
}

/**
 * Section-transition florets. Five more illustrations
 * (magnolia-white, magnolia-pink, hydrangea-red, zinnia-purple,
 * bluebell-blue) sit unused in public/images/ for later use
 * (Road Stories entry art, an Instagram card, a poster) — swapping
 * which flower appears where is a one-line edit here.
 */
export const florets = {
  music: {
    src: "/images/hydrangea-blue.webp",
    alt: "",
    width: 640,
    height: 627,
    align: "right",
  },
  tour: {
    src: "/images/honeysuckle-coral.webp",
    alt: "",
    width: 640,
    height: 630,
    align: "left",
  },
  merch: {
    src: "/images/hydrangea-yellow.webp",
    alt: "",
    width: 640,
    height: 635,
    align: "left",
  },
} satisfies Record<string, FloretAsset>;
