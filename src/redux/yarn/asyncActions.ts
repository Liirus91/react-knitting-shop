import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Yarn } from './types';

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
