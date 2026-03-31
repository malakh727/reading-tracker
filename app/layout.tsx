import type { Metadata } from "next";
import { Space_Grotesk, Manrope } from "next/font/google";
import Navbar from "./_components/Navbar";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "ReadingTracker",
  description: "Track every book, article, and paper you read.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${manrope.variable} h-full antialiased`}>
      <body className="min-h-full bg-canvas text-text">
        {/* Fixed left sidebar */}
        <Navbar />

        {/* Fixed top header */}
        <header className="fixed top-0 left-72 right-0 h-20 z-30 flex items-center px-8 backdrop-blur-[12px] bg-[rgba(0,14,34,0.8)] border-b border-[rgba(157,143,255,0.08)] shadow-[0px_20px_40px_0px_rgba(157,143,255,0.08)]">
          <p className="font-heading text-xl font-bold bg-gradient-to-r from-purple to-purple-deep bg-clip-text text-transparent">
            ReadingTracker
          </p>
        </header>

        {/* Main content */}
        <main className="pl-72 pt-20 min-h-screen">
          <div className="px-8 py-10">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
