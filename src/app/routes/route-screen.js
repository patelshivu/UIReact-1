import React from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { RouteList } from "./route-list";
import { RoutePath } from "./route-path";

/**
 * Main route screen
 * @returns
 * create route screen from route list array
 */

export default function RouteScreen() {
  const { isLogin } = useSelector((state) => state.rLogin);
  const location = useLocation();

  function screenLoad() {
    return RouteList.map((item) => {
      if (item.path === "/") {
        return (
          <Route
            path={item.path}
            element={<item.component />}
            exact
            key={item.path}
          />
        );
      } else {
        return (
          <Route
            path={item.path}
            element={protectScreen(item)}
            key={item.path}
          />
        );
      }
    });
  }

  function protectScreen(item) {
    if (item.isAuth === false) {
      if (isLogin) {
        if (String(location.search).length > 0) {
          try {
            return (
              <Navigate
                replace
                to={decodeURIComponent(location.search).split("=")[1]}
              />
            );
          } catch (err) {
            return <Navigate replace to={RoutePath.dashboard} />;
          }
        } else {
          return <Navigate replace to={RoutePath.dashboard} />;
        }
      }
      return <item.component />;
    } else if (item.isAuth === null) {
      return <item.component />;
    } else if (item.isAuth === true) {
      if (isLogin) {
        return <item.component />;
      } else {
        return (
          <Navigate
            replace
            to={
              RoutePath.login +
              "?refer=" +
              encodeURIComponent(location.pathname)
            }
          />
        );
      }
    }
  }

  return <Routes>{screenLoad()}</Routes>;
}
