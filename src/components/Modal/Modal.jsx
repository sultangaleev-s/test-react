import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Button } from "@components/Button/Button";
import styles from "./Modal.module.scss";

export const Modal = ({ children, className, isOpen, onClose }) => {
  const contentRef = useRef();

  useEffect(() => {
    const handlerClose = (e) => {
      e.stopPropagation();
      if (onClose && e.target.classList.contains(styles.content)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("click", handlerClose);
      document.body.classList.add("scroll-block");
    }
    return () => {
      document.removeEventListener("click", handlerClose);
      document.body.classList.remove("scroll-block");
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div ref={contentRef} className={styles.modal}>
      <div className={classNames(styles.content, className)}>
        <Button theme="close" className={styles.close} onClick={onClose} />
        {children}
      </div>
    </div>
  );
};

Modal.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};
Modal.defaultProps = {
  children: null,
  className: "",
  isOpen: false,
  onClose: null,
};
