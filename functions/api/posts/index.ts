/// <reference types="@cloudflare/workers-types" />

interface Env {
  DB: D1Database;
  ADMIN_SECRET: string;
  DEPLOY_HOOK_URL: string;
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export const onRequestOptions: PagesFunction<Env> = async () => {
  return new Response(null, { headers: corsHeaders });
};

export const onRequestGet: PagesFunction<Env> = async (context) => {
  try {
    const { results } = await context.env.DB.prepare(
      "SELECT * FROM posts ORDER BY created_at DESC"
    ).all();
    
    return Response.json({ posts: results }, { headers: corsHeaders });
  } catch (err: any) {
    return Response.json({ error: err.message }, { status: 500, headers: corsHeaders });
  }
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const authHeader = context.request.headers.get("Authorization");
    const secret = context.env.ADMIN_SECRET || "local-secret";
    
    if (authHeader !== `Bearer ${secret}`) {
      return Response.json({ error: "Unauthorized" }, { status: 401, headers: corsHeaders });
    }

    const body = await context.request.json<{
      slug: string;
      title: string;
      excerpt: string;
      content: string;
      category: string;
      image: string;
    }>();

    if (!body.slug || !body.title || !body.content) {
       return Response.json({ error: "Missing required fields" }, { status: 400, headers: corsHeaders });
    }

    await context.env.DB.prepare(
      `INSERT INTO posts (slug, title, excerpt, content, category, image)
       VALUES (?, ?, ?, ?, ?, ?)
       ON CONFLICT(slug) DO UPDATE SET
       title=excluded.title, excerpt=excluded.excerpt, content=excluded.content, category=excluded.category, image=excluded.image`
    ).bind(body.slug, body.title, body.excerpt, body.content, body.category || 'essays', body.image || null).run();

    if (context.env.DEPLOY_HOOK_URL) {
      await fetch(context.env.DEPLOY_HOOK_URL, { method: "POST" }).catch(e => console.error("Deploy hook failed", e));
    }

    return Response.json({ success: true }, { headers: corsHeaders });
  } catch (err: any) {
    return Response.json({ error: err.message }, { status: 500, headers: corsHeaders });
  }
};
