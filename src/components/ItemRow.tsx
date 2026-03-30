import React, { useState } from "react";
import DeleteIcon from "./icons/DeleteIcon";
import { getItemImageUrl } from "../data/cs2Items";

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
  const [imageError, setImageError] = useState(false);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedName(e.target.value);
  };

  const handleCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedCount(Number(e.target.value));
  };

  const handleNameBlur = () => {
    if (editedName.trim() !== "") {
      onUpdate(id, editedName, editedCount);
      setImageError(false); // Reset image error when name changes
    }
  };

  const handleCountBlur = () => {
    if (editedCount >= 0) {
      onUpdate(id, editedName, editedCount);
    }
  };

  return (
    <div className="flex items-center gap-3 p-3 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition pt-4 first:pt-3">
      {/* Item thumbnail */}
      <div className="w-10 h-10 flex-shrink-0 bg-slate-800 rounded overflow-hidden flex items-center justify-center">
        {!imageError ? (
          <img
            src={getItemImageUrl(name)}
            alt={name}
            className="w-full h-full object-contain"
            onError={() => setImageError(true)}
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500 text-lg">
            📦
          </div>
        )}
      </div>

      {/* Item name input */}
      <input
        type="text"
        value={editedName}
        onChange={handleNameChange}
        onBlur={handleNameBlur}
        className="flex-grow bg-transparent font-medium text-gray-200 focus:outline-none focus:bg-slate-800 focus:px-2 focus:py-1 focus:rounded min-w-0"
      />

      {/* Count input */}
      <div className="flex items-center gap-1">
        <span className="text-gray-400 text-sm">×</span>
        <input
          type="number"
          value={editedCount}
          onChange={handleCountChange}
          onBlur={handleCountBlur}
          className="w-14 text-center bg-transparent font-medium text-gray-200 focus:outline-none focus:bg-slate-800 focus:px-2 focus:py-1 focus:rounded"
          min="0"
        />
      </div>

      {/* Delete button */}
      <button
        onClick={() => onDelete(id)}
        className="text-red-400 hover:text-red-300 transition p-1"
      >
        <DeleteIcon />
      </button>
    </div>
  );
}

export default ItemRow;
