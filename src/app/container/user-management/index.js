/* eslint-disable react-hooks/exhaustive-deps */
import React, { lazy, useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import { ApiClient, ApiUser } from "../../api";
import { CommonButton, CommonDropDown } from "../../components/common";
import TopButtonSuperAdmin from "../../components/super-admin/common-top-button";
import { RoutePath } from "../../routes/route-path";
import { UserManagementPresenter } from "./user-mng-presenter";

const ExistingAdminDetails = lazy(() =>
  import("../../components/user-management/existing-admin-details")
);

export default function UserManagement() {
  //state declaration
  const [selectedClient, setSelectedClient] = useState("--Select--");
  const [listClients, setListClients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [listUser, setListUser] = useState([]);

  //navigation
  const navigate = useNavigate();

  //use selector
  const { loginInfo } = useSelector((state) => state.rLogin);

  // search
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (loginInfo && loginInfo.user.type === "ClientAdmin") {
      navigate(RoutePath.dashboard);
      return;
    }
    apiCallForGetClientList();
  }, []);

  useEffect(() => {
    if (
      Object.keys(selectedClient).length > 0 &&
      selectedClient !== "--Select--"
    ) {
      apiCallForGetUserListByClientId();
    }
  }, [selectedClient]);

  /**
   * Get user list base on client id
   */
  const apiCallForGetUserListByClientId = () => {
    setIsLoading(true);

    ApiUser()
      .apiCallForGetUserList(
        `?clientid=${selectedClient.id}`,
        loginInfo.token.idToken
      )
      .then((response) => {
        setIsLoading(false);
        setListUser(response);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  /**
   * get client list
   */
  const apiCallForGetClientList = () => {
    ApiClient()
      .apiCallForGetClientList(loginInfo.token.idToken)
      .then((res) => {
        setIsLoading(false);
        if (res.length > 0) {
          if (searchParams.get("clientid") !== null) {
            let filterArr = res.filter(
              (e) => e.id === searchParams.get("clientid")
            );
            if (filterArr.length > 0) {
              setSelectedClient(filterArr[0]);
            } else {
              setSelectedClient(res[0]);
            }
          } else {
            setSelectedClient(res[0]);
          }
          const listData = UserManagementPresenter().listOfClientDropdown(res);
          setListClients((preview) => (preview = listData));
        }
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  const renderTopButton = () => {
    return <TopButtonSuperAdmin navigate={navigate} />;
  };

  /**
   * client list show in dropdown
   * @returns
   */
  const renderClientDropdown = () => {
    if (listClients.length > 0) {
      return (
        <CommonDropDown
          listItem={listClients}
          kItemName="name"
          kItemId="id"
          placeholder="--Select--"
          selectedItem={selectedClient}
          onSelectItem={(e) => {
            setSelectedClient(e);
          }}
        />
      );
    }
  };

  /**
   * main
   */
  return (
    <div className="div-dashboard">
      <div className="bradcramHeading">
        <Row>
          <Col lg={4}>
            <h2 className="headingAll mt-2 mb-0">Existing User Details</h2>
          </Col>
          <Col lg={8} className="text-right">
            {renderTopButton()}
          </Col>
        </Row>
      </div>

      <Row className=" mb-3">
        <Col xl={6} lg={6} md={6}>
          <div className="selectClient">
            <label className="mt-0">select Client Name</label>
            {renderClientDropdown()}
          </div>
        </Col>
        <Col xl={6} lg={6} md={6} className="text-end">
          {/* <CommonButton styles="btn-create-client" title="Reset Password" /> */}
          {/* <CommonButton styles="btn-create-client" title="Delete" /> */}
          <CommonButton
            onClickedButton={() =>
              navigate(`${RoutePath.userCreate}?clientid=${selectedClient.id}`)
            }
            styles="btn-create-client"
            title="Create New User"
          />
        </Col>
      </Row>
      <ExistingAdminDetails listUser={listUser} isLoading={isLoading} />
    </div>
  );
}
