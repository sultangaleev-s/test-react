import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./FilterBlock.module.scss";

export const FilterBlock = ({ className, label, children }) => {
  return (
    <div className={classNames(styles.filterBlock, className)}>
      <div className={styles.label}>{label}</div>
      {children}
    </div>
  );
};

FilterBlock.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  label: PropTypes.string.isRequired,
};

FilterBlock.defaultProps = {
  className: "",
  children: null,
};
