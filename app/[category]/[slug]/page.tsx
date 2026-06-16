import { MDXRemote } from "next-mdx-remote/rsc";
import { getPostBySlug, getPostsByCategory, getAllPosts } from "../../../lib/mdx";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import RelatedReading from "../../../components/RelatedReading";
import ReaderResponses from "../../../components/ReaderResponses";
import ReadingProgress from "../../../components/ReadingProgress";
import DropCap from "../../../components/DropCap";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  if (posts.length === 0) return [{ category: 'empty', slug: 'empty' }];
  return posts.map((post) => ({
    category: post.meta.category.toLowerCase(),
    slug: post.slug,
  }));
}

export default async function ArticlePage({ params }: { params: { category: string; slug: string } }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const allPostsCategory = await getPostsByCategory(params.category);
  const relatedPosts = allPostsCategory
    .filter((p) => p.slug !== params.slug)
    .slice(0, 3)
    .map(p => p.meta);

  return (
    <>
      <ReadingProgress />
      <article className="w-full">
        <header className="max-w-4xl mx-auto px-4 pt-20 pb-12 text-center">
          <Link href={`/category/${params.category}`} className="font-ui text-xs uppercase tracking-widest text-[#1a1a18]/60 hover:text-[#1a1a18] mb-6 inline-block">
            {post.meta.category}
          </Link>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading leading-tight mb-8">
            {post.meta.title}
          </h1>
          <div className="flex justify-center items-center space-x-4 font-ui text-sm text-[#1a1a18]/50 uppercase tracking-wider">
            <span>{post.meta.date}</span>
          </div>
        </header>

        {post.meta.image && (
          <div className="w-full max-w-6xl mx-auto px-4 mb-16">
            <div className="relative aspect-[21/9] w-full overflow-hidden">
              <Image
                src={post.meta.image}
                alt={post.meta.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        )}

        <div className="max-w-2xl mx-auto px-4">
          <DropCap>
            <MDXRemote source={post.content} />
          </DropCap>
        </div>
      </article>

      <div className="max-w-6xl mx-auto px-4">
        <RelatedReading posts={relatedPosts} />
        <ReaderResponses postSlug={post.slug} />
      </div>
    </>
  );
}
