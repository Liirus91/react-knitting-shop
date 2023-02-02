import React, { useState, useEffect } from 'react';
import { Categories } from '../components/Categories';
import { Sort } from '../components/Sort';
import { YarnBlock } from '../components/YarnBlock';
import { Sceleton } from '../components/YarnBlock/Skeleton';

export const Home = () => {
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
    window.scroll(0, 0);
  }, []);
  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">All yarn</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, i) => <Sceleton key={i} />)
          : items.map((yarn: any) => <YarnBlock key={yarn.id} {...yarn} />)}
      </div>
    </div>
  );
};
