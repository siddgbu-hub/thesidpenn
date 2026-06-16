import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "content");
const API_BASE = process.env.NODE_ENV === "development" ? "http://127.0.0.1:8788" : "https://thesidpen-nextjs.pages.dev";

export type PostMetadata = {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image?: string;
  slug: string;
};

export async function getAllPosts(): Promise<{ slug: string; meta: PostMetadata }[]> {
  try {
    const res = await fetch(`${API_BASE}/api/posts`);
    if (!res.ok) return [];
    const data = await res.json() as any;
    
    return data.posts.map((p: any) => ({
      slug: p.slug,
      meta: {
        title: p.title,
        excerpt: p.excerpt,
        date: new Date(p.created_at).toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' }),
        category: p.category,
        image: p.image,
        slug: p.slug,
      }
    }));
  } catch (err) {
    console.error("Failed to fetch posts:", err);
    return [];
  }
}

export async function getPostBySlug(slug: string) {
  try {
    const realSlug = slug.replace(/\.mdx$/, "");
    const res = await fetch(`${API_BASE}/api/posts/${realSlug}`);
    if (!res.ok) return null;
    const data = await res.json() as any;
    const p = data.post;
    
    return {
      slug: p.slug,
      meta: {
        title: p.title,
        excerpt: p.excerpt,
        date: new Date(p.created_at).toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' }),
        category: p.category,
        image: p.image,
        slug: p.slug,
      } as PostMetadata,
      content: p.content,
    };
  } catch (err) {
    console.error("Failed to fetch post:", err);
    return null;
  }
}

export async function getPostsByCategory(category: string) {
  const allPosts = await getAllPosts();
  return allPosts.filter((post) => post.meta.category.toLowerCase() === category.toLowerCase());
}

export function getAboutContent() {
  const fullPath = path.join(contentDirectory, "about.mdx");
  if (!fs.existsSync(fullPath)) return null;
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  return { meta: data, content };
}
