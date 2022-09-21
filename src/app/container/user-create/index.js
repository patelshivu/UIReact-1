/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { ApiClient, ApiUser } from "../../api";
import {
  CommonButton,
  CommonDropDown,
  CommonSpinner,
  CommonTextInput,
  CommonAlertMessage,
  CommonDialCodeSelector,
} from "../../components/common";
import InputFieldList from "./input-field.json";
import { RoutePath } from "../../routes/route-path";
import { apiCallForGetClientList } from "../../store/reducer/client-list/client-list";
import { Modal, Row, Col } from "react-bootstrap";
import copy from "copy-to-clipboard";
import { useSearchParams } from "react-router-dom";

export default function UserCreation() {
  const [inputFieldInfo, setInputFieldInfo] = useState(InputFieldList);
  const [alertMessage, setAlertMessage] = useState("");
  const [isSuccessAlert, setIsSuccessAlert] = useState(true);
  const [isLoadingAdd, setIsLoadingAdd] = useState(false);
  const [isInputError, setIsInputError] = useState(false);
  const [listEntity, setListEntity] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [txtPassword, setTxtPassword] = useState("");
  const [txtEmail, setTxtEmail] = useState("");
  const [isCopy, setIsCopy] = useState(false);
  const [selectedContactNo, setSelectedContactNo] = useState("+91");

  //useState
  const { loginInfo } = useSelector((state) => state.rLogin);
  const { listClient } = useSelector((state) => state.rClientList);

  // search
  const [searchParams] = useSearchParams();

  // List of Type
  const listOfType = [
    {
      id: 1,
      name: "SuperAdmin",
    },
    {
      id: 2,
      name: "ClientAdmin",
    },
    {
      id: 3,
      name: "Customer",
    },
  ];

  //dispatch
  const dispatch = useDispatch();

  //navigation
  const navigation = useNavigate();

  useEffect(() => {
    if (loginInfo && loginInfo.user.type === "ClientAdmin") {
      navigation(RoutePath.dashboard);
      return;
    }

    apiCallGetClientDetails(searchParams.get("clientid"));
    InputFieldList.map((item, index) => {
      if (item.key === "clientId") {
        onChangeTextInput(item, index);
      }
    });
  }, []);

  useEffect(() => {
    dispatch(apiCallForGetClientList());
  }, []);

  const renderInputField = () => {
    return inputFieldInfo.map((item, index) => (
      <div key={index} className="div-input-create-client">
        <label className="lbl-create-title">{item.label}</label>
        {item.key === "phoneNumber" && (
          <CommonDialCodeSelector
            selectedDialCode={selectedContactNo}
            onChangeDialCode={(e) => setSelectedContactNo(e)}
          />
        )}
        {item.type && item.type === "dropdown" ? (
          <CommonDropDown
            listItem={
              item.key === "type"
                ? listOfType
                : item.key === "clientId"
                ? getSelectedClientList()
                : listEntity
            }
            kItemName="name"
            kItemId="id"
            placeholder="--Select--"
            selectedItem={
              item.key === "clientId" ? getSelectedClientList()[0] : item.value
            }
            onSelectItem={(e) => {
              onChangeTextInput(e !== "--Select--" ? e : "--Select--", index);
              if (item.key === "clientId" && e !== "--Select--") {
                apiCallGetClientDetails(e.id);
              }
            }}
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
        {isInputError && item.isRequire && item.value.length <= 0 && (
          <p className="input-error-msg">{`${item.errMsg}`}</p>
        )}
        {item.type === "dropdown" &&
          item.value === "--Select--" &&
          isInputError && <p className="input-error-msg">{`${item.errMsg}`}</p>}
      </div>
    ));
  };

  const getSelectedClientList = () => {
    const filterArr = listClient.filter(
      (e) => e.id === searchParams.get("clientid")
    );
    return filterArr;
  };

  const apiCallGetClientDetails = (clientId) => {
    setIsLoading(true);
    ApiClient()
      .apiCallForGetClientDetails(clientId, loginInfo.token.idToken)
      .then((res) => {
        setIsLoading(false);
        if (
          res.client &&
          res.client.entities &&
          Array.isArray(res.client.entities)
        ) {
          setListEntity(res.client.entities);
        }
      })
      .catch((err) => {
        setIsLoading(false);
      });
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
          if (item.key === "phoneNumber") {
            dictRequBody[item.key] = `${selectedContactNo}${item.value}`;
          } else {
            dictRequBody[item.key] = item.value;
          }
        }
        if (
          (item.isRequire && item.value.length <= 0) ||
          item.value === "--Select--"
        ) {
          isValideInput = false;
        }
      });
      dictRequBody.clientId = searchParams.get("clientid");
      if (!isValideInput) {
        setIsInputError(true);
        return;
      }
      setIsInputError(false);
      setIsLoadingAdd(true);
      ApiUser()
        .apiCallForAddNewUser(dictRequBody, loginInfo.token.idToken)
        .then((res) => {
          setInputFieldInfo(InputFieldList);
          setIsLoadingAdd(false);
          setIsSuccessAlert(true);
          setAlertMessage("User Created Successfully");
          setTxtPassword(res.password);
          setTxtEmail(res.user.email);
          setIsShowModal(true);
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

  const renderModalSuccessClient = () => {
    if (isShowModal) {
      return (
        <Modal
          show={isShowModal}
          onHide={() => {
            navigation(RoutePath.dashboard);
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Success</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            User Created Successfully!
            <div>
              <label>
                Email: <strong>{txtEmail}</strong>
              </label>
              <p>
                Password: <strong>{txtPassword}</strong>
              </p>
            </div>
            <button
              onClick={() => {
                setIsCopy(true);
                copy(txtPassword);
                setTimeout(() => {
                  setIsCopy(false);
                }, 3000);
              }}
              className={
                isCopy
                  ? "copy-password-btn copy-password-btn-active"
                  : "copy-password-btn"
              }
            >
              Click here to Copy Password
            </button>
          </Modal.Body>
          <Modal.Footer>
            <CommonButton
              onClickedButton={() =>
                navigation(
                  `${RoutePath.userManagement}?clientid=${searchParams.get(
                    "clientid"
                  )}`
                )
              }
              title="Continue"
              styles="btn-create-submit"
            />
          </Modal.Footer>
        </Modal>
      );
    }
  };

  return (
    <div className="div-dashboard">
      <h4 className="headingAll mt-4 mb-0">User Creation</h4>
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
        {/* {isLoading && (
          <CommonSpinner styles="btn-spinner" isLoading={isLoading} />
        )} */}
      </div>
      {renderModalSuccessClient()}
    </div>
  );
}
