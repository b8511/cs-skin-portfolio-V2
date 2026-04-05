const API_BASE = import.meta.env.VITE_API_URL ?? "";

export async function fetchItemPrice(itemName: string) {
  const encoded = encodeURIComponent(itemName);
  const response = await fetch(`${API_BASE}/api/prices?name=${encoded}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}
