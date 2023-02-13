import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

const initialState = {
  searchValue: '',
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
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
    setSortType: (state, action) => {
      state.sort = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setFilters: (state, action) => {
      state.categoryName = action.payload.categoryName;
      state.sort = action.payload.sort;
      state.currentPage = +action.payload.currentPage;
    },
  },
});

export const filterSelector = (state: RootState) => state.filter;
export const filterSortSelector = (state: RootState) => state.filter.sort;

export const {
  setCategoryName,
  setSearchValue,
  setSortType,
  setCurrentPage,
  setFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
