import React, { useEffect } from "react";
import * as Material from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RoutePath } from "../../routes/route-path";
import { actionLogout } from "../../store/reducer/login-reducer";
import {
  actionChangeTheme,
  actionInitThemeData,
} from "../../store/reducer/theme-reducer";
import DefaultImage from "../../assets/images/img123.png";

export default function Header(props) {
  const { isLogin, loginInfo } = useSelector((state) => state.rLogin);
  const { themeName } = useSelector((state) => state.rTheme);

  const navigation = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    initThemeData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initThemeData = () => {
    dispatch(actionInitThemeData());
  };

  function btnLogoutClicked() {
    dispatch(actionLogout());
    window.location.reload();
  }

  return (
    <>
      {isLogin && (
        <div className="div-header">
          <div className="headerLeftMenu">
            {/* <h2>LOGO</h2> */}
            <img
                  className="userImgHeader"
                  alt="user-img"
                  src={DefaultImage}
                />
            <Link aria-label="home" to={RoutePath.dashboard}>
              Dashboard
            </Link>
            <Link aria-label="live-monitor" to={RoutePath.liveMonitory}>
              Live Monitory
            </Link>
            {loginInfo && loginInfo.user.type === "ClientAdmin" && (
              <Link aria-label="entity-landing" to={RoutePath.entryLanding}>
                Entity
              </Link>
            )}
          </div>
          <div className="headerRightMenu">
            {themeName !== "theme-light" ? (
              <Material.MdWbSunny
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(actionChangeTheme());
                }}
                size={30}
                color="#fff"
                className="icon-cursor"
                style={{ marginTop: "10px", marginRight: "10px" }}
              />
            ) : (
              <Material.MdOutlineModeNight
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(actionChangeTheme());
                }}
                size={25}
                color="#fff"
                className="icon-cursor"
                style={{ marginTop: "10px", marginRight: "10px" }}
              />
            )}

            <div className="dropDownProfile">
              <Link aria-label="home" to={RoutePath.profile}>
                {/* <Material.MdPerson
                className="icon-cursor"
                size={30}
                color="#fff"
              /> */}
                <img
                  className="userImgHeader"
                  src="https://th.bing.com/th/id/OIP.6FiKpFLb6F7L0uCVTPwOnAHaHa?pid=ImgDet&w=512&h=512&rs=1"
                  alt="user-img"
                />
                <span>{`${loginInfo.user.firstName} ${loginInfo.user.lastName}`}</span>
              </Link>
              <ul>
                <li onClick={() => navigation(RoutePath.profile)}>
                  User Profile
                </li>
                <li onClick={btnLogoutClicked}>Log Out</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
