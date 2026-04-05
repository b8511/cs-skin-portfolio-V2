import { useState, useEffect } from "react";
import ItemForm from "./components/ItemForm";
import ItemsList from "./components/ItemsList";
import PortfolioKeyManager from "./components/PortfolioKeyManager";
import { Item } from "./types/Items";
import ResultsPage from "./components/ResultsPage";
import { fetchItemPrice } from "./api/steamApi";
import {
  getPortfolioFromUrl,
  hasPortfolioInUrl,
  loadFromLocalStorage,
  saveToLocalStorage,
} from "./utils/portfolioCodec";

interface PriceResult {
  name: string;
  amount: number;
  lowest_price?: string;
  median_price?: string;
  success: boolean;
  loading?: boolean;
  error?: boolean;
  cached?: boolean;
  cached_at?: number;
  resolved_name?: string;
}

function App() {
  const [currentPage, setCurrentPage] = useState("main");
  const [priceResults, setPriceResults] = useState<PriceResult[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load portfolio from URL or localStorage on mount
  useEffect(() => {
    if (hasPortfolioInUrl()) {
      // Priority 1: URL parameter
      const urlItems = getPortfolioFromUrl();
      if (urlItems.length > 0) {
        setItems(urlItems);
        // Also save to localStorage for persistence
        saveToLocalStorage(urlItems);
        // Clear URL param after loading (optional - keeps URL clean)
        window.history.replaceState({}, "", window.location.pathname);
      }
    } else {
      // Priority 2: localStorage
      const storedItems = loadFromLocalStorage();
      if (storedItems.length > 0) {
        setItems(storedItems);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever items change (after initial load)
  useEffect(() => {
    if (isLoaded) {
      saveToLocalStorage(items);
    }
  }, [items, isLoaded]);

  const handleLockIn = async () => {
    // Initialise every item as loading so the results page shows progress immediately
    const initial: PriceResult[] = items.map((item) => ({
      name: item.name,
      amount: item.count,
      success: false,
      loading: true,
      error: false,
    }));
    setPriceResults(initial);
    setCurrentPage("results");

    for (const item of items) {
      try {
        const result = await fetchItemPrice(item.name);
        setPriceResults((prev) =>
          prev.map((r) =>
            r.name === item.name
              ? {
                  ...r,
                  ...result,
                  name: result.resolved_name ?? r.name,
                  loading: false,
                  error:
                    !result.success ||
                    (!result.lowest_price && !result.median_price),
                }
              : r,
          ),
        );
      } catch {
        setPriceResults((prev) =>
          prev.map((r) =>
            r.name === item.name
              ? { ...r, loading: false, success: false, error: true }
              : r,
          ),
        );
      }
    }
  };

  const addItem = (name: string, count: number) => {
    const newItem: Item = {
      id: items.length > 0 ? items[items.length - 1].id + 1 : 1,
      name,
      count,
    };
    setItems([...items, newItem]);
  };

  const deleteItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const updateItem = (id: number, name: string, count: number) => {
    setItems(
      items.map((item) => (item.id === id ? { ...item, name, count } : item)),
    );
  };

  const loadPortfolio = (newItems: Item[]) => {
    setItems(newItems);
  };

  const handleRetry = async (oldName: string, newName: string) => {
    setPriceResults((prev) =>
      prev.map((r) =>
        r.name === oldName
          ? { ...r, name: newName, loading: true, error: false, success: false }
          : r,
      ),
    );
    try {
      const result = await fetchItemPrice(newName);
      setPriceResults((prev) =>
        prev.map((r) =>
          r.name === newName
            ? {
                ...r,
                ...result,
                name: result.resolved_name ?? r.name,
                loading: false,
                error:
                  !result.success ||
                  (!result.lowest_price && !result.median_price),
              }
            : r,
        ),
      );
    } catch {
      setPriceResults((prev) =>
        prev.map((r) =>
          r.name === newName
            ? { ...r, loading: false, success: false, error: true }
            : r,
        ),
      );
    }
  };

  if (currentPage === "results") {
    return (
      <ResultsPage
        results={priceResults}
        onGoBack={() => setCurrentPage("main")}
        onRetry={handleRetry}
      />
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-slate-800 flex flex-col items-center py-10 px-4">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-white mb-2">CS Skin Tracker</h1>
        <p className="text-gray-400">
          Track and manage your Counter-Strike skins
        </p>
      </header>
      <div className="w-full max-w-2xl space-y-6">
        <ItemForm addItem={addItem} />
        <ItemsList
          items={items}
          deleteItem={deleteItem}
          updateItem={updateItem}
          onLockIn={handleLockIn}
        />
        <PortfolioKeyManager items={items} onLoadPortfolio={loadPortfolio} />
      </div>
    </div>
  );
}

export default App;
