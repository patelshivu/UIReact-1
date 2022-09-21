import { GetApiRequest, PostApiRequest } from "../../helper/rest-api";
import { endpoints } from "../../helper/rest-api/url-schema";
import MockResponse from "./mock-response.json";

const ApiClient = () => {
  /**
   * get client list
   * pass access token
   * @param {*} accessToken
   * @returns
   */
  const apiCallForGetClientList = (accessToken) => {
    return new Promise((resolve, reject) => {
      GetApiRequest(endpoints.client, "", accessToken)
        .then((res) => {
          let arrClients = [];
          if (res.clients && Array.isArray(res.clients)) {
            arrClients = res.clients;
          }
          resolve(arrClients);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  /**
   * add new client
   * @param {*} reqBody
   * @param {*} accessToken
   * @returns
   */
  const apiCallForAddNewClient = (reqBody, accessToken) => {
    return new Promise((resolve, reject) => {
      PostApiRequest(endpoints.client, reqBody, accessToken)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  /**
   *  get client details by client Id
   * @param {*} clientId
   * @param {*} accessToken
   * @returns
   */
  const apiCallForGetClientDetails = (clientId, accessToken) => {
    return new Promise((resolve, reject) => {
      GetApiRequest(`${endpoints.client}/${clientId}`, "", accessToken)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  return {
    apiCallForGetClientDetails,
    apiCallForAddNewClient,
    apiCallForGetClientList,
  };
};

export { ApiClient };
