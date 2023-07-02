import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./SearchInput.module.scss";

export const Input = ({ className, ...props }) => {
  return <input className={classNames(className, styles.input)} {...props} />;
};

Input.propTypes = {
  className: PropTypes.string,
};

Input.defaultProps = {
  className: "",
};
