import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryName: 'All',
  sort: {
    name: 'rating (DESC)',
    sortProperty: 'rating',
  },
};

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryName: (state, action) => {
      state.categoryName = action.payload;
    },
    setSortType: (state, action) => {
      state.sort = action.payload;
    },
  },
});

export const { setCategoryName, setSortType } = filterSlice.actions;

export default filterSlice.reducer;
