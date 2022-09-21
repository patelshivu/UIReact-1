import { GetApiRequest, PostApiRequest } from "../../helper/rest-api";
import { endpoints } from "../../helper/rest-api/url-schema";

const ApiUser = () => {
  /**
   * user list
   * @param {*} accessToken
   * @returns
   */
  const apiCallForGetUserList = (strQuery, accessToken) => {
    return new Promise((resolve, reject) => {
      let strUrl = endpoints.user;
      if (strQuery.length > 0) {
        strUrl = strUrl + strQuery;
      }
      GetApiRequest(strUrl, "", accessToken)
        .then((res) => {
          let arrClients = [];
          if (res.users && Array.isArray(res.users)) {
            arrClients = res.users;
          }
          resolve(arrClients);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  /**
   * add new user
   * @param {*} reqBody
   * @param {*} accessToken
   * @returns
   */
  const apiCallForAddNewUser = (reqBody, accessToken) => {
    return new Promise((resolve, reject) => {
      PostApiRequest(endpoints.user, reqBody, accessToken)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  /**
   *  get user details by user Id
   * @param {*} clientId
   * @param {*} accessToken
   * @returns
   */
  const apiCallForGetUserDetails = (UserId, accessToken) => {
    return new Promise((resolve, reject) => {
      GetApiRequest(`${endpoints.user}/${UserId}`, "", accessToken)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  return {
    apiCallForGetUserList,
    apiCallForAddNewUser,
    apiCallForGetUserDetails,
  };
};

export { ApiUser };
