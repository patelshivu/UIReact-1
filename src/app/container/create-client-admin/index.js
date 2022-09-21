import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ApiClient } from "../../api/client";
import {
  CommonButton,
  CommonDialCodeSelector,
  CommonSpinner,
} from "../../components/common";
import CommonTextInput from "../../components/common/input";
import { inputData, adminEntityInput, adminUserInput } from "./input-data";
import { Row, Col, Modal } from "react-bootstrap";
import { useNavigate } from "react-router";
import { RoutePath } from "../../routes/route-path";
import AlertMessage from "../../components/common/alert-message-box";
import copy from "copy-to-clipboard";
import { validateEmail } from "../../utils";

export default function CreateClientAdmin() {
  const [listInputInfo, setListInputInfo] = useState(inputData);
  const [listInputAdminUser, setListInputAdminUser] = useState(adminUserInput);
  const [listInputAdminEntity, setListInputAdminEntity] =
    useState(adminEntityInput);
  const [isInputError, setIsInputError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [txtPassword, setTxtPassword] = useState("");
  const [txtEmail, setTxtEmail] = useState("");
  const [isCopy, setIsCopy] = useState(false);
  const [selectedPhoneNo, setSelectedPhoneNo] = useState("+91");
  const [selectedContactNo, setSelectedContactNo] = useState("+91");

  //use selector
  const { loginInfo } = useSelector((state) => state.rLogin);
  const [alertMessage, setAlertMessage] = useState("");
  const [isSuccessAlert, setIsSuccessAlert] = useState(false);

  //navigation
  const navigation = useNavigate();

  useEffect(() => {
    if (loginInfo && loginInfo.user.type === "ClientAdmin") {
      navigation(RoutePath.dashboard);
      return;
    }
  }, []);

  const renderInputField = () => {
    return listInputInfo.map((item, index) => (
      <div key={index} className="div-input-create-client">
        <label className="lbl-create-title">{item.lable}</label>
        <CommonTextInput
          placeholdertext={item.lable}
          value={item.value}
          changetextinput={(e) => onChangeTextInput(e, index, 1)}
          id={item.key}
          isPassword={item.key === "password" ? true : false}
        />
        {isInputError && item.isRequire && item.value.length <= 0 && (
          <p className="input-error-msg">{`${item.errMsg}`}</p>
        )}
      </div>
    ));
  };

  const renderAdminUserInputField = () => {
    return listInputAdminUser.map((item, index) => (
      <div key={index} className="div-input-create-client">
        <label className="lbl-create-title">{item.lable}</label>
        {item.key === "phoneNumber" && (
          <CommonDialCodeSelector
            selectedDialCode={selectedPhoneNo}
            onChangeDialCode={(e) => setSelectedPhoneNo(e)}
          />
        )}
        <CommonTextInput
          placeholdertext={item.lable}
          value={item.value}
          changetextinput={(e) => onChangeTextInput(e, index, 2)}
          id={item.key}
          isPassword={item.key === "password" ? true : false}
        />
        {isInputError && item.isRequire && item.value.length <= 0 && (
          <p className="input-error-msg">{`${item.errMsg}`}</p>
        )}
      </div>
    ));
  };

  const renderAdminEntityInputField = () => {
    return listInputAdminEntity.map((item, index) => (
      <div key={index} className="div-input-create-client">
        <label className="lbl-create-title">{item.lable}</label>
        {item.key === "contactNo" && (
          <CommonDialCodeSelector
            selectedDialCode={selectedContactNo}
            onChangeDialCode={(e) => setSelectedContactNo(e)}
          />
        )}
        {item.type && item.type === "switch" ? (
          <div className="inputBox">
            <input
              type="checkbox"
              onChange={(e) => onChangeTextInput(!item.value, index, 3)}
            />
            <label>Allow</label>
          </div>
        ) : (
          <CommonTextInput
            placeholdertext={item.lable}
            value={item.value}
            changetextinput={(e) => onChangeTextInput(e, index, 3)}
            id={item.key}
            isPassword={item.key === "password" ? true : false}
          />
        )}
        {isInputError && item.isRequire && item.value.length <= 0 && (
          <p className="input-error-msg">{`${item.errMsg}`}</p>
        )}
      </div>
    ));
  };

  const onChangeTextInput = (value, index, listType) => {
    let arrInput = [];
    if (listType === 1) {
      arrInput = [...listInputInfo];
    } else if (listType === 2) {
      arrInput = [...listInputAdminUser];
    } else if (listType === 3) {
      arrInput = [...listInputAdminEntity];
    }
    let info = arrInput[index];
    info.value = value;
    if (listType === 1) {
      setListInputInfo(arrInput);
    } else if (listType === 2) {
      setListInputAdminUser(arrInput);
    } else if (listType === 3) {
      setListInputAdminEntity(arrInput);
    }
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
            Client Created Successfully!
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
              onClickedButton={() => navigation(RoutePath.dashboard)}
              title="Continue"
              styles="btn-create-submit"
            />
          </Modal.Footer>
        </Modal>
      );
    }
  };

  const btnSubmitClicked = () => {
    if (!isLoading) {
      let dictRequBody = {};
      let isValideInput = true;
      listInputInfo.forEach((item) => {
        if (item.key === "email") {
          if (!validateEmail(item.value)) {
            setIsSuccessAlert(false);
            setAlertMessage(
              "Please enter correct email in Client Info section"
            );
            return;
          }
        }
        dictRequBody[item.key] = item.value;
        if (item.isRequire && item.value.length <= 0) {
          isValideInput = false;
        }
      });

      let dictAdminUser = {};
      listInputAdminUser.forEach((item) => {
        if (item.key === "phoneNumber") {
          dictAdminUser[item.key] = `${selectedPhoneNo}${item.value}`;
        } else {
          if (item.key === "email") {
            if (!validateEmail(item.value)) {
              setIsSuccessAlert(false);
              setAlertMessage(
                "Please enter correct email in Admin Client section"
              );
              return;
            }
          }
          dictAdminUser[item.key] = item.value;
        }

        if (item.isRequire && item.value.length <= 0) {
          isValideInput = false;
        }
      });

      dictRequBody["adminUser"] = dictAdminUser;

      let dictAdminEntity = {};
      listInputAdminEntity.forEach((item) => {
        if (item.key === "contactNo") {
          dictAdminEntity[item.key] = `${selectedContactNo}${item.value}`;
        } else {
          if (item.key === "email") {
            if (!validateEmail(item.value)) {
              setIsSuccessAlert(false);
              setAlertMessage(
                "Please enter correct email in Admin Entity section"
              );
              return;
            }
          }
          dictAdminEntity[item.key] = item.value;
        }

        if (item.isRequire && item.value.length <= 0) {
          isValideInput = false;
        }
      });

      dictRequBody["adminEntity"] = dictAdminEntity;

      if (!isValideInput) {
        setIsInputError(true);
        return;
      }
      setIsInputError(false);
      setIsLoading(true);
      ApiClient()
        .apiCallForAddNewClient(dictRequBody, loginInfo.token.idToken)
        .then((res) => {
          setIsLoading(false);
          setIsSuccessAlert(true);
          setAlertMessage("Client Created Successfully");
          setTxtPassword(res.password);
          setTxtEmail(res.client.email);
          setIsShowModal(true);
        })
        .catch((err) => {
          setIsLoading(false);
          setIsSuccessAlert(false);
          setAlertMessage(err);
        });
    }
  };

  const renderHeaderTitle = (strTitle) => {
    return <h4>{strTitle}</h4>;
  };

  const renderAlertMessage = () => {
    return (
      <AlertMessage
        isSuccess={isSuccessAlert}
        message={alertMessage}
        onHideAlert={() => setAlertMessage("")}
        styles="login-alert-box"
      />
    );
  };

  return (
    <div className="div-dashboard">
      <h2 className="headingAll mt-4 mb-0">Create New Client</h2>
      <div className="div-create-client-inner">
        <Row>
          <Col xxl={6} lg={6} sm={12} className="my-2">
            <div className="formOne">
              {renderHeaderTitle("Client Info")}
              {renderInputField()}
            </div>
          </Col>
          <Col xxl={6} lg={6} sm={12} className="my-2">
            <div className="formOne">
              {renderHeaderTitle("Admin Client Info")}
              {renderAdminUserInputField()}
            </div>
          </Col>
          <Col xxl={12} lg={12} sm={12} className="my-2">
            <div className="formOne">
              {renderHeaderTitle("Admin Entity Info")}
              {renderAdminEntityInputField()}
            </div>
          </Col>
        </Row>
        {renderAlertMessage()}
        {!isLoading && (
          <CommonButton
            onClickedButton={btnSubmitClicked}
            title="Submit"
            styles="btn-create-submit"
          />
        )}
        {isLoading && (
          <CommonSpinner styles="btn-spinner" isLoading={isLoading} />
        )}
      </div>
      {renderModalSuccessClient()}
    </div>
  );
}
