import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { ApiEntity } from "../../api";
import {
  CommonButton,
  CommonDropDown,
  CommonSpinner,
  CommonTextInput,
  CommonAlertMessage,
} from "../../components/common";
import InputFieldList from "./input-field.json";
import { RoutePath } from "../../routes/route-path";
import { apiCallForGetEntityGroupList } from "../../store/reducer/entity-landing/entity-group-list";
import { Row, Col, Modal } from "react-bootstrap";

export default function EntityCreation() {
  const [inputFieldInfo, setInputFieldInfo] = useState(InputFieldList);
  const [alertMessage, setAlertMessage] = useState("");
  const [isSuccessAlert, setIsSuccessAlert] = useState(true);
  const [isLoadingAdd, setIsLoadingAdd] = useState(false);
  const [isInputError, setIsInputError] = useState(false);
  //useState
  const { listEntityGroup, isLoading } = useSelector(
    (state) => state.rEntityGroupList
  );
  const { loginInfo } = useSelector((state) => state.rLogin);

  //dispatch
  const dispatch = useDispatch();

  //navigation
  const navigation = useNavigate();

  useEffect(() => {
    if (loginInfo && loginInfo.user.type === "SuperAdmin") {
      navigation(RoutePath.dashboard);
      return;
    }
    dispatch(apiCallForGetEntityGroupList());
  }, []);

  const renderInputField = () => {
    if (!isLoading) {
      return inputFieldInfo.map((item, index) => (
        <div key={index} className="div-input-create-client">
          <label className="lbl-create-title">{item.label}</label>
          {item.type && item.type === "dropdown" ? (
            <CommonDropDown
              listItem={listEntityGroup}
              kItemName="name"
              kItemId="id"
              placeholder="--Select--"
              selectedItem={item.value}
              onSelectItem={(e) =>
                onChangeTextInput(e !== "--Select--" ? e : "--Select--", index)
              }
            />
          ) : item.type && item.type === "switch" ? (
            <div className="inputBox">
              <input
                type="checkbox"
                onChange={(e) => onChangeTextInput(!item.value, index)}
              />
              <label>Allow</label>
            </div>
          ) : (
            <CommonTextInput
              placeholdertext={item.lable}
              value={item.value}
              changetextinput={(e) => onChangeTextInput(e, index)}
              id={item.key}
            />
          )}
          {(isInputError && item.isRequire && item.value.length <= 0) ||
            (item.type === "dropdown" &&
              item.value === "--Select--" &&
              isInputError && (
                <p className="input-error-msg">{`${item.errMsg}`}</p>
              ))}
        </div>
      ));
    }
  };

  const onChangeTextInput = (value, index) => {
    let arrInput = [...inputFieldInfo];
    let info = arrInput[index];
    info.value = value;
    setInputFieldInfo(arrInput);
  };

  const btnSubmitClicked = () => {
    if (!isLoadingAdd) {
      let dictRequBody = {};
      let isValideInput = true;
      inputFieldInfo.forEach((item) => {
        if (item.type === "dropdown") {
          dictRequBody[item.key] =
            item.value !== "--Select--" ? item.value.id : "";
        } else {
          dictRequBody[item.key] = item.value;
        }
        if (
          (item.isRequire && item.value.length <= 0) ||
          item.value === "--Select--"
        ) {
          isValideInput = false;
        }
      });
      if (!isValideInput) {
        setIsInputError(true);
        return;
      }
      setIsInputError(false);
      setIsLoadingAdd(true);
      ApiEntity()
        .apiCallForAddNewEntity(dictRequBody, loginInfo.token.idToken)
        .then((res) => {
          setInputFieldInfo(InputFieldList);
          setIsLoadingAdd(false);
          setIsSuccessAlert(true);
          setAlertMessage("Entity Created Successfully");
          setTimeout(() => {
            if (loginInfo && loginInfo.user.type === "SuperAdmin") {
              navigation(RoutePath.entryLanding);
            } else {
              navigation(RoutePath.dashboard);
            }
          }, 4000);
        })
        .catch((err) => {
          setIsLoadingAdd(false);
          setIsSuccessAlert(false);
          setAlertMessage(err);
        });
    }
  };

  const renderAlertMessage = () => {
    return (
      <CommonAlertMessage
        isSuccess={isSuccessAlert}
        message={alertMessage}
        onHideAlert={() => setAlertMessage("")}
        styles="login-alert-box"
      />
    );
  };

  return (
    <div className="div-dashboard">
      <h4 className="headingAll mt-2 mb-0">Entity Creation</h4>
      <div className="div-create-client-inner">
        <Row>
          <Col xxl={6} lg={6} sm={12} className="my-2">
            <div className="formOne">
              {renderInputField()}
              {renderAlertMessage()}
            </div>
          </Col>
        </Row>
        {!isLoadingAdd && (
          <CommonButton
            onClickedButton={btnSubmitClicked}
            title="Submit"
            styles="btn-create-submit"
          />
        )}
        {isLoadingAdd && (
          <CommonSpinner styles="btn-spinner" isLoading={isLoadingAdd} />
        )}
      </div>
    </div>
  );
}
