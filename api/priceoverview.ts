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
    const steamResponse = await fetch(url, {
      headers: {
        "User-Agent": "cs-skin-tracker/1.0",
        Accept: "application/json",
      },
    });

    if (!steamResponse.ok) {
      response.status(steamResponse.status).json({
        error: "Steam API error",
        status: steamResponse.status,
      });
      return;
    }

    const data = await steamResponse.json();
    response.status(200).json(data);
  } catch (error) {
    response.status(500).json({ error: "Failed to fetch Steam data" });
  }
}
