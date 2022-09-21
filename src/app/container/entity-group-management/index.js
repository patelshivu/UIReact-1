import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { CommonButton } from "../../components/common";
import EntityGroupListTable from "../../components/entity-landing/entity-group-table";
import { RoutePath } from "../../routes/route-path";
import { apiCallForGetEntityGroupList } from "../../store/reducer/entity-landing/entity-group-list";
import { Row, Col, Modal } from "react-bootstrap";
import { EntityHeaderButtoh } from "../entity-landing/entity-header-btn";

export default function EntityGroupManagement() {
  const navigation = useNavigate();

  //useState
  const { listEntityGroup, isLoading } = useSelector(
    (state) => state.rEntityGroupList
  );
  const { loginInfo } = useSelector((state) => state.rLogin);
  //dispatch
  const dispatch = useDispatch();

  useEffect(() => {
    if (loginInfo && loginInfo.user.type === "SuperAdmin") {
      navigation(RoutePath.dashboard);
      return;
    }
    dispatch(apiCallForGetEntityGroupList());
  }, []);

  // const renderUpdateDeleteBtn = () => {
  //   return (
  //     <div>
  //       <CommonButton
  //         styles="btn-create-client"
  //         title="Update"
  //         // onClickedButton={() => navigation(RoutePath.entityGroupCreation)}
  //       />
  //       <CommonButton
  //         styles="btn-create-client"
  //         title="Delete"
  //         // onClickedButton={() => navigation(RoutePath.entityGroupCreation)}
  //       />
  //     </div>
  //   );
  // };

  const renderHeaderButton = () => {
    return (
      <div className="div-header-entity">
        {EntityHeaderButtoh.map((item, index) => (
          <CommonButton
            key={index}
            title={item.name}
            styles="btn-header-entity"
            onClickedButton={() => {
              if (item.routeName.length > 0) {
                navigation(item.routeName);
              }
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="div-dashboard">
      {renderHeaderButton()}
      <div className="div-top-btn mb-2 mt-2">
        <Row>
          <Col xl={4} lg={4}>
            <h4 className="headingAll mt-2 mb-0">Entity Group Management</h4>
          </Col>
          <Col xl={8} lg={8} className="text-right">
            <CommonButton
              styles="btn-create-client"
              title="Group Creation"
              onClickedButton={() => navigation(RoutePath.entityGroupCreation)}
            />
          </Col>
        </Row>
      </div>

      <EntityGroupListTable listEntity={listEntityGroup} />
      {/* {renderUpdateDeleteBtn()} */}
    </div>
  );
}
