import { RootState } from '../store';

export const cartSelector = (state: RootState) => state.cart;

export const cartByIdAndColorSelector =
  (id: number, color: string) => (state: RootState) =>
    state.cart.items.find((obj) => obj.id === id && obj.color === color);
