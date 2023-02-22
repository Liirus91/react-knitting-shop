export type CartItem = {
  id: number;
  title: string;
  price: number;
  image: string;
  color: string;
  weight: number;
  count: number;
};

export interface CartSliceState {
  totalPrice: number;
  items: CartItem[];
}
