import type { VercelRequest, VercelResponse } from "@vercel/node";

const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
  apiKey: SUPABASE_SERVICE_ROLE_KEY,
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "POST") {
    const { visitor_id } = req.body;

    if (!visitor_id) {
      return res.status(400).json({ error: "visitor_id required" });
    }

    await fetch(`${SUPABASE_URL}/rest/v1/visitors`, {
      method: "POST",
      headers: {
        ...headers,
        Prefer: "resolution=ignore-duplicates",
      },
      body: JSON.stringify({ visitor_id }),
    });

    const countRes = await fetch(
      `${SUPABASE_URL}/rest/v1/visitors?select=count`,
      {
        headers: {
          ...headers,
          Prefer: "count=exact",
        },
      },
    );

    const count = countRes.headers.get("content-range")?.split("/")[1];
    return res.status(200).json({ count: Number(count) });
  }
  return res.status(405).json({ error: "Method not allowed" });
}
