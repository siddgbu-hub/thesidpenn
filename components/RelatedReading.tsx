import ArticleCard from "./ArticleCard";

type PostProps = {
  title: string;
  excerpt: string;
  slug: string;
  category: string;
  image?: string;
  date: string;
};

export default function RelatedReading({ posts }: { posts: PostProps[] }) {
  if (!posts || posts.length === 0) return null;

  return (
    <section className="border-t border-[#1a1a18]/10 pt-16 mt-16">
      <h3 className="font-ui text-sm uppercase tracking-widest text-[#1a1a18]/60 mb-8 text-center">
        Further Reading
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {posts.map((post) => (
          <ArticleCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
