export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export type Yarn = {
  category: string;
  colors: string[];
  images: string[];
  price: number;
  rating: number;
  title: string;
  weight: number;
};

export interface YarnSliceState {
  items: Yarn[];
  status: Status;
}
