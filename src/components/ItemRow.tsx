import React from "react";
import DeleteIcon from "./icons/DeleteIcon";

interface ItemRowProps {
  name: string;
  count: number;
}

function ItemRow({ name, count }: ItemRowProps) {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition">
      <input
        type="text"
        defaultValue={name}
        className="flex-grow bg-transparent font-medium text-gray-700 focus:outline-none focus:bg-white focus:px-2 focus:py-1 focus:rounded"
      />
      <input
        type="number"
        defaultValue={count}
        className="w-16 text-center bg-transparent font-medium text-gray-700 focus:outline-none focus:bg-white focus:px-2 focus:py-1 focus:rounded mx-4"
      />
      <button className="text-red-500 hover:text-red-700 transition">
        <DeleteIcon />
      </button>
    </div>
  );
}

export default ItemRow;
