import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { Providers } from "./ProviderLayout";
// import { Providers } from "./Providers"; // 👈 import the new wrapper
import { Analytics } from '@vercel/analytics/next';


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "MindVerse - Share Your Thoughts With The World",
    template: "%s | MindVerse"
  },
  description: "MindVerse is a modern blogging platform where writers and thinkers connect. Create, share, and discover stories that matter. Join our community of creators today.",
  keywords: ["blogging platform", "write articles", "share stories", "mindverse", "online journal", "content creation", "digital writing", "thoughts", "community blog"],
  authors: [{ name: "MindVerse Team" }],
  creator: "MindVerse Team",
  publisher: "MindVerse",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "MindVerse - Share Your Thoughts With The World",
    description: "Join MindVerse, the modern space for writers and thinkers. Share your stories and connect with a global community.",
    url: "https://mindverse.vercel.app", // Adjust if you have a custom domain
    siteName: "MindVerse",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MindVerse - Share Your Thoughts With The World",
    description: "Join MindVerse, the modern space for writers and thinkers. Share your stories and connect with a global community.",
    creator: "@mindverse", // Add your actual twitter handle if you have one
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <Navbar />
          <main>{children}</main>
        </Providers>
        <Analytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "MindVerse",
              "url": "https://mindverse.vercel.app",
              "description": "A modern blogging platform for thinkers and writers.",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://mindverse.vercel.app/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            }),
          }}
        />
      </body>
    </html>
  );
}
