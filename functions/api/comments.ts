interface Env {
  DB: D1Database;
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, { headers: corsHeaders });
};

export const onRequestGet: PagesFunction<Env> = async (context) => {
  try {
    const url = new URL(context.request.url);
    const postSlug = url.searchParams.get("slug");

    if (!postSlug) {
      return new Response(JSON.stringify({ error: "Missing slug parameter" }), { status: 400, headers: corsHeaders });
    }

    const { results } = await context.env.DB.prepare(
      "SELECT id, author_name, content, created_at FROM comments WHERE post_slug = ? AND status = 'approved' ORDER BY created_at DESC"
    ).bind(postSlug).all();

    return new Response(JSON.stringify({ comments: results }), {
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500, headers: corsHeaders });
  }
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const { request, env } = context;
    const body = await request.json<{ post_slug: string; author_name: string; author_email: string; content: string }>();

    if (!body.post_slug || !body.author_name || !body.author_email || !body.content) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400, headers: corsHeaders });
    }

    const stmt = env.DB.prepare(
      "INSERT INTO comments (post_slug, author_name, author_email, content) VALUES (?, ?, ?, ?)"
    ).bind(body.post_slug, body.author_name, body.author_email, body.content);

    await stmt.run();

    return new Response(JSON.stringify({ success: true, message: "Comment submitted successfully" }), {
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500, headers: corsHeaders });
  }
};
