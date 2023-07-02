import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Button } from "../Button/Button";
import styles from "./RoomsFilter.module.scss";

const roomsList = ["1", "2", "3", "4"];

export const RoomsFilter = ({ className, rooms, onClick }) => {
  return (
    <div className={classNames(styles.buttons, className)}>
      {roomsList.map((val) => (
        <Button
          theme="filter"
          className={classNames({
            [styles.buttonActive]: rooms.includes(val),
          })}
          key={val}
          onClick={() => onClick(val)}
        >
          {val}
        </Button>
      ))}
    </div>
  );
};

RoomsFilter.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  rooms: PropTypes.array.isRequired,
};

RoomsFilter.defaultProps = {
  className: "",
};
