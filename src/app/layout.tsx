import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"], // normal, medium, bold
  display: "swap", // improves performance
  variable: "--font-roboto",
});


export const metadata: Metadata = {
  title: "PitchPost",
  description: "Find pitch competitions to grow your student startup",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Google AdSense verification meta tag */}
        <meta
          name="google-adsense-account"
          content="ca-pub-9685241323439812"
        />

        {/* ✅ Load AdSense script (keep this too) */}
        <Script
          id="adsbygoogle-init"
          async
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9685241323439812"
          crossOrigin="anonymous"
        />
      </head>

      <body className={`${roboto.variable} ${roboto.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
