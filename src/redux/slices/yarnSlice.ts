import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

const API = axios.create({
  baseURL: 'https://api.apisful.com/v1/',
  headers: {
    'X-Api-Key': 'w5u_4qE8QK4uD50lkFChAaMOCmCz3yIFCcaT5thxVJ8',
  },
});

export const fetchYarns = createAsyncThunk(
  'yarn/fetchYarnsStatus',
  async (params: any) => {
    const { data } = await API.get('collections/products/?' + params);

    return data.results;
  }
);

const initialState = {
  items: [],
  status: Status.LOADING,
};

export const yarnSlice = createSlice({
  name: 'yarn',
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchYarns.pending, (state) => {
      state.items = [];
      state.status = Status.LOADING;
    });
    builder.addCase(fetchYarns.fulfilled, (state, action: any) => {
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
