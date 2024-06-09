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
