import { PostApiRequest } from "../../helper/rest-api";
import { auth } from "../../helper/rest-api/url-schema";

const apiCallForAuthentication = (reqBody) => {
  return new Promise((resolve, reject) => {
    PostApiRequest(auth.login, reqBody, "")
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export { apiCallForAuthentication };
