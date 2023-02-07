import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SearchContext } from '../App';
import { Categories } from '../components/Categories';
import { Pagination } from '../components/Pagination';
import { Sort } from '../components/Sort';
import { YarnBlock } from '../components/YarnBlock';
import { Sceleton } from '../components/YarnBlock/Skeleton';
import { setCategoryName } from '../redux/slices/filterSlice';
import { RootState } from '../redux/store';

export const Home: React.FC<any> = () => {
  const dispatch = useDispatch();
  const { categoryName, sort } = useSelector(
    (state: RootState) => state.filter
  );
  const sortProperty = sort.sortProperty;

  const { searchValue } = useContext(SearchContext);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurentPage] = useState(1);

  const onChangeCategory = (name: string) => {
    dispatch(setCategoryName(name));
  };

  useEffect(() => {
    setIsLoading(true);
    const category =
      categoryName !== 'All' ? { icontains: categoryName } : undefined;
    const title = searchValue !== '' ? { icontains: searchValue } : undefined;

    fetch(
      'https://api.apisful.com/v1/collections/products/?' +
        new URLSearchParams({
          filter: JSON.stringify({
            category,
            title,
          }),
          order_by: sortProperty,
          per_page: '4',
          page: `${currentPage}`,
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
  }, [categoryName, sortProperty, searchValue, currentPage]);

  const skeletons = [...new Array(4)].map((_, i) => <Sceleton key={i} />);
  const yarns = items.map((yarn: any) => <YarnBlock key={yarn.id} {...yarn} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryName} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">All yarn</h2>
      <div className="content__items">{isLoading ? skeletons : yarns}</div>
      <Pagination
        currentPage={currentPage}
        onChangePage={(num: number) => setCurentPage(num)}
      />
    </div>
  );
};
