import React, { useEffect } from "react";
import { Alert } from "react-bootstrap";
import "./alert.style.scss";

export default function AlertMessage(props) {
  const { isSuccess, message, onHideAlert, styles } = props;

  /**
   * hide alert after 5 sec
   * pass hide alert props for clear message
   */
  useEffect(() => {
    if (message.length > 0) {
      setTimeout(() => {
        onHideAlert();
      }, 4000);
    }
  }, [message, onHideAlert]);

  /**
   * get alert varient like success or error
   * @returns
   */
  const getAlertVariant = () => {
    if (isSuccess) {
      return "success";
    } else {
      return "danger";
    }
  };

  const customStyle = () => {
    if (styles && styles.length > 0) {
      return `alert-message ${styles}`;
    }
    return `alert-message`;
  };

  return (
    <Alert
      key={getAlertVariant()}
      variant={getAlertVariant()}
      show={message.length > 0 ? true : false}
      className={customStyle()}
      transition={false}
    >
      {`${message}`}
    </Alert>
  );
}
