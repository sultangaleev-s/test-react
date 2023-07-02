import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { useSearchParams } from "react-router-dom";
import styles from "./Pagination.module.scss";

export const Pagination = ({
  className,
  totalPages,
  activePage,
  pageLimit,
  onClick,
}) => {
  const [, setSearchParams] = useSearchParams();
  const [paginationView, setPaginationView] = useState([]);
  const arrayOfMaxPages = Array.from({ length: totalPages }).map(
    (_, i) => i + 1
  );

  const onClickHandler = (pageNumber) => {
    setSearchParams((params) => {
      params.set("page", pageNumber);
      return params;
    });
    onClick && onClick();
  };

  useEffect(() => {
    const sliced = arrayOfMaxPages.slice(
      Math.max(0, activePage - pageLimit - 1),
      Math.max(5, activePage + pageLimit)
    );

    setPaginationView(sliced);
  }, [activePage, totalPages]);

  return (
    <ul className={classNames(styles.pagination, className)}>
      {!paginationView.includes(1) && (
        <li
          className={classNames(
            styles.paginationItem,
            styles.paginationItemAround
          )}
        >
          <button
            onClick={() => onClickHandler(1)}
            className={styles.paginationButton}
            type="button"
          >
            1
          </button>
          <span className={styles.dots}>...</span>
        </li>
      )}
      {paginationView.map((item) => (
        <li key={item} className={styles.paginationItem}>
          <button
            onClick={() => onClickHandler(item)}
            className={classNames(styles.paginationButton, {
              [styles.active]: activePage === item,
            })}
            type="button"
          >
            {item}
          </button>
        </li>
      ))}
      {!paginationView.includes(totalPages) && (
        <li
          className={classNames(
            styles.paginationItem,
            styles.paginationItemAround
          )}
        >
          <span className={styles.dots}>...</span>
          <button
            onClick={() => onClickHandler(totalPages)}
            className={styles.paginationButton}
            type="button"
          >
            {totalPages}
          </button>
        </li>
      )}
    </ul>
  );
};

Pagination.propTypes = {
  className: PropTypes.string,
  totalPages: PropTypes.number.isRequired,
  activePage: PropTypes.number.isRequired,
  onClick: PropTypes.func,
  pageLimit: PropTypes.number,
  paginationStep: PropTypes.number,
};

Pagination.defaultProps = {
  className: "",
  params: "",
  pageLimit: 3,
  onClick: () => {},
};
