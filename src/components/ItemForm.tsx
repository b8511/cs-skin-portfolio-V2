import React, { useState } from "react";
import ItemAutocomplete from "./ItemAutocomplete";

interface ItemFormProps {
  addItem: (name: string, count: number) => void;
}

function ItemForm({ addItem }: ItemFormProps) {
  const [itemName, setItemName] = useState("");
  const [amount, setAmount] = useState(1);

  const handleSubmit = () => {
    if (itemName.trim() === "" || amount < 0) {
      return;
    }
    addItem(itemName, amount);
    setItemName("");
    setAmount(1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.defaultPrevented) {
      handleSubmit();
    }
  };

  return (
    <div className="bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-700">
      <h2 className="text-2xl font-bold text-white mb-4">Add Item</h2>
      <div className="flex gap-4" onKeyDown={handleKeyDown}>
        <div className="flex-grow">
          <label
            htmlFor="itemName"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Item Name
          </label>

          <ItemAutocomplete
            value={itemName}
            onChange={setItemName}
            placeholder="Search for CS2 item..."
          />
        </div>
        <div className="w-24">
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Amount
          </label>
          <input
            type="number"
            id="amount"
            className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="1"
            min="1"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </div>
        <button
          className="mt-6 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800 transition-colors"
          onClick={handleSubmit}
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default ItemForm;
