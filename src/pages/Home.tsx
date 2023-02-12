import axios from 'axios';
import qs from 'qs';
import React, { useState, useEffect, useContext, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../App';
import { Categories } from '../components/Categories';
import { Pagination } from '../components/Pagination';
import { Sort, sortList } from '../components/Sort';
import { YarnBlock } from '../components/YarnBlock';
import { Sceleton } from '../components/YarnBlock/Skeleton';
import {
  setCategoryName,
  setCurrentPage,
  setFilters,
} from '../redux/slices/filterSlice';
import { RootState } from '../redux/store';

export const Home: React.FC<any> = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

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

  const fetchYarns = async () => {
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

    try {
      const res = await API.get('collections/products/?' + params);
      setItems(res.data.results);
    } catch (e) {
      console.error('Error getting yarn ', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortList.find(
        (obj) => obj.sortProperty === params.sortProperty
      );

      dispatch(setFilters({ ...params, sort }));
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    window.scroll(0, 0);

    if (!isSearch.current) {
      fetchYarns();
    }

    isSearch.current = false;
  }, [categoryName, sortProperty, searchValue, currentPage]);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty,
        categoryName,
        currentPage,
      });

      navigate(`?${queryString}`);
    }

    isMounted.current = true;
  }, [categoryName, sortProperty, currentPage, navigate]);

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
