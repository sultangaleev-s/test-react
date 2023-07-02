import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./Title.module.scss";

export const Title = ({ children, className, isHeader }) => {
  if (isHeader) {
    return <h1 className={classNames(className, styles.title)}>{children}</h1>;
  }

  return <h2 className={classNames(className, styles.subtitle)}>{children}</h2>;
};

Title.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  isHeader: PropTypes.bool,
};

Title.defaultProps = {
  className: "",
  isHeader: true,
};
