import React, { useState, useEffect } from 'react';
import { Categories } from '../components/Categories';
import { Sort } from '../components/Sort';
import { YarnBlock } from '../components/YarnBlock';
import { Sceleton } from '../components/YarnBlock/Skeleton';

export const Home: React.FC<any> = ({ searchValue }) => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryName, setCategoryName] = useState('All');
  const [sortType, setSortType] = useState({
    name: 'rating (DESC)',
    sortProperty: 'rating',
  });

  const skeletons = [...new Array(4)].map((_, i) => <Sceleton key={i} />);
  const yarns = items.map((yarn: any) => <YarnBlock key={yarn.id} {...yarn} />);

  useEffect(() => {
    setIsLoading(true);
    const category =
      categoryName !== 'All' ? categoryName.toLowerCase() : undefined;
    const title = searchValue !== '' ? { icontains: searchValue } : undefined;

    fetch(
      'https://api.apisful.com/v1/collections/products/?' +
        new URLSearchParams({
          filter: JSON.stringify({
            category,
            title,
          }),
          order_by: sortType.sortProperty,
        }),
      {
        headers: {
          'X-Api-Key': 'w5u_4qE8QK4uD50lkFChAaMOCmCz3yIFCcaT5thxVJ8',
        },
      }
    )
      .then((res) => res.json())
      .then(({ results }) => {
        setItems(results);
        setIsLoading(false);
      });

    window.scroll(0, 0);
  }, [categoryName, sortType, searchValue]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryName}
          onChangeCategory={(name: string) => setCategoryName(name)}
        />
        <Sort
          value={sortType}
          onChangeSort={(item: any) => setSortType(item)}
        />
      </div>
      <h2 className="content__title">All yarn</h2>
      <div className="content__items">{isLoading ? skeletons : yarns}</div>
    </div>
  );
};
