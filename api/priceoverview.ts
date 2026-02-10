import type { VercelRequest, VercelResponse } from "@vercel/node";

const STEAM_APP_ID = "730";
const DEFAULT_CURRENCY = "1";

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  if (request.method !== "GET") {
    response.status(405).json({ error: "Method not allowed" });
    return;
  }

  const name = request.query.name;
  if (!name || Array.isArray(name)) {
    response.status(400).json({ error: "Missing item name" });
    return;
  }

  const encodedName = encodeURIComponent(name);
  const url = `https://steamcommunity.com/market/priceoverview/?appid=${STEAM_APP_ID}&currency=${DEFAULT_CURRENCY}&market_hash_name=${encodedName}`;

  try {
    const maxAttempts = 5;
    let lastStatus = 0;

    for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
      const steamResponse = await fetch(url, {
        headers: {
          "User-Agent": "cs-skin-tracker/1.0",
          Accept: "application/json",
        },
      });

      if (steamResponse.ok) {
        const data = await steamResponse.json();
        response.status(200).json(data);
        return;
      }

      lastStatus = steamResponse.status;

      if (steamResponse.status !== 429 && steamResponse.status !== 503) {
        response.status(steamResponse.status).json({
          error: "Steam API error",
          status: steamResponse.status,
        });
        return;
      }

      if (attempt < maxAttempts) {
        const baseDelayMs = 400 * 2 ** (attempt - 1);
        const jitterMs = Math.floor(Math.random() * 150);
        const delayMs = baseDelayMs + jitterMs;
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      }
    }

    response.status(429).json({
      error: "Steam API error",
      status: lastStatus || 429,
    });
  } catch (error) {
    response.status(500).json({ error: "Failed to fetch Steam data" });
  }
}
