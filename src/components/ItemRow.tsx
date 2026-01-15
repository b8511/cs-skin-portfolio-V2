import React, { useState } from "react";
import DeleteIcon from "./icons/DeleteIcon";

interface ItemRowProps {
  id: number;
  name: string;
  count: number;
  onDelete: (id: number) => void;
  onUpdate: (id: number, name: string, count: number) => void;
}

function ItemRow({ id, name, count, onDelete, onUpdate }: ItemRowProps) {
  const [editedName, setEditedName] = useState(name);
  const [editedCount, setEditedCount] = useState(count);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedName(e.target.value);
  };

  const handleCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedCount(Number(e.target.value));
  };

  const handleNameBlur = () => {
    if (editedName.trim() !== "") {
      onUpdate(id, editedName, editedCount);
    }
  };

  const handleCountBlur = () => {
    if (editedCount >= 0) {
      onUpdate(id, editedName, editedCount);
    }
  };

  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition">
      <input
        type="text"
        value={editedName}
        onChange={handleNameChange}
        onBlur={handleNameBlur}
        className="flex-grow bg-transparent font-medium text-gray-700 focus:outline-none focus:bg-white focus:px-2 focus:py-1 focus:rounded"
      />
      <input
        type="number"
        value={editedCount}
        onChange={handleCountChange}
        onBlur={handleCountBlur}
        className="w-16 text-center bg-transparent font-medium text-gray-700 focus:outline-none focus:bg-white focus:px-2 focus:py-1 focus:rounded mx-4"
      />
      <button
        onClick={() => onDelete(id)}
        className="text-red-500 hover:text-red-700 transition"
      >
        <DeleteIcon />
      </button>
    </div>
  );
}

export default ItemRow;
