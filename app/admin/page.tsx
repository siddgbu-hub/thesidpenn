"use client";

import { useState, useEffect } from "react";

type Post = {
  id?: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  created_at?: string;
};

export default function AdminDashboard() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [view, setView] = useState<"list" | "edit">("list");
  const [editingPost, setEditingPost] = useState<Partial<Post>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_BASE = process.env.NODE_ENV === "development" ? "http://127.0.0.1:8788" : "https://thesidpenn.pages.dev";

  const login = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticated(true);
    fetchPosts();
  };

  const fetchPosts = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/posts`);
      if (res.ok) {
        const data = (await res.json()) as any;
        setPosts(data.posts);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const savePost = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_BASE}/api/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${password}`
        },
        body: JSON.stringify(editingPost)
      });

      if (res.ok) {
        setView("list");
        fetchPosts();
      } else {
        const data = (await res.json()) as any;
        setError(data.error || "Failed to save post");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (slug: string) => {
    if (!confirm(`Are you sure you want to delete ${slug}?`)) return;
    
    try {
      const res = await fetch(`${API_BASE}/api/posts/${slug}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${password}`
        }
      });
      if (res.ok) {
        fetchPosts();
      } else {
        alert("Failed to delete post");
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f7f5f0]">
        <form onSubmit={login} className="bg-white p-8 border border-[#1a1a18]/10 max-w-sm w-full shadow-sm">
          <h1 className="font-heading text-3xl mb-6 text-center">Admin Login</h1>
          <input 
            type="password" 
            placeholder="Enter Admin Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-[#1a1a18]/20 font-ui text-sm mb-4 focus:outline-none"
          />
          <button type="submit" className="w-full bg-[#1a1a18] text-white p-3 font-ui text-xs tracking-widest uppercase hover:bg-black">
            Login
          </button>
        </form>
      </div>
    );
  }

  if (view === "edit") {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4">
        <button onClick={() => setView("list")} className="font-ui text-xs uppercase tracking-widest text-[#1a1a18]/60 hover:text-black mb-8 border-b border-transparent hover:border-black transition-all">
          ← Back to Dashboard
        </button>
        <h1 className="font-heading text-4xl mb-8">{editingPost.id ? "Edit Post" : "Create New Post"}</h1>
        
        {error && <div className="bg-red-100 text-red-800 p-4 mb-6 font-ui text-sm">{error}</div>}

        <form onSubmit={savePost} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block font-ui text-xs uppercase tracking-widest mb-2">Title</label>
              <input type="text" required value={editingPost.title || ""} onChange={(e) => setEditingPost({...editingPost, title: e.target.value})} className="w-full p-3 border border-[#1a1a18]/20 font-body" />
            </div>
            <div>
              <label className="block font-ui text-xs uppercase tracking-widest mb-2">Slug (URL)</label>
              <input type="text" required value={editingPost.slug || ""} onChange={(e) => setEditingPost({...editingPost, slug: e.target.value.toLowerCase().replace(/\\s+/g, '-')})} className="w-full p-3 border border-[#1a1a18]/20 font-body" />
            </div>
            <div>
              <label className="block font-ui text-xs uppercase tracking-widest mb-2">Category</label>
              <select required value={editingPost.category || "essays"} onChange={(e) => setEditingPost({...editingPost, category: e.target.value})} className="w-full p-3 border border-[#1a1a18]/20 font-body bg-white">
                <option value="essays">Essays</option>
                <option value="fiction">Fiction</option>
                <option value="narratives">Narratives</option>
                <option value="opinion">Opinion</option>
              </select>
            </div>
            <div>
              <label className="block font-ui text-xs uppercase tracking-widest mb-2">Cover Image URL</label>
              <input type="text" value={editingPost.image || ""} onChange={(e) => setEditingPost({...editingPost, image: e.target.value})} className="w-full p-3 border border-[#1a1a18]/20 font-body" placeholder="/images/example.jpg" />
            </div>
          </div>
          
          <div>
            <label className="block font-ui text-xs uppercase tracking-widest mb-2">Excerpt (Short Summary)</label>
            <textarea required value={editingPost.excerpt || ""} onChange={(e) => setEditingPost({...editingPost, excerpt: e.target.value})} className="w-full p-3 border border-[#1a1a18]/20 font-body h-24" />
          </div>

          <div>
            <label className="block font-ui text-xs uppercase tracking-widest mb-2">Content (Markdown Format)</label>
            <textarea required value={editingPost.content || ""} onChange={(e) => setEditingPost({...editingPost, content: e.target.value})} className="w-full p-4 border border-[#1a1a18]/20 font-mono text-sm h-96 leading-relaxed" placeholder="# Start writing..." />
          </div>

          <button type="submit" disabled={loading} className="bg-[#1a1a18] text-white px-8 py-4 font-ui text-xs tracking-widest uppercase hover:bg-black transition-colors disabled:opacity-50">
            {loading ? "Publishing..." : "Publish Post"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-20 px-4">
      <div className="flex justify-between items-end mb-12 border-b border-[#1a1a18]/10 pb-6">
        <div>
          <h1 className="font-heading text-5xl mb-2">Dashboard</h1>
          <p className="font-ui text-sm text-[#1a1a18]/60 uppercase tracking-widest">Manage your publications</p>
        </div>
        <button 
          onClick={() => { setEditingPost({}); setView("edit"); }}
          className="bg-[#1a1a18] text-white px-6 py-3 font-ui text-xs tracking-widest uppercase hover:bg-black transition-colors"
        >
          + New Post
        </button>
      </div>

      <div className="bg-white border border-[#1a1a18]/10">
        <table className="w-full text-left font-body">
          <thead className="bg-[#f7f5f0] border-b border-[#1a1a18]/10 font-ui text-xs uppercase tracking-widest text-[#1a1a18]/60">
            <tr>
              <th className="p-4 font-normal">Title</th>
              <th className="p-4 font-normal">Category</th>
              <th className="p-4 font-normal">Date</th>
              <th className="p-4 font-normal text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-[#1a1a18]/50">No posts found. Create your first post!</td>
              </tr>
            ) : posts.map(post => (
              <tr key={post.slug} className="border-b border-[#1a1a18]/5 hover:bg-[#f7f5f0]/50 transition-colors">
                <td className="p-4 font-heading text-xl">{post.title}</td>
                <td className="p-4 capitalize text-[#1a1a18]/70">{post.category}</td>
                <td className="p-4 text-sm text-[#1a1a18]/50">{new Date(post.created_at || "").toLocaleDateString()}</td>
                <td className="p-4 text-right space-x-4">
                  <button onClick={() => { setEditingPost(post); setView("edit"); }} className="font-ui text-xs uppercase tracking-widest hover:text-[#c4a985] transition-colors">Edit</button>
                  <button onClick={() => deletePost(post.slug)} className="font-ui text-xs uppercase tracking-widest text-red-500 hover:text-red-700 transition-colors">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
