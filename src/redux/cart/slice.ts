import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCartFromLS, calcTotalPrice } from '../../utils';
import { CartSliceState, CartItem } from './types';

const { items, totalPrice } = getCartFromLS();

const initialState: CartSliceState = {
  totalPrice,
  items,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const findItem = state.items.find(
        (obj) =>
          obj.id === action.payload.id && obj.color === action.payload.color
      );
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }

      state.totalPrice = calcTotalPrice(state.items);
    },
    minusItem: (
      state,
      action: PayloadAction<{ id: number; color: string }>
    ) => {
      const findItem = state.items.find(
        (obj) =>
          obj.id === action.payload.id && obj.color === action.payload.color
      );

      if (findItem) {
        findItem.count--;
        state.totalPrice -= findItem.price;
      }
    },
    removeItem: (
      state,
      action: PayloadAction<{ id: number; color: string }>
    ) => {
      const findItem = state.items.find(
        (obj) =>
          obj.id === action.payload.id && obj.color === action.payload.color
      );

      if (findItem) {
        state.totalPrice -= findItem.count * findItem.price;

        state.items = state.items.filter(
          (obj) =>
            !(
              obj.id === action.payload.id && obj.color === action.payload.color
            )
        );
      }
    },
    clearItems: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItem, minusItem, removeItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
