import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export const API = axios.create({
  baseURL: 'https://api.apisful.com/v1/',
  headers: {
    'X-Api-Key': 'w5u_4qE8QK4uD50lkFChAaMOCmCz3yIFCcaT5thxVJ8',
  },
});

export const fetchYarns = createAsyncThunk(
  'yarn/fetchYarnsStatus',
  async (params: URLSearchParams) => {
    const { data } = await API.get('collections/products/?' + params);

    return data.results as Yarn[];
  }
);

type Yarn = {
  category: string;
  colors: string[];
  images: string[];
  price: number;
  rating: number;
  title: string;
  weight: number;
};

interface YarnSliceState {
  items: Yarn[];
  status: Status;
}

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

export const yarnSelector = (state: RootState) => state.yarn;

export const { setItems } = yarnSlice.actions;

export default yarnSlice.reducer;
