import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { sumFormat } from "@helpers/sumFormat";
import styles from "./FlatCard.module.scss";
import { Link } from "react-router-dom";

export const FlatCard = ({ className, data, href }) => {
  const meterPrice = sumFormat("" + Math.round(data.price / data.area_total));
  const price = sumFormat(data.price);

  return (
    <Link to={href} className={classNames(styles.card, className)}>
      <div className={styles.imgWrapper}>
        <img src={data.layout_image} />
      </div>
      <div className={styles.info}>
        <div className={styles.price}>
          <strong>{price} ₽</strong>
          <span>
            {meterPrice} ₽/м<sup>2</sup>
          </span>
        </div>
        <div className={styles.area}>
          <span>{data.rooms}-комн. квартира</span>
          <span>
            {data.area_total} м<sup>2</sup>
          </span>
          <span>{data.floor} эт</span>
        </div>
      </div>
    </Link>
  );
};

FlatCard.propTypes = {
  className: PropTypes.string,
  data: PropTypes.object,
  href: PropTypes.string.isRequired,
};

FlatCard.defaultProps = {
  className: "",
  data: {},
};
