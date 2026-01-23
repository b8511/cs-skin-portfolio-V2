import React from "react";
import ItemRow from "./ItemRow";
import { Item, ItemsListProps } from "../types/Items";

function ItemsList({ items, deleteItem, updateItem }: ItemsListProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl mt-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Items List</h2>
      <div className="flex justify-end">
        <button
          className="mb-1 px-6 py-2 bg-blue-800 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors "
          onClick={() => {}}
        >
          Lock In
        </button>
      </div>
      <div className="space-y-2">
        {items.map((item: Item) => (
          <ItemRow
            key={item.id}
            id={item.id}
            name={item.name}
            count={item.count}
            onDelete={deleteItem}
            onUpdate={updateItem}
          />
        ))}
      </div>
    </div>
  );
}

export default ItemsList;
