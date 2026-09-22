import type { Metadata } from "next";
import { Walter_Turncoat, League_Gothic, Barlow } from "next/font/google";
import "./globals.css";

const hand = Walter_Turncoat({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-hand",
  display: "swap",
});

const condensed = League_Gothic({
  subsets: ["latin"],
  variable: "--font-condensed",
  display: "swap",
});

const body = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Blossomin' Bone — Brantley County, Georgia",
  description:
    'Blossomin\' Bone. Ayron Moleen and Joshua "Hollering Bob" Tison. Bird Dog, out now on Snake Piss Records.',
  icons: {
    icon: "/images/birddog.webp",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${hand.variable} ${condensed.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
