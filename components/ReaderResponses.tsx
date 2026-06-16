"use client";
import { useState, useEffect } from "react";

type Comment = {
  id: number;
  author_name: string;
  content: string;
  created_at: string;
};

export default function ReaderResponses({ postSlug }: { postSlug: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const API_BASE = process.env.NODE_ENV === "development" ? "http://127.0.0.1:8788" : "";

  useEffect(() => {
    fetch(`${API_BASE}/api/comments?slug=${postSlug}`)
      .then((res) => res.json())
      .then((data: any) => {
        if (data.comments) setComments(data.comments);
      })
      .catch(console.error);
  }, [postSlug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    
    try {
      const res = await fetch(`${API_BASE}/api/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ post_slug: postSlug, author_name: name, author_email: email, content }),
      });
      
      const data = (await res.json()) as any;

      if (res.ok) {
        setStatus("success");
        setMessage("Comment submitted and awaiting moderation.");
        setName("");
        setEmail("");
        setContent("");
      } else {
        setStatus("error");
        setMessage(data.error || "An error occurred.");
      }
    } catch (err) {
      setStatus("error");
      setMessage("Failed to connect to server.");
    }
  };

  return (
    <section className="max-w-2xl mx-auto border-t border-[#1a1a18]/10 pt-16 mt-16">
      <h3 className="font-heading text-3xl mb-2 text-center">Reader Responses</h3>
      <p className="font-ui text-xs text-[#1a1a18]/60 text-center uppercase tracking-widest mb-10">
        Your response may be published. Your email never will be.
      </p>

      {comments.length > 0 && (
        <div className="space-y-8 mb-12">
          {comments.map((comment) => (
            <div key={comment.id} className="border-b border-[#1a1a18]/10 pb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="font-heading font-bold">{comment.author_name}</span>
                <span className="font-ui text-[10px] text-[#1a1a18]/40 uppercase tracking-widest">
                  {new Date(comment.created_at).toLocaleDateString()}
                </span>
              </div>
              <p className="font-body text-sm text-[#1a1a18]/80 whitespace-pre-wrap">{comment.content}</p>
            </div>
          ))}
        </div>
      )}

      {status === "success" ? (
        <div className="text-center p-8 bg-[#1a1a18]/5">
          <p className="font-ui text-sm text-[#1a1a18] uppercase tracking-widest">{message}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="sr-only">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                className="w-full bg-transparent border-b border-[#1a1a18]/20 py-2 focus:outline-none focus:border-[#1a1a18] font-body transition-colors"
                required
                disabled={status === "loading"}
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full bg-transparent border-b border-[#1a1a18]/20 py-2 focus:outline-none focus:border-[#1a1a18] font-body transition-colors"
                required
                disabled={status === "loading"}
              />
            </div>
          </div>
          <div>
            <label htmlFor="response" className="sr-only">Response</label>
            <textarea
              id="response"
              rows={5}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Your response..."
              className="w-full bg-transparent border-b border-[#1a1a18]/20 py-2 focus:outline-none focus:border-[#1a1a18] font-body resize-y transition-colors"
              required
              disabled={status === "loading"}
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={status === "loading"}
            className="bg-[#1a1a18] text-[#FAF8F5] font-ui text-xs uppercase tracking-widest px-8 py-3 hover:bg-[#1a1a18]/80 transition-colors disabled:opacity-50"
          >
            {status === "loading" ? "Submitting..." : "Submit Response"}
          </button>
          {status === "error" && (
            <p className="font-ui text-xs text-red-700 mt-2">{message}</p>
          )}
        </form>
      )}
    </section>
  );
}
