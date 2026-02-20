import type { VercelRequest, VercelResponse } from "@vercel/node";

const STEAM_APP_ID = "730";
const DEFAULT_CURRENCY = "1";

interface SteamPriceResponse {
  success: boolean;
  lowest_price?: string;
  median_price?: string;
  volume?: string;
}

// Rate limiting state
const rateLimitState = {
  tokens: 20, // Start with 20 tokens
  maxTokens: 20,
  lastRefill: Date.now(),
  refillRate: 1000, // Refill 1 token per second
};

function refillTokens() {
  const now = Date.now();
  const timePassed = now - rateLimitState.lastRefill;
  const tokensToAdd = Math.floor(timePassed / rateLimitState.refillRate);

  if (tokensToAdd > 0) {
    rateLimitState.tokens = Math.min(
      rateLimitState.maxTokens,
      rateLimitState.tokens + tokensToAdd,
    );
    rateLimitState.lastRefill = now;
  }
}

async function fetchFromSteam(
  itemName: string,
): Promise<SteamPriceResponse | null> {
  const encodedName = encodeURIComponent(itemName);
  const url = `https://steamcommunity.com/market/priceoverview/?appid=${STEAM_APP_ID}&currency=${DEFAULT_CURRENCY}&market_hash_name=${encodedName}`;

  const retryDelays = [2000, 32000, 62000]; // 2s, 32s, 62s
  const maxAttempts = retryDelays.length + 1; // Initial attempt + 3 retries

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    // Check token bucket before making request
    refillTokens();
    if (rateLimitState.tokens < 1) {
      const waitTime = rateLimitState.refillRate;
      await new Promise((resolve) => setTimeout(resolve, waitTime));
      refillTokens();
    }

    rateLimitState.tokens -= 1;

    const steamResponse = await fetch(url, {
      headers: {
        "User-Agent": "cs-skin-tracker/1.0",
        Accept: "application/json",
      },
    });

    if (steamResponse.ok) {
      return await steamResponse.json();
    }

    // If not a rate limit error, fail immediately
    if (steamResponse.status !== 429 && steamResponse.status !== 503) {
      return null;
    }

    // Retry with specified delays
    if (attempt < maxAttempts) {
      const delayMs = retryDelays[attempt - 1];
      console.log(
        `Steam API rate limited, retry ${attempt}/${maxAttempts} after ${delayMs}ms`,
      );
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }

  return null;
}

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

  try {
    const steamData = await fetchFromSteam(name);
    if (steamData && steamData.success) {
      response.status(200).json(steamData);
      return;
    }

    response.status(503).json({
      error: "Unable to fetch price data from Steam",
    });
  } catch (error) {
    response.status(500).json({ error: "Failed to fetch price data" });
  }
}
