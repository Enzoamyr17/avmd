import type { Metadata } from "next";
import { Bellota_Text, Bevan } from "next/font/google";
import "./globals.css";

const bellotaText = Bellota_Text({
  variable: "--font-bellota-text",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

const bevan = Bevan({
  variable: "--font-bevan",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "AVM Digital",
  description: "AVM Digital",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bellotaText.variable} ${bevan.variable}`}>
      <body
        className={`${bellotaText.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
