import { TailSpin } from 'react-loader-spinner';
import React from 'react';

export const Loader: React.FC = () => (
  <TailSpin
    height="80"
    width="80"
    color="#31417f"
    radius="1"
    wrapperStyle={{ justifyContent: 'center' }}
    visible={true}
  />
);
