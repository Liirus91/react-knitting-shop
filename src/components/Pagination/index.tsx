import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';

type PaginationProps = {
  onChangePage: (page: number) => void;
  currentPage: number;
  pageCount: number;
};

export const Pagination: React.FC<PaginationProps> = ({
  onChangePage,
  currentPage,
  pageCount,
}) => (
  <ReactPaginate
    className={styles.root}
    breakLabel="..."
    nextLabel=">"
    onPageChange={(e) => onChangePage(e.selected + 1)}
    pageRangeDisplayed={4}
    pageCount={pageCount || 1}
    previousLabel="<"
    forcePage={currentPage - 1}
  />
);
