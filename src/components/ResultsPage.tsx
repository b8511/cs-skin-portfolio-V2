import { useState } from "react";
import { getItemImageUrl } from "../data/cs2Items";

interface ResultsPageProps {
  results: Array<{
    name: string;
    amount: number;
    lowest_price?: string;
    median_price?: string;
    success: boolean;
    loading?: boolean;
    error?: boolean;
    cached?: boolean;
    cached_at?: number;
  }>;
  onGoBack: () => void;
  onRetry: (oldName: string, newName: string) => void;
}

type SortField =
  | "unit_lowest"
  | "unit_median"
  | "total_lowest"
  | "total_median"
  | "amount";
type SortDir = "desc" | "asc";

const SORT_LABELS: Record<SortField, string> = {
  unit_lowest: "Unit (Low)",
  unit_median: "Unit (Med)",
  total_lowest: "Total (Low)",
  total_median: "Total (Med)",
  amount: "Amount",
};

function parsePrice(price?: string): number {
  return parseFloat(price?.replace(/[^0-9.]/g, "") || "0");
}

function formatCachedAge(cached_at?: number): string {
  if (!cached_at) return "cached";
  const diffMs = Date.now() - cached_at * 1000;
  const mins = Math.floor(diffMs / 60000);
  if (mins < 60) return `cached ${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  return `cached ${hrs}h ago`;
}

function Spinner() {
  return (
    <svg
      className="animate-spin h-4 w-4 text-blue-400"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  );
}

function ResultsPage({ results, onGoBack, onRetry }: ResultsPageProps) {
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const [sortField, setSortField] = useState<SortField>("total_lowest");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [editNames, setEditNames] = useState<Record<string, string>>({});

  const total = results.length;
  const doneCount = results.filter((r) => !r.loading).length;
  const loadingCount = total - doneCount;
  const isLoading = loadingCount > 0;
  const progressPct = total > 0 ? Math.round((doneCount / total) * 100) : 0;

  const loadedResults = results.filter((r) => !r.loading && !r.error);

  const totalLowest = loadedResults.reduce(
    (sum, r) => sum + parsePrice(r.lowest_price) * r.amount,
    0,
  );
  const totalMedian = loadedResults.reduce(
    (sum, r) => sum + parsePrice(r.median_price) * r.amount,
    0,
  );

  function getSortValue(r: (typeof results)[number]): number {
    switch (sortField) {
      case "unit_lowest":
        return parsePrice(r.lowest_price);
      case "unit_median":
        return parsePrice(r.median_price);
      case "total_lowest":
        return parsePrice(r.lowest_price) * r.amount;
      case "total_median":
        return parsePrice(r.median_price) * r.amount;
      case "amount":
        return r.amount;
    }
  }

  const sortedResults = [...results].sort((a, b) => {
    if (a.loading && !b.loading) return 1;
    if (!a.loading && b.loading) return -1;
    const diff = getSortValue(a) - getSortValue(b);
    return sortDir === "desc" ? -diff : diff;
  });

  function handleFieldClick(field: SortField) {
    if (field === sortField) {
      setSortDir((d) => (d === "desc" ? "asc" : "desc"));
    } else {
      setSortField(field);
      setSortDir("desc");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-slate-800 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onGoBack}
          className="mb-6 px-5 py-2.5 bg-slate-700 text-gray-200 font-medium rounded-lg shadow-md hover:shadow-lg hover:bg-slate-600 transition-all duration-200 flex items-center gap-2 border border-slate-600"
        >
          ← Back to Items
        </button>

        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-2">
            💰 Price Results
          </h1>
          <p className="text-gray-400">Market prices for your CS skins</p>
        </header>

        {/* Summary Card */}
        <div className="bg-slate-800 rounded-xl shadow-lg p-6 mb-8 border border-slate-700">
          <h2 className="text-lg font-semibold text-gray-200 mb-4 border-b border-slate-700 pb-2">
            Summary
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-r from-rose-900/50 to-rose-800/50 rounded-lg p-4 border border-rose-700/50">
              <p className="text-sm text-rose-400 font-medium mb-1">
                Total Lowest Price
              </p>
              {isLoading ? (
                <div className="h-9 bg-rose-800/50 rounded animate-pulse" />
              ) : (
                <p className="text-3xl font-bold text-rose-300">
                  ${totalLowest.toFixed(2)}
                </p>
              )}
            </div>
            <div className="bg-gradient-to-r from-blue-900/50 to-blue-800/50 rounded-lg p-4 border border-blue-700/50">
              <p className="text-sm text-blue-400 font-medium mb-1">
                Total Median Price
              </p>
              {isLoading ? (
                <div className="h-9 bg-blue-800/50 rounded animate-pulse" />
              ) : (
                <p className="text-3xl font-bold text-blue-300">
                  ${totalMedian.toFixed(2)}
                </p>
              )}
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-4">
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>
                {isLoading
                  ? `Fetching prices… ${doneCount} / ${total}`
                  : `All ${total} ${total === 1 ? "item" : "items"} fetched`}
              </span>
              <span>{progressPct}%</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
              <div
                className="h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${progressPct}%`,
                  background: isLoading
                    ? "linear-gradient(90deg, #3b82f6, #60a5fa)"
                    : "linear-gradient(90deg, #22c55e, #4ade80)",
                }}
              />
            </div>
          </div>
        </div>

        {/* Sort bar */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="text-gray-400 text-sm font-medium mr-1">
            Sort by:
          </span>
          {(Object.keys(SORT_LABELS) as SortField[]).map((field) => (
            <button
              key={field}
              onClick={() => handleFieldClick(field)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                sortField === field
                  ? "bg-blue-600 border-blue-500 text-white"
                  : "bg-slate-700 border-slate-600 text-gray-300 hover:bg-slate-600"
              }`}
            >
              {SORT_LABELS[field]}
              {sortField === field && (
                <span className="ml-1">{sortDir === "desc" ? "↓" : "↑"}</span>
              )}
            </button>
          ))}
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sortedResults.map((result) => {
            const imageUrl = getItemImageUrl(result.name);
            const hasImageError = imageErrors[result.name];

            return (
              <div
                key={result.name}
                className={`rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 p-5 border ${
                  result.loading
                    ? "bg-slate-700/50 border-slate-600"
                    : result.error
                      ? "bg-red-900/20 border-red-700/50"
                      : "bg-slate-800 border-slate-700"
                }`}
              >
                {/* Header row: status icon + name + amount — no overlap */}
                <div className="flex items-center gap-2 mb-3 min-w-0">
                  <span className="flex-shrink-0">
                    {result.loading ? (
                      <Spinner />
                    ) : result.error ? (
                      <span className="w-5 h-5 rounded-full border-2 border-red-400 text-red-400 font-bold text-xs flex items-center justify-center">
                        !
                      </span>
                    ) : (
                      <svg
                        className="w-4 h-4 text-green-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </span>
                  <h2
                    className="text-base font-bold text-white truncate flex-1 min-w-0"
                    title={result.name}
                  >
                    {result.name}
                  </h2>
                  <span className="flex-shrink-0 bg-slate-600 text-white text-sm font-bold px-3 py-1 rounded-lg shadow">
                    ×{result.amount}
                  </span>
                </div>

                {result.loading ? (
                  <div className="space-y-3 animate-pulse">
                    <div className="h-32 bg-slate-600 rounded" />
                    <div className="h-4 bg-slate-600 rounded" />
                    <div className="h-4 bg-slate-600 rounded" />
                  </div>
                ) : result.error ? (
                  <div className="py-2 space-y-2">
                    <p className="text-red-400 text-xs text-center mb-1">
                      No price found. Edit the name and retry:
                    </p>
                    <input
                      className="w-full bg-slate-700 border border-red-700/50 text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 transition-colors font-sans"
                      value={editNames[result.name] ?? result.name}
                      onChange={(e) =>
                        setEditNames((prev) => ({
                          ...prev,
                          [result.name]: e.target.value,
                        }))
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          const n = (
                            editNames[result.name] ?? result.name
                          ).trim();
                          onRetry(result.name, n || result.name);
                        }
                      }}
                    />
                    <button
                      onClick={() => {
                        const n = (
                          editNames[result.name] ?? result.name
                        ).trim();
                        onRetry(result.name, n || result.name);
                      }}
                      className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-lg transition-colors"
                    >
                      Retry
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3 text-sm">
                    {/* Cached indicator */}
                    {result.cached && (
                      <p className="text-xs text-amber-400/80 text-right -mt-1">
                        ⚡ {formatCachedAge(result.cached_at)}
                      </p>
                    )}
                    <div className="h-32 rounded border border-slate-700 bg-slate-900/40 flex items-center justify-center overflow-hidden">
                      {hasImageError ? (
                        <a
                          className="text-sky-300 text-xs underline px-3 text-center"
                          href={imageUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Image not found. Open image URL
                        </a>
                      ) : (
                        <img
                          src={imageUrl}
                          alt={result.name}
                          className="h-full w-full object-contain"
                          onError={() =>
                            setImageErrors((prev) => ({
                              ...prev,
                              [result.name]: true,
                            }))
                          }
                          referrerPolicy="no-referrer"
                        />
                      )}
                    </div>
                    <div
                      className={`flex justify-between items-center py-1 border-b border-slate-700 ${sortField === "unit_lowest" ? "ring-1 ring-blue-500/40 rounded px-1" : ""}`}
                    >
                      <span className="text-gray-400">Lowest Price</span>
                      <span className="font-medium text-gray-200">
                        {result.lowest_price ?? "N/A"}
                      </span>
                    </div>
                    <div
                      className={`flex justify-between items-center py-1 border-b border-slate-700 ${sortField === "unit_median" ? "ring-1 ring-blue-500/40 rounded px-1" : ""}`}
                    >
                      <span className="text-gray-400">Median Price</span>
                      <span className="font-medium text-gray-200">
                        {result.median_price ?? "N/A"}
                      </span>
                    </div>
                    <div
                      className={`flex justify-between items-center py-1 border-b border-slate-700 ${sortField === "total_lowest" ? "ring-1 ring-blue-500/40 rounded px-1" : ""}`}
                    >
                      <span className="text-rose-400">Total (Lowest)</span>
                      <span className="font-semibold text-rose-300">
                        $
                        {(
                          parsePrice(result.lowest_price) * result.amount
                        ).toFixed(2)}
                      </span>
                    </div>
                    <div
                      className={`flex justify-between items-center py-1 ${sortField === "total_median" ? "ring-1 ring-blue-500/40 rounded px-1" : ""}`}
                    >
                      <span className="text-blue-400">Total (Median)</span>
                      <span className="font-semibold text-blue-300">
                        $
                        {(
                          parsePrice(result.median_price) * result.amount
                        ).toFixed(2)}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ResultsPage;
