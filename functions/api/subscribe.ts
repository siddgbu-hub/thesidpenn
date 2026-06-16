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

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const { request, env } = context;
    const body = await request.json<{ email: string }>();

    if (!body.email) {
      return new Response(JSON.stringify({ error: "Email is required" }), { status: 400, headers: corsHeaders });
    }

    const stmt = env.DB.prepare(
      "INSERT INTO subscribers (email) VALUES (?)"
    ).bind(body.email);

    await stmt.run();

    return new Response(JSON.stringify({ success: true, message: "Subscribed successfully" }), {
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    if (error.message.includes("UNIQUE constraint failed")) {
      return new Response(JSON.stringify({ error: "Email already subscribed" }), { status: 400, headers: corsHeaders });
    }
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500, headers: corsHeaders });
  }
};
