import Link from "next/link";

type PostProps = {
  title: string;
  slug: string;
  category: string;
  date: string;
};

export default function ListItem({ post }: { post: PostProps }) {
  return (
    <div className="group flex items-start space-x-4 py-4 border-b border-[#1a1a18]/10 last:border-0">
      <div className="mt-1 flex-shrink-0">
        <Link
          href={`/category/${post.category.toLowerCase()}`}
          className="inline-block bg-[#1a1a18] text-[#FAF8F5] text-[9px] uppercase tracking-widest px-2 py-1 leading-none"
        >
          {post.category}
        </Link>
      </div>
      <div className="flex flex-col">
        <Link href={`/${post.category.toLowerCase()}/${post.slug}`}>
          <h4 className="text-lg font-heading leading-snug group-hover:opacity-70 transition-opacity">
            {post.title}
          </h4>
        </Link>
        <span className="font-ui text-[10px] text-[#1a1a18]/40 uppercase tracking-wider mt-1">
          {post.date}
        </span>
      </div>
    </div>
  );
}
