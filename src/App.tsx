import { useState } from "react";
import ItemForm from "./components/ItemForm";
import ItemsList from "./components/ItemsList";
import { Item } from "./types/Items";
import ResultsPage from "./components/ResultsPage";
import { fetchItemPrice } from "./api/steamApi";

interface PriceResult {
  name: string;
  amount: number;
  lowest_price?: string;
  median_price?: string;
  success: boolean;
  loading?: boolean;
}

function App() {
  const [currentPage, setCurrentPage] = useState("main");
  const [priceResults, setPriceResults] = useState<PriceResult[]>([]);

  const handleLockIn = async () => {
    // Clear previous results and switch to results page
    setPriceResults([]);
    setCurrentPage("results");

    // Fetch items sequentially and add to results as they complete
    for (const item of items) {
      try {
        const result = await fetchItemPrice(item.name);
        // Only add if we got price data
        if (result.lowest_price || result.median_price) {
          setPriceResults((prev) => [
            ...prev,
            {
              name: item.name,
              amount: item.count,
              ...result,
              loading: false,
            },
          ]);
        }
      } catch (error) {
        // Skip failed items
      }
    }
  };
  const [items, setItems] = useState<Item[]>([
    { id: 1, name: "Antwerp 2022 Challengers Autograph Capsule", count: 1 },
    { id: 2, name: "Antwerp 2022 challengers sticker Capsule", count: 5 },
    { id: 3, name: "Antwerp 2022 Champions Autograph Capsule", count: 2 },
    { id: 4, name: "Antwerp 2022 Contenders Autograph Capsule", count: 49 },
    { id: 5, name: "Antwerp 2022 Contenders Sticker Capsule", count: 41 },
    { id: 6, name: "Antwerp 2022 Legends Autograph Capsule", count: 1 },
    { id: 7, name: "Antwerp 2022 Legends stickers Capsule", count: 2 },
    { id: 8, name: "Paris 2023 Challengers Autograph Capsule", count: 2 },
    { id: 9, name: "Paris 2023 Challengers Stickers Capsule", count: 20 },
    { id: 10, name: "Paris 2023 Champions Autograph Capsule", count: 2 },
    { id: 11, name: "Paris 2023 Contenders Autograph Capsule", count: 24 },
    { id: 12, name: "Paris 2023 Contenders Stickers Capsule", count: 14 },
    { id: 13, name: "Paris 2023 Legends Autograph Capsule", count: 19 },
    { id: 14, name: "Paris 2023 Legends Stickers Capsule", count: 4 },
    { id: 15, name: "Sticker Capsule 2", count: 1 },
    { id: 16, name: "Stockholm 2021 Challengers Stickers Capsule", count: 8 },
    { id: 17, name: "Stockholm 2021 Champions Autograph Capsule", count: 2 },
    { id: 18, name: "Stockholm 2021 Contenders Sticker Capsule", count: 8 },
    { id: 19, name: "Stockholm 2021 Finalists Autograph Capsule", count: 3 },
    { id: 20, name: "Stockholm 2021 Legends Patch Capsule", count: 1 },
    { id: 21, name: "Stockholm 2021 Legends Stickers Capsule", count: 7 },
    { id: 22, name: "Dreams & Nightmares Case", count: 32 },
    { id: 23, name: "Clutch Case", count: 114 },
    { id: 24, name: "Prisma Case", count: 127 },
    { id: 25, name: "CS20 Case", count: 11 },
  ]);
  console.log("Current items:", items);

  const addItem = (name: string, count: number) => {
    const newItem: Item = {
      id: items.length > 0 ? items[items.length - 1].id + 1 : 1,
      name,
      count,
    };
    setItems([...items, newItem]);
  };

  const deleteItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const updateItem = (id: number, name: string, count: number) => {
    setItems(
      items.map((item) => (item.id === id ? { ...item, name, count } : item)),
    );
  };
  if (currentPage === "results") {
    return (
      <ResultsPage
        results={priceResults}
        onGoBack={() => setCurrentPage("main")}
      />
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-slate-800 flex flex-col items-center py-10 px-4">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-white mb-2">CS Skin Tracker</h1>
        <p className="text-gray-400">
          Track and manage your Counter-Strike skins
        </p>
      </header>
      <div className="w-full max-w-2xl space-y-6">
        <ItemForm addItem={addItem} />
        <ItemsList
          items={items}
          deleteItem={deleteItem}
          updateItem={updateItem}
          onLockIn={handleLockIn}
        />
      </div>
    </div>
  );
}

export default App;
