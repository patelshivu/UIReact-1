import React from "react";
import "./button.style.scss";

export default function CommonButton(props) {
  const { title, onClickedButton, styles } = props;

  /**
   * add custom style if get styles from props
   * @returns
   */
  const customStyles = () => {
    if (styles && styles.length > 0) {
      return `btn-style ${styles}`;
    }
    return `btn-style`;
  };

  /**
   * main
   */
  return (
    <button className={customStyles()} onClick={onClickedButton}>
      {`${title}`}
    </button>
  );
}
