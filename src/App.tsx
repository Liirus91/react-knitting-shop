import React, { useEffect, useState } from 'react';
import { Categories } from './components/Categories';
import { Header } from './components/Header';
import { Sort } from './components/Sort';
import { YarnBlock } from './components/YarnBlock';
import './scss/app.scss';
import { Sceleton } from './components/YarnBlock/Skeleton';

export const App = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.apisful.com/v1/collections/products/', {
      headers: {
        'X-Api-Key': 'w5u_4qE8QK4uD50lkFChAaMOCmCz3yIFCcaT5thxVJ8',
      },
    })
      .then((res) => res.json())
      .then(({ results }) => {
        setItems(results);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Вся пряжа</h2>
          <div className="content__items">
            {isLoading
              ? [...new Array(6)].map((_, i) => <Sceleton key={i} />)
              : items.map((yarn: any) => <YarnBlock key={yarn.id} {...yarn} />)}
          </div>
        </div>
      </div>
    </div>
  );
};
