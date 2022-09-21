import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionLogout } from "../../store/reducer/login-reducer";

function Profile() {
  const { loginInfo, isLogin } = useSelector((state) => state.rLogin);
  const dispatch = useDispatch();

  function btnLogoutClicked() {
    dispatch(actionLogout());
    window.location.reload();
  }

  const renderLoginInfo = () => {
    if (isLogin) {
      return (
        <div className="userImageBox">
          <img
            className="userImgProfile"
            src="https://th.bing.com/th/id/OIP.6FiKpFLb6F7L0uCVTPwOnAHaHa?pid=ImgDet&w=512&h=512&rs=1"
          />
          <p>{`${loginInfo.user.firstName} ${loginInfo.user.lastName}`}</p>
          <p>{`${loginInfo.user.email}`}</p>
          <p>{`${loginInfo.user.type}`}</p>
          <button className="btn-create-client" onClick={btnLogoutClicked}>
            Logout
          </button>
        </div>
      );
    }
  };

  return (
    <div className="div-profile">
      <div className="profilebox">
        <h1>Profile</h1>
        {renderLoginInfo()}
      </div>
    </div>
  );
}

export default Profile;
