import { GetApiRequest, PostApiRequest } from "../../helper/rest-api";
import { endpoints } from "../../helper/rest-api/url-schema";

const ApiEntityGroup = () => {
  const apiCallGetEntityGroupList = (accessToken) => {
    return new Promise((resolve, reject) => {
      GetApiRequest(endpoints.entityGroup, "", accessToken)
        .then((res) => {
          let arrEntities = [];
          if (res.entities && Array.isArray(res.entities)) {
            arrEntities = res.entities;
          }
          resolve(arrEntities);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  const apiCallForAddNewEntityGroup = (reqBody, accessToken) => {
    return new Promise((resolve, reject) => {
      PostApiRequest(endpoints.entityGroup, reqBody, accessToken)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  return {
    apiCallGetEntityGroupList,
    apiCallForAddNewEntityGroup,
  };
};

export { ApiEntityGroup };
