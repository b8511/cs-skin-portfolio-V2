import { useState, useEffect } from "react";
import { Item } from "../types/Items";
import {
  encodePortfolio,
  decodePortfolio,
  generateShareableUrl,
} from "../utils/portfolioCodec";

interface PortfolioKeyManagerProps {
  items: Item[];
  onLoadPortfolio: (items: Item[]) => void;
}

function PortfolioKeyManager({
  items,
  onLoadPortfolio,
}: PortfolioKeyManagerProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [loadKey, setLoadKey] = useState("");
  const [copied, setCopied] = useState<"key" | "url" | null>(null);
  const [loadError, setLoadError] = useState("");

  // Reset copied state after 2 seconds
  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const currentKey = encodePortfolio(items);
  const shareableUrl = generateShareableUrl(items);

  const handleCopyKey = async () => {
    if (!currentKey) return;
    try {
      await navigator.clipboard.writeText(currentKey);
      setCopied("key");
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(shareableUrl);
      setCopied("url");
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const handleLoadPortfolio = () => {
    setLoadError("");

    if (!loadKey.trim()) {
      setLoadError("Please enter a portfolio key");
      return;
    }

    const decoded = decodePortfolio(loadKey.trim());

    if (decoded.length === 0) {
      setLoadError("Invalid portfolio key. Please check and try again.");
      return;
    }

    onLoadPortfolio(decoded);
    setLoadKey("");
    setIsExpanded(false);
  };

  return (
    <div className="bg-slate-800 rounded-xl shadow-lg border border-slate-700 overflow-hidden">
      {/* Header - always visible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-700/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-xl">🔑</span>
          <div>
            <h3 className="text-white font-semibold">Portfolio Key</h3>
            <p className="text-gray-400 text-sm">
              Save, share, or load your portfolio
            </p>
          </div>
        </div>
        <svg
          className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
            isExpanded ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Expandable content */}
      {isExpanded && (
        <div className="px-6 pb-6 space-y-6 border-t border-slate-700">
          {/* Current Portfolio Key */}
          <div className="pt-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Your Portfolio Key
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                readOnly
                value={currentKey || "(empty portfolio)"}
                className="flex-grow px-3 py-2 bg-slate-900 border border-slate-600 rounded-lg text-gray-300 text-sm font-mono truncate"
              />
              <button
                onClick={handleCopyKey}
                disabled={!currentKey}
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
              >
                {copied === "key" ? "✓ Copied!" : "Copy Key"}
              </button>
            </div>
          </div>

          {/* Share URL */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Shareable Link
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                readOnly
                value={shareableUrl}
                className="flex-grow px-3 py-2 bg-slate-900 border border-slate-600 rounded-lg text-gray-300 text-sm font-mono truncate"
              />
              <button
                onClick={handleCopyUrl}
                className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-500 transition-colors whitespace-nowrap"
              >
                {copied === "url" ? "✓ Copied!" : "Copy Link"}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Share this link to give others your exact portfolio
            </p>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-700"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-slate-800 px-3 text-sm text-gray-500">
                or
              </span>
            </div>
          </div>

          {/* Load Portfolio */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Load Portfolio from Key
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={loadKey}
                onChange={(e) => {
                  setLoadKey(e.target.value);
                  setLoadError("");
                }}
                placeholder="Paste a portfolio key here..."
                className="flex-grow px-3 py-2 bg-slate-900 border border-slate-600 rounded-lg text-gray-300 text-sm font-mono placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleLoadPortfolio}
                className="px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-500 transition-colors whitespace-nowrap"
              >
                Load
              </button>
            </div>
            {loadError && (
              <p className="text-red-400 text-sm mt-2">{loadError}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              ⚠️ Loading will replace your current portfolio
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default PortfolioKeyManager;
