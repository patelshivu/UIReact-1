import { GetApiRequest, PostApiRequest } from "../../helper/rest-api";
import { endpoints } from "../../helper/rest-api/url-schema";

const ApiEntity = () => {
  const apiCallGetEntityList = (accessToken) => {
    return new Promise((resolve, reject) => {
      GetApiRequest(endpoints.entity, "", accessToken)
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

  const apiCallForAddNewEntity = (reqBody, accessToken) => {
    return new Promise((resolve, reject) => {
      PostApiRequest(endpoints.entity, reqBody, accessToken)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  return {
    apiCallGetEntityList,
    apiCallForAddNewEntity,
  };
};

export { ApiEntity };
