import React from "react";
import { ClipLoader } from "react-spinners";

export default function CommonSpinner(props) {
  const { isLoading, styles } = props;

  const customStyles = () => {
    if (styles && styles.length > 0) {
      return `${styles}`;
    }
    return "";
  };

  return (
    <div className={customStyles()}>
      <ClipLoader size={30} color="#2e8de6" loading={isLoading} />
    </div>
  );
}
