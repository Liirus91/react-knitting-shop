import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterSliceState, SortPropertyEnum, SortItem } from './types';

export const initialStateFilter: FilterSliceState = {
  searchValue: '',
  categoryName: 'All',
  currentPage: 1,
  sort: {
    name: 'rating (DESC)',
    sortProperty: SortPropertyEnum.RATING_DESC,
  },
};

export const filterSlice = createSlice({
  name: 'filters',
  initialState: initialStateFilter,
  reducers: {
    setCategoryName: (state, action: PayloadAction<string>) => {
      state.categoryName = action.payload;
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    setSortType: (state, action: PayloadAction<SortItem>) => {
      state.sort = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setFilters: (state, action: PayloadAction<FilterSliceState>) => {
      state.categoryName = action.payload.categoryName;
      state.sort = action.payload.sort;
      state.currentPage = +action.payload.currentPage;
    },
  },
});

export const {
  setCategoryName,
  setSearchValue,
  setSortType,
  setCurrentPage,
  setFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
