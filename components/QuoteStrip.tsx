import themeConfig from "../theme.config";

export default function QuoteStrip() {
  if (!themeConfig.homepageSections.showQuoteStrip) return null;

  return (
    <section className="bg-[#1a1a18] text-[#FAF8F5] py-20 my-16 w-full">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <blockquote className="font-heading text-3xl md:text-4xl lg:text-5xl leading-tight mb-8">
          "{themeConfig.quoteStrip.quote}"
        </blockquote>
        <cite className="font-ui text-sm uppercase tracking-widest text-white/70 not-italic">
          — {themeConfig.quoteStrip.author}
        </cite>
      </div>
    </section>
  );
}
