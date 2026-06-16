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

export default function ArticleCard({ post }: { post: PostProps }) {
  return (
    <article className="group flex flex-col space-y-4">
      {post.image && (
        <Link href={`/${post.category.toLowerCase()}/${post.slug}`} className="relative aspect-[3/2] w-full overflow-hidden block">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
          />
        </Link>
      )}
      <div className="flex flex-col flex-grow space-y-3">
        <div className="flex justify-between items-center">
          <Link href={`/category/${post.category.toLowerCase()}`} className="font-ui text-[10px] uppercase tracking-widest text-[#1a1a18]/60 hover:text-[#1a1a18]">
            {post.category}
          </Link>
          <span className="font-ui text-[10px] text-[#1a1a18]/40 uppercase tracking-wider">
            {post.date}
          </span>
        </div>
        <Link href={`/${post.category.toLowerCase()}/${post.slug}`}>
          <h3 className="text-2xl font-heading leading-snug group-hover:underline decoration-1 underline-offset-4">
            {post.title}
          </h3>
        </Link>
        <p className="font-body text-sm text-[#1a1a18]/70 line-clamp-3">
          {post.excerpt}
        </p>
      </div>
    </article>
  );
}
