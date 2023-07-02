import React, { useState, useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { useDebounce } from "../../hooks/useDebounce";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./SearchInput.module.scss";

export const SearchInput = ({ className, name, ...props }) => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(searchParams.get(name) || "");

  const debounceSearchValue = useDebounce(searchValue, 250);

  useEffect(() => {
    setSearchParams((params) => {
      if (searchValue) {
        params.set(name, searchValue);
        params.delete("page");
      } else {
        params.delete(name);
      }
      return params;
    });
  }, [debounceSearchValue]);

  useEffect(() => {
    const newValue = searchParams.get(name) || "";
    setSearchValue(newValue);
  }, [location]);

  return (
    <input
      onChange={(e) => setSearchValue(e.target.value)}
      className={classNames(className, styles.input)}
      value={searchValue}
      {...props}
    />
  );
};

SearchInput.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
};

SearchInput.defaultProps = {
  className: "",
};
