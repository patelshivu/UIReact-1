import { createSlice } from "@reduxjs/toolkit";
import {
  GET_LOCAL_STORAGE_DATA,
  REMOVE_LOCAL_STORAGE_DATA,
  SET_LOCAL_STORAGE_DATA,
} from "../../../helper/local-storage/location-storage";
import { KEY_LOCAL_STORAGE } from "../../../helper/local-storage/locationStorage-key";
import { utilDecryptString, utilEncryptString } from "../../../utils";
import { cSessionKey } from "../../../constants";

/**
 * get data from local storage and store into redux
 */
let sessionData = GET_LOCAL_STORAGE_DATA(KEY_LOCAL_STORAGE.sessionToken);
let data = {};
if (sessionData && sessionData !== null) {
  const decode = utilDecryptString(sessionData, cSessionKey);
  data = JSON.parse(decode);
}

/**
 * reducer
 */
export const LoginSlice = createSlice({
  name: "login-reducer",
  initialState: {
    isLogin: Object.keys(data).length ? true : false,
    loginInfo: data,
  },
  reducers: {
    actionUpdateLoginStatus: (state, action) => {
      /**
       * update login info
       * save login data into local storage with base64 string
       */
      var encoded = utilEncryptString(
        JSON.stringify(action.payload),
        cSessionKey
      );
      SET_LOCAL_STORAGE_DATA(KEY_LOCAL_STORAGE.sessionToken, encoded);
      state.isLogin = true;
      state.loginInfo = action.payload;
    },
    actionLogout: (state) => {
      /**
       * logout
       */
      REMOVE_LOCAL_STORAGE_DATA(KEY_LOCAL_STORAGE.sessionToken);
      state.isLogin = false;
      state.loginInfo = {};
    },
  },
});

// Action creators are generated for each case reducer function
export const { actionUpdateLoginStatus, actionLogout } = LoginSlice.actions;

export default LoginSlice.reducer;
