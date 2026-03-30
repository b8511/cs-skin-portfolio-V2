import { useState } from "react";

// Define what props this component receives
interface ResultsPageProps {
  results: Array<{
    name: string;
    amount: number;
    lowest_price?: string;
    median_price?: string;
    success: boolean;
    loading?: boolean;
  }>;
  onGoBack: () => void;
}

function ResultsPage({ results, onGoBack }: ResultsPageProps) {
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const buildImageUrl = (name: string) => {
    const normalized = name
      .replace(/\s+/g, "_")
      .replace(/[^a-zA-Z0-9_&]+/g, "")
      .replace(/_+/g, "_")
      .replace(/^_+|_+$/g, "");
    return `https://www.csgodatabase.com/images/containers/webp/${normalized}.webp`;
  };
  const loadedResults = results.filter((r) => !r.loading);
  const loadingCount = results.filter((r) => r.loading).length;
  const isLoading = loadingCount > 0;

  const totalLowest = loadedResults.reduce(
    (sum, result) =>
      sum + parseFloat(result.lowest_price?.slice(1) || "0") * result.amount,
    0,
  );
  const totalMedian = loadedResults.reduce(
    (sum, result) =>
      sum + parseFloat(result.median_price?.slice(1) || "0") * result.amount,
    0,
  );

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
                <div className="h-9 bg-rose-800/50 rounded animate-pulse"></div>
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
                <div className="h-9 bg-blue-800/50 rounded animate-pulse"></div>
              ) : (
                <p className="text-3xl font-bold text-blue-300">
                  ${totalMedian.toFixed(2)}
                </p>
              )}
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-4 text-center">
            {isLoading
              ? `Loading ${loadingCount} of ${results.length} items...`
              : `${results.length} ${results.length === 1 ? "item" : "items"} tracked`}
          </p>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {results.map((result) => {
            const imageUrl = buildImageUrl(result.name);
            const hasImageError = imageErrors[result.name];

            return (
              <div
                key={result.name}
                className={`rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 p-5 border relative ${
                  result.loading
                    ? "bg-slate-700/50 border-slate-600 animate-pulse"
                    : "bg-slate-800 border-slate-700"
                }`}
              >
                <span className="absolute top-3 right-3 bg-slate-600 text-white text-sm font-bold px-3 py-2 rounded-lg shadow">
                  ×{result.amount}
                </span>
                <h2
                  className="text-lg font-bold text-white mb-3 truncate pr-8"
                  title={result.name}
                >
                  {result.name}
                </h2>

                {result.loading ? (
                  <div className="space-y-3">
                    <div className="h-32 bg-slate-600 rounded animate-pulse"></div>
                    <div className="h-4 bg-slate-600 rounded animate-pulse"></div>
                    <div className="h-4 bg-slate-600 rounded animate-pulse"></div>
                  </div>
                ) : (
                  <div className="space-y-3 text-sm">
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
                    <div className="flex justify-between items-center py-1 border-b border-slate-700">
                      <span className="text-gray-400">Lowest Price</span>
                      <span className="font-medium text-gray-200">
                        {result.lowest_price ?? "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-slate-700">
                      <span className="text-gray-400">Median Price</span>
                      <span className="font-medium text-gray-200">
                        {result.median_price ?? "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-slate-700">
                      <span className="text-rose-400">Total (Lowest)</span>
                      <span className="font-semibold text-rose-300">
                        $
                        {(
                          parseFloat(result.lowest_price?.slice(1) || "0") *
                          result.amount
                        ).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-blue-400">Total (Median)</span>
                      <span className="font-semibold text-blue-300">
                        $
                        {(
                          parseFloat(result.median_price?.slice(1) || "0") *
                          result.amount
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
