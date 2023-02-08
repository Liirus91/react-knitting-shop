import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SearchContext } from '../App';
import { Categories } from '../components/Categories';
import { Pagination } from '../components/Pagination';
import { Sort } from '../components/Sort';
import { YarnBlock } from '../components/YarnBlock';
import { Sceleton } from '../components/YarnBlock/Skeleton';
import { setCategoryName, setCurrentPage } from '../redux/slices/filterSlice';
import { RootState } from '../redux/store';

export const Home: React.FC<any> = () => {
  const dispatch = useDispatch();
  const { categoryName, sort, currentPage } = useSelector(
    (state: RootState) => state.filter
  );
  const sortProperty = sort.sortProperty;

  const { searchValue } = useContext(SearchContext);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const onChangeCategory = (name: string) => {
    dispatch(setCategoryName(name));
  };

  const onChangePage = (num: number) => {
    dispatch(setCurrentPage(num));
  };

  useEffect(() => {
    setIsLoading(true);
    const category =
      categoryName !== 'All' ? { icontains: categoryName } : undefined;
    const title = searchValue !== '' ? { icontains: searchValue } : undefined;
    const filter = JSON.stringify({
      category,
      title,
    });
    const params = new URLSearchParams({
      filter,
      order_by: sortProperty,
      per_page: '4',
      page: `${currentPage}`,
    });

    const API = axios.create({
      baseURL: 'https://api.apisful.com/v1/',
      headers: {
        'X-Api-Key': 'w5u_4qE8QK4uD50lkFChAaMOCmCz3yIFCcaT5thxVJ8',
      },
    });

    API.get('collections/products/?' + params).then(({ data }) => {
      setItems(data.results);
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
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};
