import React from "react";
import { useSelector } from "react-redux";
import EntryLanding from "../entity-landing";
import SuperAdminDashboard from "../super-admin";

function Dashboard() {
  const { loginInfo } = useSelector((state) => state.rLogin);

  const renderDashboardbaseOnUserType = () => {
    if (loginInfo && loginInfo.user.type === "SuperAdmin") {
      return <SuperAdminDashboard />;
    } else if (loginInfo && loginInfo.user.type === "ClientAdmin") {
      return <EntryLanding />;
    }
    return <h1>Working on Customer Type</h1>;
  };

  return <div className="div-dashboard">{renderDashboardbaseOnUserType()}</div>;
}

export default Dashboard;
