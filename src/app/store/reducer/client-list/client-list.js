import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiClient } from "../../../api";
import Store from "../../index";

export const apiCallForGetClientList = createAsyncThunk(
  "fetchClientList",
  async () => {
    const response = await ApiClient().apiCallForGetClientList(
      Store.getState().rLogin.loginInfo.token.idToken
    );
    return {
      arrEvent: response,
      isSuccess: Array.isArray(response) ? true : false,
    };
  }
);

const initStates = {
  listClient: [],
  isLoadingClientList: false,
  error: "",
  isSuccess: true,
};

const ClientListReducer = createSlice({
  name: "ClientList",
  initialState: initStates,
  reducers: {
    actionClearList: (state) => {
      state.listClient = [];
      state.isLoadingClientList = false;
      state.error = "";
      state.isSuccess = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(apiCallForGetClientList.pending, (state) => {
      state.isLoadingClientList = true;
    });
    builder.addCase(apiCallForGetClientList.fulfilled, (state, action) => {
      state.listClient = action.payload.arrEvent;
      state.isSuccess = action.payload.isSuccess;
      state.error = action.payload.isSuccess ? "" : "Something Went wrong";
      state.isLoadingClientList = false;
    });
    builder.addCase(apiCallForGetClientList.rejected, (state, action) => {
      state.listClient = [];
      state.isSuccess = false;
      state.error = "Something Went wrong";
      state.isLoadingClientList = false;
    });
  },
});

export const { actionClearList } = ClientListReducer.actions;

export default ClientListReducer.reducer;
