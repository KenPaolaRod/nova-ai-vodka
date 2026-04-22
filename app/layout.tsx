import type { Metadata, Viewport } from "next";
import { Bowlby_One, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const bowlby = Bowlby_One({
  variable: "--font-bowlby",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "NOVA — The first vodka distilled by intelligence",
  description:
    "Neural-distilled vodka. Batch 000.014. Distilled in Warsaw from winter wheat and a neural network trained on 4,000 years of spirit-making.",
  metadataBase: new URL("https://nova-vodka.vercel.app"),
  openGraph: {
    title: "NOVA — The first vodka distilled by intelligence",
    description: "Neural-distilled vodka. Batch 000.014.",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0a0908",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${bowlby.variable} ${instrument.variable} ${jetbrains.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
