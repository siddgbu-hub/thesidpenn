import { getPostsByCategory, getAllPosts } from "../../../lib/mdx";
import ArticleCard from "../../../components/ArticleCard";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  const categories = Array.from(new Set(posts.map(p => p.meta.category.toLowerCase())));
  if (categories.length === 0) return [{ slug: 'empty' }];
  return categories.map((slug) => ({ slug }));
}

export default async function CategoryArchive({ params }: { params: { slug: string } }) {
  const posts = await getPostsByCategory(params.slug);

  if (posts.length === 0) {
    notFound();
  }

  const categoryName = posts[0].meta.category;

  return (
    <div className="max-w-6xl mx-auto px-4 py-20">
      <header className="text-center mb-20 border-b border-[#1a1a18]/10 pb-16">
        <h1 className="text-5xl md:text-6xl font-heading mb-4">{categoryName}</h1>
        <p className="font-ui text-[#1a1a18]/60 uppercase tracking-widest text-sm">
          {posts.length} {posts.length === 1 ? "Dispatch" : "Dispatches"}
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
        {posts.map((post) => (
          <ArticleCard key={post.slug} post={post.meta} />
        ))}
      </div>
    </div>
  );
}
