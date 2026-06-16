const themeConfig = {
  siteName: "The Sid Pen",
  tagline: "A premium editorial theme for writers who take their words seriously.",
  authorName: "Sid",
  colors: {
    background: "#FAF8F5",
    text: "#1a1a18",
  },
  navLinks: [
    { label: "Home", href: "/" },
    { label: "Essays", href: "/category/essays" },
    { label: "Opinion", href: "/category/opinion" },
    { label: "Narratives", href: "/category/narratives" },
    { label: "Fiction", href: "/category/fiction" },
    { label: "About", href: "/about" },
  ],
  footerText: "Being Rational",
  socialLinks: [
    { label: "Twitter", href: "https://twitter.com" },
    { label: "Substack", href: "https://substack.com" },
  ],
  homepageSections: {
    showHero: true,
    showQuoteStrip: true,
    showArchiveGrid: true,
    showReadingList: true,
  },
  quoteStrip: {
    quote: "Words are, of course, the most powerful drug used by mankind.",
    author: "Rudyard Kipling"
  }
};

export default themeConfig;
