import type { VercelRequest, VercelResponse } from "@vercel/node";
import { CSMarketAPI, Currency, Market } from "csmarketapi";

const STEAM_APP_ID = "730";
const DEFAULT_CURRENCY = "1";

interface SteamPriceResponse {
  success: boolean;
  lowest_price?: string;
  median_price?: string;
  volume?: string;
}

async function fetchFromSteam(
  itemName: string,
): Promise<SteamPriceResponse | null> {
  const encodedName = encodeURIComponent(itemName);
  const url = `https://steamcommunity.com/market/priceoverview/?appid=${STEAM_APP_ID}&currency=${DEFAULT_CURRENCY}&market_hash_name=${encodedName}`;

  const maxAttempts = 5;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    const steamResponse = await fetch(url, {
      headers: {
        "User-Agent": "cs-skin-tracker/1.0",
        Accept: "application/json",
      },
    });

    if (steamResponse.ok) {
      return await steamResponse.json();
    }

    if (steamResponse.status !== 429 && steamResponse.status !== 503) {
      return null;
    }

    if (attempt < maxAttempts) {
      const baseDelayMs = 400 * 2 ** (attempt - 1);
      const jitterMs = Math.floor(Math.random() * 150);
      const delayMs = baseDelayMs + jitterMs;
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }

  return null;
}

async function fetchFromCSMarketAPI(
  itemName: string,
): Promise<SteamPriceResponse | null> {
  const apiKey = process.env.CSMARKETAPI_KEY;
  if (!apiKey) {
    console.warn("CSMARKETAPI_KEY not set, skipping fallback");
    return null;
  }

  try {
    const client = new CSMarketAPI({ apiKey });
    const result = await client.getSalesLatestAggregated({
      marketHashName: itemName,
      markets: [Market.STEAMCOMMUNITY],
      currency: Currency.USD,
    });

    if (result && result.sales && result.sales.length > 0) {
      const latestSale = result.sales[0];
      const minPrice = latestSale.min_price;
      const medianPrice = latestSale.median_price;

      if (minPrice !== null || medianPrice !== null) {
        const formatPrice = (cents: number | null) =>
          cents !== null ? `$${(cents / 100).toFixed(2)}` : undefined;

        return {
          success: true,
          lowest_price: formatPrice(minPrice),
          median_price: formatPrice(medianPrice),
          volume: latestSale.volume?.toString(),
        };
      }
    }

    // Try listings if no sales data
    const listings = await client.getListingsLatestAggregated({
      marketHashName: itemName,
      markets: [Market.STEAMCOMMUNITY],
      currency: Currency.USD,
    });

    if (listings && listings.listings && listings.listings.length > 0) {
      const steamListing = listings.listings.find(
        (l) => l.market === Market.STEAMCOMMUNITY,
      );

      if (steamListing && steamListing.min_price !== null) {
        return {
          success: true,
          lowest_price: `$${(steamListing.min_price / 100).toFixed(2)}`,
          median_price:
            steamListing.median_price !== null
              ? `$${(steamListing.median_price / 100).toFixed(2)}`
              : undefined,
        };
      }
    }

    return null;
  } catch (error) {
    console.error("CSMarketAPI error:", error);
    return null;
  }
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
    // Try Steam API first
    const steamData = await fetchFromSteam(name);
    if (steamData) {
      response.status(200).json(steamData);
      return;
    }

    // Fallback to CSMarketAPI
    const csMarketData = await fetchFromCSMarketAPI(name);
    if (csMarketData) {
      response.status(200).json(csMarketData);
      return;
    }

    response.status(503).json({
      error: "Unable to fetch price data from any source",
    });
  } catch (error) {
    response.status(500).json({ error: "Failed to fetch price data" });
  }
}
