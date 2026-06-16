import { getAllPosts } from "../lib/mdx";
import themeConfig from "../theme.config";
import HeroSection from "../components/HeroSection";
import QuoteStrip from "../components/QuoteStrip";
import ArticleCard from "../components/ArticleCard";
import ListItem from "../components/ListItem";

export default async function Home() {
  const posts = await getAllPosts();
  
  if (posts.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-heading mb-4">No posts yet.</h1>
        <p className="font-body text-[#1a1a18]/70">Create some MDX files in the content folder to get started.</p>
      </div>
    );
  }

  const featuredPost = posts[0].meta;
  const recentPosts = posts.slice(1, 6);
  const olderPosts = posts.slice(6);

  return (
    <div className="flex flex-col">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {themeConfig.homepageSections.showHero && (
          <div className="flex flex-col lg:flex-row gap-12 mt-12">
            <div className="lg:w-2/3">
              <HeroSection post={featuredPost} />
            </div>
            <div className="lg:w-1/3">
              <h3 className="font-ui text-xs uppercase tracking-widest text-[#1a1a18]/60 mb-6 border-b border-[#1a1a18]/10 pb-2">
                Recent Dispatches
              </h3>
              <div className="flex flex-col">
                {recentPosts.map((post) => (
                  <ListItem key={post.slug} post={post.meta} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <QuoteStrip />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full mb-20">
        {themeConfig.homepageSections.showArchiveGrid && olderPosts.length > 0 && (
          <>
            <h3 className="font-heading text-3xl mb-8 border-b border-[#1a1a18]/10 pb-4">
              From the Archive
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {olderPosts.map((post) => (
                <ArticleCard key={post.slug} post={post.meta} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
