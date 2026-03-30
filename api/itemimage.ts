import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { n } = req.query;

  if (!n || typeof n !== "string") {
    return res.status(400).end();
  }

  // Normalize name the same way the frontend does
  const normalized = n
    .replace(/\s+/g, "_")
    .replace(/[^a-zA-Z0-9_&-]+/g, "")
    .replace(/_+/g, "_")
    .replace(/^_+|_+$/g, "");

  const imageUrl = `https://www.csgodatabase.com/images/containers/webp/${normalized}.webp`;

  try {
    const response = await fetch(imageUrl, {
      headers: {
        // Mimic a regular browser request — no Referer header sent
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        Accept: "image/webp,image/apng,image/*,*/*;q=0.8",
      },
    });

    if (!response.ok) {
      return res.status(response.status).end();
    }

    const contentType = response.headers.get("content-type") || "image/webp";
    res.setHeader("Content-Type", contentType);
    // Cache the image for 24 hours on CDN, 1 hour in browser
    res.setHeader(
      "Cache-Control",
      "public, s-maxage=86400, max-age=3600, stale-while-revalidate=86400",
    );

    const buffer = await response.arrayBuffer();
    return res.status(200).send(Buffer.from(buffer));
  } catch {
    return res.status(500).end();
  }
}
