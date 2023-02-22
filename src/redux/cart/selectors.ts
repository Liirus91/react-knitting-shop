import { RootState } from '../store';

export const cartSelector = (state: RootState) => state.cart;

export const cartByIdSelector = (id: number) => (state: RootState) =>
  state.cart.items.find((obj) => obj.id === id);
