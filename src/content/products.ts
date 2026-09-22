import { BIRD_DOG_VINYL_URL } from "./site";

export interface ProductImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface Product {
  name: string;
  price: string;
  buyHref: string;
  placeholderLabel: string;
  /** Omit to render the placeholder shot instead of a photo. */
  image?: ProductImage;
}

export const products: Product[] = [
  {
    name: "Bird Dog Vinyl",
    price: "$20",
    buyHref: BIRD_DOG_VINYL_URL,
    placeholderLabel: "Product photo\nBird Dog LP",
  },
  {
    name: "Blossomin' Bone Tee",
    price: "$25",
    buyHref: "#",
    placeholderLabel: "Product photo\nTee",
  },
  {
    name: "Tour Poster",
    price: "$15",
    buyHref: "#",
    placeholderLabel: "Product photo\nPoster",
  },
];
