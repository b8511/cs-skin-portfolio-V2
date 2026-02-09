import React from "react";

// Define what props this component receives
interface ResultsPageProps {
  results: Array<{
    name: string;
    amount: number;
    lowest_price?: string;
    median_price?: string;
    success: boolean;
  }>;
  onGoBack: () => void;
}

function ResultsPage({ results, onGoBack }: ResultsPageProps) {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <button
        onClick={onGoBack}
        className="mb-4 px-4 py-2 bg-gray-600 text-white rounded"
      >
        ← Go Back
      </button>

      <h1 className="text-2xl font-bold mb-4">Price Results</h1>
      <div className="bg-slate-400 p-4 rounded mb-1">
        <p className="text-rose-700 text-lg font-semibold ">
          Total Lowest Price: $
          {results
            .reduce(
              (sum, result) => sum + parseFloat(result.lowest_price || "0"),
              0,
            )
            .toFixed(2)}
        </p>
        <p className="text-blue-700 text-lg font-semibold">
          Total Median Price: $
          {results
            .reduce(
              (sum, result) => sum + parseFloat(result.median_price || "0"),
              0,
            )
            .toFixed(2)}
        </p>
      </div>
      {results.map((result) => (
        <div key={result.name} className="bg-white p-4 rounded shadow mb-2">
          <h2 className="text-xl font-semibold">{result.name}</h2>
          <p>Lowest Price: {result.lowest_price ?? "N/A"}</p>
          <p>Median Price: {result.median_price ?? "N/A"}</p>
          <p>Amount: {result.amount}</p>
          <p>
            Total Lowest Price: $
            {(parseFloat(result.lowest_price || "0") * result.amount).toFixed(
              2,
            )}
          </p>
          <p>
            Total Median Price: $
            {(parseFloat(result.median_price || "0") * result.amount).toFixed(
              2,
            )}
          </p>
        </div>
      ))}
    </div>
  );
}

export default ResultsPage;
