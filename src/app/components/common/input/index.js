import React from "react";
import "./input.style.scss";

/**
 * common text input
 * pass below param
 * 1. value
 * 2. changetextinput
 * 3. txtId
 * 4. placeholdertext
 * 5. isPassword
 * 6. styles
 * 7. numberCharacter
 * @param {*} props
 * @returns
 */
export default function CommonTextInput(props) {
  const {
    value,
    txtid,
    placeholdertext,
    isPassword,
    changetextinput,
    styles,
    numberCharacter,
  } = props;

  /**
   * add custom style if get style from props
   * @returns
   */
  const customStyles = () => {
    if (styles && styles.length > 0) {
      return `txt-input ${styles}`;
    }
    return `txt-input`;
  };

  /**
   * main
   */
  return (
    <input
      className={customStyles()}
      placeholder={placeholdertext}
      value={value}
      onChange={(e) => {
        e.preventDefault();
        changetextinput(e.target.value);
      }}
      id={txtid}
      type={isPassword === true ? "password" : "text"}
      maxLength={numberCharacter !== undefined ? numberCharacter : 40}
    />
  );
}
