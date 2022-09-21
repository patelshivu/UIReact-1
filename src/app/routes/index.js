/**
 * main root route class
 * in this class import Route Screen class
 */

import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "../components/header";

import RouteScreen from "./route-screen";

/**
 * main root route
 * @returns
 */
const RootRouter = () => {
  return (
    <Router>
      <Header />
      <RouteScreen />
    </Router>
  );
};

export default RootRouter;
