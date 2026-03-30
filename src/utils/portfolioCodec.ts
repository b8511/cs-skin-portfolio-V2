import { Item } from "../types/Items";

/**
 * Portfolio encoding/decoding utilities
 *
 * Encodes portfolio data into a URL-safe string that can be:
 * - Shared as a link
 * - Stored in localStorage
 * - Used as a "portfolio key"
 *
 * Format: Base64 encoded JSON of items array
 * Compact representation: [{n: "name", c: count}, ...]
 */

interface CompactItem {
  n: string; // name
  c: number; // count
}

/**
 * Encode a list of items into a URL-safe portfolio key
 */
export function encodePortfolio(items: Item[]): string {
  if (items.length === 0) return "";

  // Convert to compact format (omit id, it's regenerated on decode)
  const compact: CompactItem[] = items.map((item) => ({
    n: item.name,
    c: item.count,
  }));

  // JSON stringify and base64 encode
  const json = JSON.stringify(compact);
  const encoded = btoa(encodeURIComponent(json));

  // Make URL-safe (replace + with -, / with _, remove =)
  return encoded.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

/**
 * Decode a portfolio key back into items array
 * Returns empty array if decoding fails
 */
export function decodePortfolio(key: string): Item[] {
  if (!key || key.trim() === "") return [];

  try {
    // Restore base64 padding and characters
    let encoded = key.replace(/-/g, "+").replace(/_/g, "/");

    // Add padding if needed
    while (encoded.length % 4 !== 0) {
      encoded += "=";
    }

    // Decode and parse
    const json = decodeURIComponent(atob(encoded));
    const compact: CompactItem[] = JSON.parse(json);

    // Validate and convert back to Item format
    if (!Array.isArray(compact)) return [];

    return compact
      .filter(
        (item) =>
          typeof item.n === "string" &&
          item.n.trim() !== "" &&
          typeof item.c === "number" &&
          item.c >= 0,
      )
      .map((item, index) => ({
        id: index + 1,
        name: item.n,
        count: item.c,
      }));
  } catch (error) {
    console.error("Failed to decode portfolio key:", error);
    return [];
  }
}

/**
 * Generate a full shareable URL with the portfolio encoded
 */
export function generateShareableUrl(items: Item[]): string {
  const encoded = encodePortfolio(items);
  if (!encoded) return window.location.origin + window.location.pathname;

  const url = new URL(window.location.href);
  url.search = ""; // Clear existing params
  url.searchParams.set("p", encoded); // Use 'p' for portfolio (shorter)
  return url.toString();
}

/**
 * Extract portfolio key from current URL if present
 */
export function getPortfolioFromUrl(): Item[] {
  const params = new URLSearchParams(window.location.search);
  const key = params.get("p");
  return key ? decodePortfolio(key) : [];
}

/**
 * Check if URL has a portfolio parameter
 */
export function hasPortfolioInUrl(): boolean {
  const params = new URLSearchParams(window.location.search);
  return params.has("p");
}

// LocalStorage keys
const STORAGE_KEY = "cs2_portfolio_items";

/**
 * Save items to localStorage
 */
export function saveToLocalStorage(items: Item[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, encodePortfolio(items));
  } catch (error) {
    console.error("Failed to save to localStorage:", error);
  }
}

/**
 * Load items from localStorage
 */
export function loadFromLocalStorage(): Item[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? decodePortfolio(stored) : [];
  } catch (error) {
    console.error("Failed to load from localStorage:", error);
    return [];
  }
}

/**
 * Clear portfolio from localStorage
 */
export function clearLocalStorage(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Failed to clear localStorage:", error);
  }
}
