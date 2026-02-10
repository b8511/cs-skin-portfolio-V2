export async function fetchItemPrice(itemName: string) {
  const encoded = encodeURIComponent(itemName);
  const response = await fetch(`/api/priceoverview?name=${encoded}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}
