import React, { memo, useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./SortSelect.module.scss";

export const SortSelect = ({
  className,
  sortList,
  activeSelect,
  sortValue,
  label,
}) => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [select, setSelect] = useState(activeSelect);

  const onOpenHandler = () => {
    setIsOpen((prev) => !prev);
  };

  const onSelectHandler = (item) => {
    setSelect(item);
    setIsOpen(false);

    setSearchParams((params) => {
      if (item.value) {
        params.set(sortValue, item.value);
      } else {
        params.delete(sortValue);
      }
      return params;
    });
  };

  useEffect(() => {
    if (select.value !== searchParams.get(sortValue)) {
      setSelect(
        sortList.find((item) => item.value === searchParams.get(sortValue)) ||
          sortList[0]
      );
    }
  }, [location]);

  return (
    <div className={classNames(styles.wrapper, className)}>
      <span className={styles.label}>{label}</span>
      <button type="button" onClick={onOpenHandler} className={styles.head}>
        {select.name}
      </button>
      {isOpen && (
        <div className={styles.dropdown}>
          {sortList.map((item) => (
            <button
              type="button"
              onClick={() => onSelectHandler(item)}
              key={item.id}
              className={classNames(styles.select, {
                [styles.active]: select.id === item.id,
              })}
            >
              {item.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

SortSelect.propTypes = {
  className: PropTypes.string,
  sortList: PropTypes.array.isRequired,
  activeSelect: PropTypes.object.isRequired,
  sortValue: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

SortSelect.defaultProps = {
  className: "",
};

export const SortSelectMemo = memo(SortSelect);
