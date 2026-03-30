import ItemRow from "./ItemRow";
import { Item, ItemsListProps } from "../types/Items";

function ItemsList({
  items,
  deleteItem,
  updateItem,
  onLockIn,
}: ItemsListProps) {
  return (
    <div className="bg-slate-800 rounded-xl shadow-lg p-6 w-full border border-slate-700">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold text-white">Items List</h2>
          <span className="bg-slate-700 text-gray-300 text-sm font-medium px-3 py-1 rounded-full">
            {items.length} {items.length === 1 ? "item" : "items"}
          </span>
        </div>
        <button
          className="px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={onLockIn}
          disabled={items.length === 0}
        >
          🔒 Lock In
        </button>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <p className="text-lg">No items added yet</p>
          <p className="text-sm mt-1">
            Add your first item using the form above
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {items
            .slice()
            .reverse()
            .map((item: Item) => (
              <ItemRow
                key={item.id}
                id={item.id}
                name={item.name}
                count={item.count}
                onDelete={deleteItem}
                onUpdate={updateItem}
              />
            ))}
        </div>
      )}
    </div>
  );
}

export default ItemsList;
