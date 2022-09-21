import React, { lazy, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { CommonButton, CommonSpinner } from "../../components/common";
import { RoutePath } from "../../routes/route-path";
import { apiCallForGetEntityList } from "../../store/reducer/entity-landing/enityt-list";
import { EntityHeaderButtoh } from "./entity-header-btn.js";
import { Row, Col, Modal } from "react-bootstrap";

/**
 * components
 * @returns
 */
const EntityListTable = lazy(() =>
  import("../../components/entity-landing/entity-table")
);

function EntryLanding() {
  const navigation = useNavigate();

  //dispatch
  const dispatch = useDispatch();

  //useState
  const { listEntity, isLoading } = useSelector((state) => state.rEntityList);

  useEffect(() => {
    dispatch(apiCallForGetEntityList());
  }, []);

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
      
      {/* {renderLocationDropdown()} */}
      <div className="div-top-btn mb-2">
        <Row>
          <Col xl={4} lg={4}><h2 className="headingAll mt-2 mb-0">Entity Management</h2></Col>
          <Col xl={8} lg={8} className="text-right">
          <CommonButton
          onClickedButton={() => navigation(RoutePath.entityCreation)}
          styles="btn-create-client"
          title="Create New Entity"
        />
          </Col>
        </Row>
        
        {/* update and delete btn */}

        {/* <CommonButton styles="btn-create-client" title="Update" /> */}
        {/* <CommonButton styles="btn-create-client" title="Delete" /> */}
      </div>
      <EntityListTable listEntity={listEntity} />
      {isLoading && (
        <CommonSpinner styles="client-loader" isLoading={isLoading} />
      )}
    </div>
  );
}

export default EntryLanding;
