export interface Item {
  id: number;
  name: string;
  count: number;
}

export interface ItemsListProps {
  items: Item[];
  deleteItem: (id: number) => void;
  updateItem: (id: number, name: string, count: number) => void;
}
