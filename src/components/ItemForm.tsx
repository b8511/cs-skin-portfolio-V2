import React, { useState } from "react";

interface ItemFormProps {
  addItem: (name: string, count: number) => void;
}

function ItemForm() {
  const [itemName, setItemName] = useState("");
  const [amount, setAmount] = useState(0);

  const handleSubmit = () => {
    if (itemName.trim() === "" || amount < 0) {
      return;
    }
    addItem(itemName, amount);
    setItemName("");
    setAmount(0);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 ">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">
        C2 Item Value Tracker
      </h1>
      <div className="flex gap-4">
        <div className="flex-grow">
          <label
            htmlFor="itemName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Item Name
          </label>
          {/* TODO: Add value and onChange to control this input */}

          <input
            type="text"
            id="itemName"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter item name"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
        </div>
        <div className="w-24">
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Amount
          </label>
          {/* TODO: Add value and onChange to control this input */}
          <input
            type="number"
            id="amount"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="0"
            min="0"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </div>
        <button
          className="mt-6 px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          onClick={handleSubmit}
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default ItemForm;
