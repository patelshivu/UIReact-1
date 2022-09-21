import axios from "axios";
import { REMOVE_LOCAL_STORAGE_DATA } from "../local-storage/location-storage";
import { KEY_LOCAL_STORAGE } from "../local-storage/locationStorage-key";
import { CreateUrl } from "./create-url";

/**
 *
 * @param {} endpoint
 * @returns
 * pass endpoint to create url
 * create common string url
 */
const strUrl = (endpoint) => {
  return CreateUrl(endpoint);
};

/**
 * common axios class
 * @returns
 */
const commonAxiosService = (dictRest, resolve, reject) => {
  return axios(dictRest)
    .then(function (response) {
      if (response.status === 401) {
        REMOVE_LOCAL_STORAGE_DATA(KEY_LOCAL_STORAGE.sessionToken);
        window.location.reload();
      } else {
        resolve(response.data);
      }
    })
    .catch(function (error) {
      if (error.response.status === 401 || error.response.status === 406) {
        REMOVE_LOCAL_STORAGE_DATA(KEY_LOCAL_STORAGE.sessionToken);
        window.location.reload();
      } else {
        if (error.response.data) {
          const err = error.response.data;
          if (err.errors && err.errors.message) {
            reject(err.errors.message);
          } else if (err.errors && err.errors.request) {
            let errReq = err.errors.request;
            if (Array.isArray(errReq)) {
              reject(errReq.join(", "));
            } else {
              reject(errReq);
            }
          } else {
            reject("Something went wrong. Try again.");
          }
        } else {
          reject(error.message);
        }
      }
    })
    .then(function () {
      // always executed
    });
};

/**
 * GET method
 * pass endpoint
 * pass query in Object Type
 * @param {*} endpoint
 * @returns
 */
export const GetApiRequest = (endpoint, query, token) => {
  return new Promise((resolve, reject) => {
    let dictHeaders = {
      Authorization: `Bearer ${token}`,
    };
    let dictInfo = {
      method: "GET",
      url: strUrl(endpoint),
      params: query,
      headers: dictHeaders,
    };
    commonAxiosService(dictInfo, resolve, reject);
  });
};

/**
 * POST method
 * @param {*} endpoint
 * @param {*} param
 * @param {*} token
 * @returns
 */
export const PostApiRequest = (endpoint, param, token) => {
  return new Promise((resolve, reject) => {
    let dictHeaders = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    };
    let dictInfo = {
      method: "POST",
      url: strUrl(endpoint),
      data: param,
      headers: dictHeaders,
    };
    commonAxiosService(dictInfo, resolve, reject);
  });
};

/**
 * PUT method
 * @param {*} endpoint
 * @param {*} param
 * @param {*} token
 * @returns
 */
export const PutApiRequest = (endpoint, param, token) => {
  return new Promise((resolve, reject) => {
    let dictHeaders = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    };
    let dictInfo = {
      method: "PUT",
      url: strUrl(endpoint),
      data: param,
      headers: dictHeaders,
    };
    commonAxiosService(dictInfo, resolve, reject);
  });
};

/**
 * DELETE method
 * pass endpoint
 * pass query in Object Type
 * @param {*} endpoint
 * @returns
 */
export const DeleteApiRequest = (endpoint, token) => {
  return new Promise((resolve, reject) => {
    let dictHeaders = {
      Authorization: `Bearer ${token}`,
    };
    let dictInfo = {
      method: "DELETE",
      url: strUrl(endpoint),
      headers: dictHeaders,
    };
    commonAxiosService(dictInfo, resolve, reject);
  });
};
