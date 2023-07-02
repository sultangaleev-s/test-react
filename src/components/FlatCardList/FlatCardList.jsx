import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./FlatCardList.module.scss";
import { FlatCard } from "../FlatCard/FlatCard";

export const FlatCardList = ({ className, list }) => {
  return (
    <div className={classNames(styles.wrapper, className)}>
      {list.map((data) => (
        <FlatCard
          data={data}
          className={styles.card}
          key={data.id}
          href={`/flat/${data.id}`}
        />
      ))}
    </div>
  );
};

FlatCardList.propTypes = {
  className: PropTypes.string,
  list: PropTypes.array,
};

FlatCardList.defaultProps = {
  className: "",
  list: [],
};
