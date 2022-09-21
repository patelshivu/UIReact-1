import { utilIsProduction } from "../../utils";

export const KEY_LOCAL_STORAGE = {
  /**
   * in this session we store token info
   */
  sessionToken: utilIsProduction ? "oWWD4UqUFIvLSi9" : "Mfvhg2BGj6uE9R5",

  /**
   * store theme key
   */
  setThemeName: "setThemeName",
};
