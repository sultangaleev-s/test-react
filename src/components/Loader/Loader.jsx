import React from "react";
import PropTypes from "prop-types";
import styles from "./Loader.module.scss";
import classNames from "classnames";

export const Loader = ({ type }) => {
  return (
    <div
      className={classNames(styles.roller, {
        [styles.page]: type === "page",
        [styles.list]: type === "list",
      })}
    >
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

Loader.propTypes = {
  type: PropTypes.string,
};

Loader.defaultProps = {
  type: null,
};
