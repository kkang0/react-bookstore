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
  mainBookTitle: string;
  delivery: Delivery;
}

export interface Delivery {
  address: string;
  recipient: string;
  contact: string;
}

export interface OrderDetailItem {
  bookId: number;
  title: string;
  author: string;
  price: number;
  quantity: number;
}

export interface OrderListItem extends Order {
  detail?: OrderDetailItem[];
}
