import type { Config } from "tailwindcss";
import themeConfig from "./theme.config";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: themeConfig.colors.background,
        text: themeConfig.colors.text,
      },
      fontFamily: {
        heading: ["var(--font-playfair)", "serif"],
        body: ["var(--font-source-serif)", "serif"],
        ui: ["var(--font-inter)", "sans-serif"],
        cursive: ["var(--font-great-vibes)", "cursive"],
      },
    },
  },
  plugins: [],
};
export default config;
