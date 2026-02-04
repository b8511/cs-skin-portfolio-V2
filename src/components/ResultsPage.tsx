import React from "react";

// Define what props this component receives
interface ResultsPageProps {
  results: Array<{
    name: string;
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

      {/* YOUR JOB: Display the results here! */}
      {/* Hint: Use results.map() to loop through and show each item */}
      {/* Each result has: name, lowest_price, median_price, success */}
      {results.map((result, index) => (
        <div key={result.name} className="bg-white p-4 rounded shadow mb-2">
          <h2 className="text-xl font-semibold">{result.name}</h2>
          <p>Lowest Price: {result.lowest_price ?? "N/A"}</p>
          <p>Median Price: {result.median_price ?? "N/A"}</p>
          <p>Status: {result.success ? "Success" : "Failed"}</p>
        </div>
      ))}
    </div>
  );
}

export default ResultsPage;
