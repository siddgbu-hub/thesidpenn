import themeConfig from "../theme.config";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="font-cursive text-4xl lg:text-5xl text-text hover:opacity-80 transition-opacity">
      {themeConfig.siteName}
    </Link>
  );
}
