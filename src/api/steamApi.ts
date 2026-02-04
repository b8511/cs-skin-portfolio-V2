export async function fetchItemPrice(itemName: string) {
  const encoded = encodeURIComponent(itemName);
  const url = `https://steamcommunity.com/market/priceoverview/?appid=730&currency=1&market_hash_name=${encoded}`;
  const response = await fetch(
    `https://corsproxy.io/?${encodeURIComponent(url)}`,
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}
