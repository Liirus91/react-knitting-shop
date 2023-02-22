import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchYarns } from './asyncActions';
import { YarnSliceState, Status, Yarn } from './types';

const initialState: YarnSliceState = {
  items: [],
  status: Status.LOADING,
};

export const yarnSlice = createSlice({
  name: 'yarn',
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<Yarn[]>) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchYarns.pending, (state) => {
      state.items = [];
      state.status = Status.LOADING;
    });
    builder.addCase(fetchYarns.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchYarns.rejected, (state) => {
      state.items = [];
      state.status = Status.ERROR;
    });
  },
});

export const { setItems } = yarnSlice.actions;

export default yarnSlice.reducer;
