import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryName: 'All',
  currentPage: 1,
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
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

export const { setCategoryName, setSortType, setCurrentPage } =
  filterSlice.actions;

export default filterSlice.reducer;
