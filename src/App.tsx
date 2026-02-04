import React, { useState } from "react";
import ItemForm from "./components/ItemForm";
import ItemsList from "./components/ItemsList";
import { Item } from "./types/Items";
import ResultsPage from "./components/ResultsPage";
import { fetchItemPrice } from "./api/steamApi";

function App() {
  const [currentPage, setCurrentPage] = useState("main");
  const [priceResults, setPriceResults] = useState([]);

  const handleLockIn = async () => {
    const results = [];
    for (const item of items) {
      const result = await fetchItemPrice(item.name);
      results.push({ name: item.name, ...result });
    }
    setPriceResults(results);
    setCurrentPage("results");
  };
  const [items, setItems] = useState<Item[]>([]);
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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <ItemForm addItem={addItem} />
      <ItemsList
        items={items}
        deleteItem={deleteItem}
        updateItem={updateItem}
        onLockIn={handleLockIn}
      />
    </div>
  );
}

export default App;
