import { validateCaptcha } from "react-simple-captcha";

/**
 * check input field validation
 * @param {*} txtEmail
 * @param {*} txtPassword
 * @returns
 */
const checkFieldValidation = (txtEmail, txtPassword, txtCaptcha) => {
  let strMessage = "";
  if (txtEmail.replace(/ /g, "").length <= 0) {
    strMessage = "Please enter email";
  } else if (txtPassword.replace(/ /g, "").length <= 0) {
    strMessage = "Please enter password";
  } else if (validateCaptcha(txtCaptcha) !== true) {
    strMessage = "Captcha Does Not Match";
  }
  return strMessage;
};

export { checkFieldValidation };
