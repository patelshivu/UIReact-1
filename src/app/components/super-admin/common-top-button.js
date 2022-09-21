import React from "react";
import { RoutePath } from "../../routes/route-path";
import { CommonButton } from "../common";

export default function TopButtonSuperAdmin(_props) {
  const btnClicked = (routeName) => {
    _props.navigate(routeName);
  };

  return (
    <div className="div-top-btn">
      <CommonButton
        styles="btn-super-top"
        title="Client"
        onClickedButton={() => btnClicked(RoutePath.dashboard)}
      />
      <CommonButton
        styles="btn-super-top"
        title="User"
        onClickedButton={() => btnClicked(RoutePath.userManagement)}
      />
      <CommonButton styles="btn-super-top" title="Help" />
    </div>
  );
}
