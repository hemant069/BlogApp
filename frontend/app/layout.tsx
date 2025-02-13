import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./Context/AuthContext";
import { BlogProvider } from "./Context/BlogContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MindVerse",
  description:
    "MindVerse is platfrom where people can come write there thought",
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
        <AuthProvider>
          <BlogProvider>
            <Navbar />
            <main>{children}</main>
          </BlogProvider>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
