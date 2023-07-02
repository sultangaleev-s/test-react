import React, { useRef } from "react";
import classNames from "classnames";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import { FilterMemo } from "@components/Filter/Filter";
import { FlatCardList } from "@components/FlatCardList/FlatCardList";
import { Pagination } from "@components/Pagination/Pagination";
import { SortSelectMemo } from "@components/SortSelect/SortSelect";
import { Loader } from "@components/Loader/Loader";
import { getFlats } from "@api/api";
import styles from "./MainPage.module.scss";

const sortList = [
  {
    id: 0,
    name: "По Умолчанию",
    value: "",
  },
  {
    id: 1,
    name: "По цене, сначала дешевые",
    value: "price$asc",
  },
  {
    id: 2,
    name: "По цене, сначала дорогие",
    value: "price$desc",
  },
  {
    id: 3,
    name: "По площади, сначала малые",
    value: "area_total$asc",
  },
  {
    id: 4,
    name: "По площади, сначала большие",
    value: "area_total$desc",
  },
];

export const MainPage = () => {
  const location = useLocation();
  if (location.pathname !== "/") location.pathname = "/";

  const sortRef = useRef(null);

  const { isLoading, error, data } = useQuery(
    ["flatsData", location],
    () => getFlats(location.search),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );

  const { page } = queryString.parse(location.search);
  const ITEM_IN_PAGE = 8;

  const onChangePage = () => {
    if (window.scrollY > sortRef.current?.getBoundingClientRect().top) {
      window.scrollTo({
        behavior: "smooth",
        top: 0,
      });
    }
  };

  return (
    <div className={classNames(styles.page, "container")}>
      <FilterMemo className={styles.filter} />
      <div className={styles.sortSelect} ref={sortRef}>
        <SortSelectMemo
          sortList={sortList}
          activeSelect={sortList[0]}
          sortValue="sort"
          label="Сортировка:"
        />
      </div>
      {error ? (
        <div className={styles.message}>Ошибка, повторите запрос</div>
      ) : isLoading ? (
        <Loader type="list" />
      ) : data.results?.length ? (
        <>
          <FlatCardList list={data?.results} className={styles.list} />
          <div className={styles.pagination}>
            <Pagination
              activePage={+page || 1}
              totalPages={Math.ceil(data.total_count / ITEM_IN_PAGE)}
              onClick={onChangePage}
              className={styles.pagination}
            />
          </div>
        </>
      ) : (
        <div className={styles.message}>Нет результатов</div>
      )}
    </div>
  );
};
