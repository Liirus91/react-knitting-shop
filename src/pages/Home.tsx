import qs from 'qs';
import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Categories } from '../components/Categories';
import { Pagination } from '../components/Pagination';
import { Sort, sortList } from '../components/Sort';
import { YarnBlock } from '../components/YarnBlock';
import { Sceleton } from '../components/YarnBlock/Skeleton';
import {
  filterSelector,
  setCategoryName,
  setCurrentPage,
  setFilters,
} from '../redux/slices/filterSlice';
import { fetchYarns, Status, yarnSelector } from '../redux/slices/yarnSlice';
import { useAppDispatch } from '../redux/store';

export const Home: React.FC<any> = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { categoryName, sort, currentPage, searchValue } =
    useSelector(filterSelector);
  const sortProperty = sort.sortProperty;
  const { items, status } = useSelector(yarnSelector);

  const onChangeCategory = (name: string) => {
    dispatch(setCategoryName(name));
  };

  const onChangePage = (num: number) => {
    dispatch(setCurrentPage(num));
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
      per_page: '4',
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

      dispatch(setFilters({ ...params, sort }));
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    window.scroll(0, 0);

    //TODO: fix bug
    // if (!isSearch.current) {
    getYarns();
    //}

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
  const yarns = items.map((yarn: any) => (
    <Link to={`/yarn/${yarn.id}`} key={yarn.id}>
      <YarnBlock {...yarn} />
    </Link>
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryName} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">All yarn</h2>
      {/* TODO: add new component */}
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>
            An error has occurred <span>😕</span>
          </h2>
          <p>Sorry, could not get the yarn. Please try again Later.</p>
        </div>
      ) : (
        <div className="content__items">
          {status === Status.LOADING ? skeletons : yarns}
        </div>
      )}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};
