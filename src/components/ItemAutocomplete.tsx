import React, { useState, useRef, useEffect, useCallback } from "react";
import { searchItems, getItemImageUrl, CS2Item } from "../data/cs2Items";

interface ItemAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onSelect?: (item: CS2Item) => void;
  placeholder?: string;
  className?: string;
}

function ItemAutocomplete({
  value,
  onChange,
  onSelect,
  placeholder = "Enter item name",
  className = "",
}: ItemAutocompleteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<CS2Item[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (value.length >= 2) {
        const items = searchItems(value, 8);
        setResults(items);
        setIsOpen(items.length > 0);
        setHighlightedIndex(-1);
      } else {
        setResults([]);
        setIsOpen(false);
      }
    }, 150);

    return () => clearTimeout(timer);
  }, [value]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = useCallback(
    (item: CS2Item) => {
      onChange(item.name);
      onSelect?.(item);
      setIsOpen(false);
      setHighlightedIndex(-1);
    },
    [onChange, onSelect],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!isOpen || results.length === 0) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setHighlightedIndex((prev) =>
            prev < results.length - 1 ? prev + 1 : 0,
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setHighlightedIndex((prev) =>
            prev > 0 ? prev - 1 : results.length - 1,
          );
          break;
        case "Enter":
          e.preventDefault();
          if (highlightedIndex >= 0 && highlightedIndex < results.length) {
            handleSelect(results[highlightedIndex]);
          }
          break;
        case "Escape":
          setIsOpen(false);
          setHighlightedIndex(-1);
          break;
      }
    },
    [isOpen, results, highlightedIndex, handleSelect],
  );

  const handleImageError = (itemName: string) => {
    setImageErrors((prev) => new Set(prev).add(itemName));
  };

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => {
          if (results.length > 0) setIsOpen(true);
        }}
        placeholder={placeholder}
        className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
        autoComplete="off"
      />

      {isOpen && results.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-80 overflow-y-auto"
        >
          {results.map((item, index) => (
            <div
              key={item.name}
              className={`flex items-center gap-3 px-3 py-2 cursor-pointer transition-colors ${
                index === highlightedIndex
                  ? "bg-blue-50 border-l-2 border-blue-500"
                  : "hover:bg-gray-50 border-l-2 border-transparent"
              }`}
              onClick={() => handleSelect(item)}
              onMouseEnter={() => setHighlightedIndex(index)}
            >
              {/* Item thumbnail */}
              <div className="w-10 h-10 flex-shrink-0 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
                {!imageErrors.has(item.name) ? (
                  <img
                    src={getItemImageUrl(item.name)}
                    alt={item.name}
                    className="w-full h-full object-contain"
                    onError={() => handleImageError(item.name)}
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                    📦
                  </div>
                )}
              </div>

              {/* Item info */}
              <div className="flex-grow min-w-0">
                <div className="text-sm font-medium text-gray-900 truncate">
                  {item.name}
                </div>
                <div className="text-xs text-gray-500 capitalize">
                  {item.category}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ItemAutocomplete;
