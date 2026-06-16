"use client";
import { useState } from "react";

export default function EmailSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    
    const API_BASE = process.env.NODE_ENV === "development" ? "http://127.0.0.1:8788" : "";

    try {
      const res = await fetch(`${API_BASE}/api/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      
      const data = (await res.json()) as any;
      
      if (res.ok) {
        setStatus("success");
        setMessage("Thank you for subscribing!");
        setEmail("");
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
    <section className="bg-[#1a1a18]/5 py-16 my-16 border-y border-[#1a1a18]/10">
      <div className="max-w-xl mx-auto px-4 text-center">
        <h3 className="font-heading text-3xl mb-4">Letters from the Editor</h3>
        <p className="font-body text-[#1a1a18]/80 mb-8">
          We write, not spam. This one's an exception. Join the reading list to get new essays delivered.
        </p>
        
        {status === "success" ? (
          <p className="font-ui text-sm text-[#1a1a18] uppercase tracking-widest">{message}</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="flex-grow max-w-sm bg-transparent border-b border-[#1a1a18]/20 px-2 py-2 focus:outline-none focus:border-[#1a1a18] font-body transition-colors"
              required
              disabled={status === "loading"}
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="bg-[#1a1a18] text-[#FAF8F5] font-ui text-xs uppercase tracking-widest px-6 py-3 hover:bg-[#1a1a18]/80 transition-colors shrink-0 disabled:opacity-50"
            >
              {status === "loading" ? "Submitting..." : "Subscribe"}
            </button>
          </form>
        )}
        {status === "error" && (
          <p className="font-ui text-xs text-red-700 mt-4">{message}</p>
        )}
      </div>
    </section>
  );
}
