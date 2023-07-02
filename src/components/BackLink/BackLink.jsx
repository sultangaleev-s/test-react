import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { useNavigate } from "react-router-dom";
import styles from "./BackLink.module.scss";

export const BackLink = ({ className }) => {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      className={classnames(styles.button, className)}
      onClick={() => navigate(-1)}
    >
      назад
    </button>
  );
};

BackLink.propTypes = {
  className: PropTypes.string,
};

BackLink.defaultProps = {
  className: "",
};
