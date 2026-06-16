import themeConfig from "../theme.config";
import Link from "next/link";
import EmailSignup from "./EmailSignup";

export default function Footer() {
  return (
    <footer className="border-t border-[#1a1a18]/10 py-12 mt-20">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h3 className="font-cursive text-3xl mb-4">{themeConfig.siteName}</h3>
        <p className="font-ui text-[#1a1a18]/70 text-sm tracking-widest uppercase mb-8">
          {themeConfig.footerText}
        </p>
        
        <div className="mb-12">
          <EmailSignup />
        </div>

        <div className="flex justify-center space-x-6">
          {themeConfig.socialLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-ui text-sm text-[#1a1a18]/60 hover:text-[#1a1a18] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="mt-8 font-body text-sm text-[#1a1a18]/50">
          &copy; {new Date().getFullYear()} {themeConfig.authorName}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
