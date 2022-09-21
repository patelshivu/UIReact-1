import React from "react";
import ListDialCode from "../../../constants/dial-code.json";

export default function CommonDialCodeSelector(props) {
  const { selectedDialCode, onChangeDialCode } = props;
  const renderOptionList = () => {
    return ListDialCode.map((item, index) => (
      <option
        key={index}
        value={item.dial_code}
      >{`${item.name} ${item.dial_code}`}</option>
    ));
  };

  return (
    <div className="countryCode">
      <select
        onChange={(e) => onChangeDialCode(e.target.value)}
        value={selectedDialCode}
        name="dialCode"
        id="dialCode"
      >
        {renderOptionList()}
      </select>
    </div>
  );
}
