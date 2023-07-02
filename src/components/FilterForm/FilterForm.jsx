import React, { memo, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./FilterForm.module.scss";
import { FilterBlock } from "../FilterBlock/FilterBlock";
import { Title } from "../Title/Title";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import { useSearchParams } from "react-router-dom";
import { RoomsFilter } from "../RoomsFilter/RoomsFilter";

const filtersList = [
  {
    id: 0,
    label: "Стоимость, ₽",
    firstInputProps: { name: "min_price", placeholder: "От", type: "number" },
    secondInputProps: { name: "max_price", placeholder: "До", type: "number" },
  },
  {
    id: 1,
    label: "Этаж",
    firstInputProps: { name: "floor_min", placeholder: "От", type: "number" },
    secondInputProps: { name: "floor_max", placeholder: "До", type: "number" },
  },
];

const filtersSquareList = [
  {
    id: 0,
    label: "Общая площадь, м2",
    firstInputProps: { name: "square_min", placeholder: "От", type: "number" },
    secondInputProps: { name: "square_max", placeholder: "До", type: "number" },
  },
  {
    id: 1,
    label: "Жилая площадь, м2",
    firstInputProps: {
      name: "square_live_min",
      placeholder: "От",
      type: "number",
    },
    secondInputProps: {
      name: "square_live_max",
      placeholder: "До",
      type: "number",
    },
  },
  {
    id: 2,
    label: "Кухонная площадь, м2",
    firstInputProps: {
      name: "square_kitchen_min",
      placeholder: "От",
      type: "number",
    },
    secondInputProps: {
      name: "square_kitchen_max",
      placeholder: "До",
      type: "number",
    },
  },
];

const initialState = {
  min_price: "",
  max_price: "",
  square_min: "",
  square_max: "",
  square_live_min: "",
  square_live: "",
  square_kitchen_min: "",
  square_kitchen_max: "",
  floor_min: "",
  floor_max: "",
};

export const FilterForm = ({ className, onSubmit }) => {
  const [, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(initialState);
  const [rooms, setRooms] = useState([]);

  const onClickRoom = (val) => {
    const newRooms = rooms.includes(val)
      ? rooms.filter((room) => room !== val)
      : [...rooms, val];
    setRooms(newRooms);
  };

  const onChange = (e) => {
    setSearchValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmitHandler = () => {
    setSearchParams((params) => {
      params.delete("page");
      params.delete("rooms");

      rooms.forEach((room) => {
        params.append("rooms", room);
      });

      Object.entries(searchValue).forEach(([key, value]) => {
        if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      });
      return params;
    });

    onSubmit();
  };

  const onClearHandler = () => {
    setSearchValue(initialState);
  };

  return (
    <div className={classNames(styles.wrapper, className)}>
      <Title isHeader={false}>Общее</Title>
      <div className={styles.filterGroup}>
        {filtersList.map(({ id, label, firstInputProps, secondInputProps }) => (
          <FilterBlock key={id} label={label} className={styles.filterBlock}>
            <div className={styles.inputs}>
              <Input
                onChange={onChange}
                value={searchValue[firstInputProps.name]}
                {...firstInputProps}
              />
              <Input
                onChange={onChange}
                value={searchValue[secondInputProps.name]}
                {...secondInputProps}
              />
            </div>
          </FilterBlock>
        ))}
        <FilterBlock label="Комнатность" className={styles.filterBlock}>
          <RoomsFilter rooms={rooms} onClick={onClickRoom} />
        </FilterBlock>
      </div>
      <Title isHeader={false}>Площадь</Title>
      <div className={styles.filterGroup}>
        {filtersSquareList.map(
          ({ id, label, firstInputProps, secondInputProps }) => (
            <FilterBlock key={id} label={label} className={styles.filterBlock}>
              <div className={styles.inputs}>
                <Input
                  onChange={onChange}
                  value={searchValue[firstInputProps.name]}
                  {...firstInputProps}
                />
                <Input
                  onChange={onChange}
                  value={searchValue[secondInputProps.name]}
                  {...secondInputProps}
                />
              </div>
            </FilterBlock>
          )
        )}
      </div>
      <div className={styles.buttons}>
        <Button theme="white" onClick={onClearHandler}>
          Очистить
        </Button>
        <Button onClick={onSubmitHandler}>Применить</Button>
      </div>
    </div>
  );
};

FilterForm.propTypes = {
  className: PropTypes.string,
  onSubmit: PropTypes.func,
};
FilterForm.defaultProps = {
  className: "",
  onSubmit: () => {},
};

export const FilterFormMemo = memo(FilterForm);
