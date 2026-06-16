import type { Metadata } from "next";
import "./globals.css";
import themeConfig from "../theme.config";
import Nav from "../components/Nav";
import TopBar from "../components/TopBar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: themeConfig.siteName,
  description: themeConfig.tagline,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Inter:wght@400;500;600&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;1,8..60,400&display=swap" rel="stylesheet" />
        <style dangerouslySetInnerHTML={{__html: `
          :root {
            --font-playfair: "Playfair Display", serif;
            --font-source-serif: "Source Serif 4", serif;
            --font-inter: "Inter", sans-serif;
            --font-great-vibes: "Great Vibes", cursive;
          }
        `}} />
      </head>
      <body className={`selection:bg-[#1a1a18] selection:text-[#FAF8F5]`}>
        <TopBar />
        <Nav />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
