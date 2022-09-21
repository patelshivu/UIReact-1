import React, { useEffect, useRef, useState } from "react";
import { CommonButton } from "../../components/common";
import ExistingUserDetails from "../../components/super-admin/existing-user-details";
import { useNavigate } from "react-router-dom";
import { RoutePath } from "../../routes/route-path";
import TopButtonSuperAdmin from "../../components/super-admin/common-top-button";
import { ApiClient } from "../../api";
import { useSelector } from "react-redux";
import {Row, Col,} from "react-bootstrap";

export default function SuperAdminDashboard() {
  // navigate
  const navigate = useNavigate();

  //use selector
  const { loginInfo } = useSelector((state) => state.rLogin);

  // state
  const [listClients, setListClients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const isInitCall = useRef(true);

  useEffect(() => {
    if (isInitCall.current) {
      isInitCall.current = false;
      apiCallGetClientList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * api call for fetch client list
   */
  const apiCallGetClientList = () => {
    setIsLoading(true);
    ApiClient()
      .apiCallForGetClientList(loginInfo.token.idToken)
      .then((res) => {
        setIsLoading(false);
        setListClients((preview) => (preview = res));
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  /**
   * client list table
   * @returns
   */
  const renderExistingUserTable = () => {
    return (
      <ExistingUserDetails listClients={listClients} isLoading={isLoading} />
    );
  };

  /**
   * client, user and help button
   * @returns
   */
  const renderTopButton = () => {
    return <TopButtonSuperAdmin navigate={navigate} />;
  };

  /**
   * main
   */
  return (
    <div>
    <div className="bradcramHeading">
      <Row>
        <Col lg={4}><h2 className="headingAll mt-2 mb-0">Super Admin Dashboard</h2></Col>
        <Col lg={8} className="text-right">{renderTopButton()}</Col>
      </Row>
    </div>
    <div className="">
      <Row>
        <Col lg={4}><h2 className="headingAll mt-2 mb-0">Existing Client Details</h2></Col>
        <Col lg={8} className="text-right">
              <CommonButton
                onClickedButton={() => navigate(RoutePath.createClientAdmin)}
                styles="btn-create-client"
                title="Create New Client" 
              />
          </Col>
      </Row>
    </div>
      <h4 className="heading-lg"></h4>
      {/* create new client btn */}
      <div className="div-top-btn">
        
        {/* update and delete btn */}

        {/* <CommonButton styles="btn-create-client" title="Update" /> */}
        {/* <CommonButton styles="btn-create-client" title="Delete" /> */}
      </div>
      {/* table */}
      {renderExistingUserTable()}
    </div>
  );
}
