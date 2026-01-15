import React, { useState } from "react";
import ItemForm from "./components/ItemForm";
import ItemsList from "./components/ItemsList";
import { Item } from "./types/Items";

function App() {
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
      items.map((item) => (item.id === id ? { ...item, name, count } : item))
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <ItemForm addItem={addItem} />
      <ItemsList
        items={items}
        deleteItem={deleteItem}
        updateItem={updateItem}
      />
    </div>
  );
}

export default App;
