import React, { useEffect, useState, memo } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { useLocation, useSearchParams } from "react-router-dom";
import { Button } from "@components/Button/Button";
import { FilterBlock } from "@components/FilterBlock/FilterBlock";
import { SearchInput } from "@components/Input/SearchInput";
import { Modal } from "@components/Modal/Modal";
import { FilterFormMemo } from "@components/FilterForm/FilterForm";
import { RoomsFilter } from "@components/RoomsFilter/RoomsFilter";
import styles from "./Filter.module.scss";

export const Filter = ({ className }) => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [rooms, setRooms] = useState(searchParams.getAll("rooms"));
  const [isOpen, setIsOpen] = useState(false);

  const onClickRoom = (val) => {
    const newRooms = rooms.includes(val)
      ? rooms.filter((room) => room !== val)
      : [...rooms, val];
    setRooms(newRooms);

    setSearchParams((params) => {
      params.delete("rooms");
      params.delete("page");
      newRooms.forEach((room) => {
        params.append("rooms", room);
      });
      return params;
    });
  };

  useEffect(() => {
    setRooms(searchParams.getAll("rooms"));
  }, [location.search]);

  return (
    <div className={classNames(styles.filter, className)}>
      <div className={styles.wrapper}>
        <FilterBlock
          className={classNames(styles.filterBlock, styles.buttonsBlock)}
          label="Комнатность"
        >
          <RoomsFilter onClick={onClickRoom} rooms={rooms} />
        </FilterBlock>
        <FilterBlock className={styles.filterBlock} label="Стоимость, ₽">
          <div className={styles.inputs}>
            <SearchInput name="min_price" placeholder="От" type="number" />
            <SearchInput name="max_price" placeholder="До" type="number" />
          </div>
        </FilterBlock>
        <FilterBlock className={styles.filterBlock} label="Площадь, м2">
          <div className={styles.inputs}>
            <SearchInput name="square_min" placeholder="От" type="number" />
            <SearchInput name="square_max" placeholder="До" type="number" />
          </div>
        </FilterBlock>
        <div className={styles.buttonMore}>
          <Button onClick={() => setIsOpen(true)}>Расширенный поиск</Button>
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <FilterFormMemo
          className={styles.filterForm}
          onSubmit={() => setIsOpen(false)}
        />
      </Modal>
    </div>
  );
};

Filter.propTypes = {
  className: PropTypes.string,
};

Filter.defaultProps = {
  className: "",
};

export const FilterMemo = memo(Filter);
