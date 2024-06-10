export interface Order {
  id: number;
  createdAt: string;
  address: string;
  recipient: string;
  contact: string;
  bookTitle: string;
  totalQuantity: number;
  totalPrice: number;
}

export interface OrderSheet {
  items: number[];
  totalQuantity: number;
  totalPrice: number;
  fisrtBookTitle: string;
  delivery: {
    address: string;
    recipient: string;
    contact: string;
  };
}
