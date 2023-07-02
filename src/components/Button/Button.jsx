import React, { useMemo } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./Button.module.scss";

export const Button = ({ className, theme, children, ...props }) => {
  const themeClass = useMemo(() => {
    if (theme === "filter") return styles.filter;
    if (theme === "white") return styles.white;
    if (theme === "close") return styles.close;
    return styles.default;
  }, []);
  return (
    <button
      type="button"
      className={classNames(className, styles.button, themeClass)}
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  theme: PropTypes.string,
};

Button.defaultProps = {
  children: null,
  className: "",
  theme: null,
};
