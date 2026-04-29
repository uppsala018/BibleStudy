import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Source_Sans_3 } from "next/font/google";
import PwaBoot from "@/components/pwa-boot";
import "./globals.css";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const body = Source_Sans_3({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Logos & Legacy",
  description:
    "An installable Bible study and church history app built from free and redistributable Christian sources.",
  applicationName: "Logos & Legacy",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Logos & Legacy",
  },
  formatDetection: {
    telephone: false,
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/assets/art/catholic-icon.png",
    apple: "/assets/art/catholic-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#081a39",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <PwaBoot />
        {children}
      </body>
    </html>
  );
}
