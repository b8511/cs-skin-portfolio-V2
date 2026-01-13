import React from "react";
import ItemRow from "./ItemRow";

// TODO: Define Item interface
// interface Item {
//   id: number;
//   name: string;
//   count: number;
// }

// TODO: Add interface to receive items array as prop
// interface ItemsListProps {
//   items: Item[];
// }

function ItemsList() {
  // TODO: Receive items as prop
  // function ItemsList({ items }: ItemsListProps) {

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl mt-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Items List</h2>
      <div className="space-y-2">
        {/* TODO: Replace these hardcoded items with items.map() */}
        <ItemRow name="Item 1" count={3} />
        <ItemRow name="Item 2" count={5} />
        <ItemRow name="Item 3" count={1} />
      </div>
    </div>
  );
}

export default ItemsList;
