import React, { useState } from "react";
import ItemForm from "./components/ItemForm";
import ItemsList from "./components/ItemsList";
import { Item } from "./types/Items";

function App() {
  const [items, setItems] = useState<Item[]>([]);

  // TODO: Create function to add new item to the list
  const addItem = (name: string, count: number) => {
    const newItem: Item = {
      id: items.length > 0 ? items[items.length - 1].id + 1 : 1,
      name,
      count,
    };
    setItems([...items, newItem]);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      {/* TODO: Pass addItem function as prop */}
      <ItemForm addItem={addItem} />
      {/* TODO: Pass items array as prop */}
      <ItemsList items={items} />
    </div>
  );
}

export default App;
