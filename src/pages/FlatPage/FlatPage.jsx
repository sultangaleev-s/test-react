import React from "react";
import classNames from "classnames";
import { useQuery } from "react-query";
import { useParams, Link } from "react-router-dom";
import { sumFormat } from "@helpers/sumFormat";
import { getMeterPrice } from "@helpers/getMetrePrice";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import { BackLink } from "@components/BackLink/BackLink";
import { Title } from "@components/Title/Title";
import { Loader } from "@components/Loader/Loader";
import { getFlatById } from "@api/api";
import styles from "./FlatPage.module.scss";

export const FlatPage = () => {
  const { id } = useParams();

  const { isLoading, error, data } = useQuery(
    "flatItemData",
    () => getFlatById(id),
    {
      refetchOnWindowFocus: false,
    }
  );
  if (isLoading) return <Loader type="page" />;

  if (error)
    return (
      <div className={styles.message}>
        Ошибка: {error.message} <br /> Повторите запрос или перейдите на{" "}
        <Link to="/">главную страницу</Link>
      </div>
    );

  return (
    <div className={classNames("container", styles.page)}>
      <BackLink className={styles.return} />
      <Title className={styles.title}>Подробная информация</Title>
      {data ? (
        <>
          <div className={styles.imgWrapper}>
            <Swiper
              className={styles.swiper}
              modules={[Pagination]}
              pagination={{ clickable: true }}
              slidesPerView={1}
            >
              <SwiperSlide className={styles.slide}>
                <img src={data.layout_image} />
              </SwiperSlide>
              <SwiperSlide className={styles.slide}>
                <img src={data.floor_shema} />
              </SwiperSlide>
            </Swiper>
          </div>
          <ul className={styles.infoList}>
            <Title className={styles.subtitle} isHeader={false}>
              Характеристики квартиры
            </Title>
            <li className={styles.listItem}>
              <span>Цена</span>
              <strong>{sumFormat(data.price)} ₽</strong>
            </li>
            <li className={styles.listItem}>
              <span>
                Цена за м<sup>2</sup>
              </span>
              <strong>
                {sumFormat(getMeterPrice(data.price, data.area_total))} ₽
              </strong>
            </li>
            <li className={styles.listItem}>
              <span>Количество комнат</span>
              <strong>{data.rooms}</strong>
            </li>
            <li className={styles.listItem}>
              <span>Этаж</span>
              <strong>{data.floor}</strong>
            </li>
            <li className={styles.listItem}>
              <span>Общая площадь</span>
              <strong>
                {data.area_total} м<sup>2</sup>
              </strong>
            </li>
            <li className={styles.listItem}>
              <span>Жилая площадь</span>
              <strong>
                {data.area_live} м<sup>2</sup>
              </strong>
            </li>
            <li className={styles.listItem}>
              <span>Площадь кухни</span>
              <strong>
                {data.area_kitchen} м<sup>2</sup>
              </strong>
            </li>
          </ul>
        </>
      ) : (
        <Title>Загрузка</Title>
      )}
    </div>
  );
};
