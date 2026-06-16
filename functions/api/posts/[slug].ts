/// <reference types="@cloudflare/workers-types" />

interface Env {
  DB: D1Database;
  ADMIN_SECRET: string;
  DEPLOY_HOOK_URL: string;
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export const onRequestOptions: PagesFunction<Env> = async () => {
  return new Response(null, { headers: corsHeaders });
};

export const onRequestGet: PagesFunction<Env> = async (context) => {
  try {
    const slug = context.params.slug as string;
    const { results } = await context.env.DB.prepare(
      "SELECT * FROM posts WHERE slug = ?"
    ).bind(slug).all();
    
    if (results.length === 0) {
      return Response.json({ error: "Not found" }, { status: 404, headers: corsHeaders });
    }

    return Response.json({ post: results[0] }, { headers: corsHeaders });
  } catch (err: any) {
    return Response.json({ error: err.message }, { status: 500, headers: corsHeaders });
  }
};

export const onRequestDelete: PagesFunction<Env> = async (context) => {
  try {
    const authHeader = context.request.headers.get("Authorization");
    const secret = context.env.ADMIN_SECRET || "local-secret";
    
    if (authHeader !== `Bearer ${secret}`) {
      return Response.json({ error: "Unauthorized" }, { status: 401, headers: corsHeaders });
    }

    const slug = context.params.slug as string;

    await context.env.DB.prepare(
      "DELETE FROM posts WHERE slug = ?"
    ).bind(slug).run();

    if (context.env.DEPLOY_HOOK_URL) {
      await fetch(context.env.DEPLOY_HOOK_URL, { method: "POST" }).catch(e => console.error("Deploy hook failed", e));
    }

    return Response.json({ success: true }, { headers: corsHeaders });
  } catch (err: any) {
    return Response.json({ error: err.message }, { status: 500, headers: corsHeaders });
  }
};
