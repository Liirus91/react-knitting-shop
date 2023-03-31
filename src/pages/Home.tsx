import qs from 'qs';
import React, { useCallback, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Categories } from '../components/Categories';
import { Pagination } from '../components/Pagination';
import { Sort, sortList } from '../components/Sort';
import { YarnBlock } from '../components/YarnBlock';
import { Sceleton } from '../components/YarnBlock/Skeleton';
import { YarnError } from '../components/YarnBlock/YarnError';
import { ITEMS_ON_PAGE } from '../constants';
import { filterSelector } from '../redux/filter/selectors';
import {
  setCategoryName,
  setCurrentPage,
  setFilters,
} from '../redux/filter/slice';
import { useAppDispatch } from '../redux/store';
import { fetchYarns } from '../redux/yarn/asyncActions';
import { yarnSelector } from '../redux/yarn/selectors';
import { Status } from '../redux/yarn/types';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { categoryName, sort, currentPage, searchValue } =
    useSelector(filterSelector);
  const sortProperty = sort.sortProperty;
  const { items, status, allItemsCount } = useSelector(yarnSelector);

  const onChangeCategory = useCallback((name: string) => {
    dispatch(setCategoryName(name));
  }, []);

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const getYarns = async () => {
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
      per_page: `${ITEMS_ON_PAGE}`,
      page: `${currentPage}`,
    });

    dispatch(fetchYarns(params));
  };

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortList.find(
        (obj) => obj.sortProperty === params.sortProperty
      );

      dispatch(
        setFilters({
          searchValue: params.searchValue as string,
          categoryName: params.categoryName as string,
          currentPage: Number(params.currentPage),
          sort: sort || sortList[0],
        })
      );
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty,
        categoryName,
        currentPage,
      });

      navigate(`?${queryString}`);
    }

    getYarns();

    isMounted.current = true;
    isSearch.current = false;
    window.scrollTo(0, 0);
  }, [categoryName, sortProperty, currentPage, searchValue]);

  const skeletons = [...new Array(ITEMS_ON_PAGE)].map((_, i) => (
    <Sceleton key={i} />
  ));
  const yarns = items.map((yarn: any) => <YarnBlock key={yarn.id} {...yarn} />);

  const pageCount = Math.ceil(allItemsCount / ITEMS_ON_PAGE);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryName} onChangeCategory={onChangeCategory} />
        <Sort sortType={sort} />
      </div>
      <h2 className="content__title">All yarns</h2>
      {status === 'error' ? (
        <YarnError />
      ) : (
        <div className="content__items">
          {status === Status.LOADING ? skeletons : yarns}
        </div>
      )}
      <Pagination
        currentPage={currentPage}
        onChangePage={onChangePage}
        pageCount={pageCount}
      />
    </div>
  );
};
