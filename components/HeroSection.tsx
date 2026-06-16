import Link from "next/link";
import Image from "next/image";

type PostProps = {
  title: string;
  excerpt: string;
  slug: string;
  category: string;
  image?: string;
  date: string;
};

export default function HeroSection({ post }: { post: PostProps }) {
  return (
    <section className="py-12 border-b border-[#1a1a18]/10 mb-12">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        {post.image && (
          <div className="relative aspect-[4/3] w-full overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
        )}
        <div className="flex flex-col justify-center space-y-6">
          <Link href={`/category/${post.category.toLowerCase()}`} className="font-ui text-xs uppercase tracking-widest text-[#1a1a18]/60 hover:text-[#1a1a18]">
            {post.category}
          </Link>
          <Link href={`/${post.category.toLowerCase()}/${post.slug}`}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading leading-tight hover:opacity-80 transition-opacity">
              {post.title}
            </h2>
          </Link>
          <p className="font-body text-lg md:text-xl text-[#1a1a18]/80 leading-relaxed">
            {post.excerpt}
          </p>
          <div className="flex items-center space-x-4 pt-4">
            <Link
              href={`/${post.category.toLowerCase()}/${post.slug}`}
              className="font-ui text-sm uppercase tracking-widest border-b border-[#1a1a18] pb-1 hover:text-[#1a1a18]/60 transition-colors"
            >
              Read Essay
            </Link>
            <span className="font-ui text-xs text-[#1a1a18]/50 uppercase tracking-wider">
              {post.date}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
