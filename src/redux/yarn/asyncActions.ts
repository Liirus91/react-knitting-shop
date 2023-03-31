import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Yarn } from './types';

export const API = axios.create({
  baseURL: 'https://api.apisful.com/v1/',
  headers: {
    'X-Api-Key': 'ks7Dqj0GciTR2vPVwWs6XKUiIdm_BRGkv75dnmgdArM',
  },
});

export const fetchYarns = createAsyncThunk(
  'yarn/fetchYarnsStatus',
  async (params: URLSearchParams) => {
    const { data } = await API.get('collections/products/?' + params);

    return data;
  }
);
