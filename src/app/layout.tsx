import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GEO Tool — Generative Engine Optimization",
  description: "Help your brand appear in ChatGPT, Claude, Perplexity, and Gemini answers. Analyze your AI visibility and get actionable recommendations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <footer className="border-t border-[var(--card-border)] py-8 text-center text-sm text-[var(--muted)]">
          <p>© {new Date().getFullYear()} GEO Tool — Generative Engine Optimization</p>
        </footer>
      </body>
    </html>
  );
}