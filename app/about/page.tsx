import { MDXRemote } from "next-mdx-remote/rsc";
import { getAboutContent } from "../../lib/mdx";
import { notFound } from "next/navigation";

export default function AboutPage() {
  const about = getAboutContent();

  if (!about) {
    notFound();
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-20">
      <header className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-heading mb-6">{about.meta.title}</h1>
        {about.meta.excerpt && (
          <p className="font-ui text-sm text-[#1a1a18]/60 uppercase tracking-widest">
            {about.meta.excerpt}
          </p>
        )}
      </header>
      
      <div className="prose prose-lg md:prose-xl max-w-none font-body leading-relaxed text-[#1a1a18]">
        <MDXRemote source={about.content} />
      </div>
    </div>
  );
}
