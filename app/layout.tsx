import "../global.css";
import { Inter } from "@next/font/google";
import LocalFont from "@next/font/local";
import { Metadata } from "next";
import { Analytics } from "./components/analytics";

export const metadata: Metadata = {
  title: {
    default: "Frankazastain Studio",
    template: "%s | Frankazastain Studio",
  },
  description: "Creative Design & Technology Solutions for your business",
  openGraph: {
    title: "Frankazastain Studio",
    description: "We help businesses grow with modern web development, UI/UX design, and branding",
    url: "https://frankazastain.com",
    siteName: "Frankazastain Studio",
    images: [
      {
        url: "https://frankazastain.com/og.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en-US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: "Frankazastain Studio",
    card: "summary_large_image",
    description: "Creative Design & Technology Solutions for your business",
  },
  icons: {
    shortcut: "/Frankazastain.png",
  },
};
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const calSans = LocalFont({
  src: "../public/fonts/CalSans-SemiBold.ttf",
  variable: "--font-calsans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={[inter.variable, calSans.variable].join(" ")}>
      <head>
        <Analytics />
      </head>
      <body
        className={`bg-black ${process.env.NODE_ENV === "development" ? "debug-screens" : undefined
          }`}
      >
        {children}
      </body>
    </html>
  );
}
