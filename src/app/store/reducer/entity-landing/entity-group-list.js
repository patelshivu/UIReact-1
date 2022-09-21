import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiEntityGroup } from "../../../api";
import Store from "../../index";

export const apiCallForGetEntityGroupList = createAsyncThunk(
  "fetchEntityGroupList",
  async () => {
    const response = await ApiEntityGroup().apiCallGetEntityGroupList(
      Store.getState().rLogin.loginInfo.token.idToken
    );
    return {
      arrEvent: response,
      isSuccess: Array.isArray(response) ? true : false,
    };
  }
);

const initStates = {
  listEntityGroup: [],
  isLoading: false,
  error: "",
  isSuccess: true,
};

const EntityGroupListReducer = createSlice({
  name: "EntityGroupList",
  initialState: initStates,
  reducers: {
    actionClearList: (state) => {
      state.listEntityGroup = [];
      state.isLoading = false;
      state.error = "";
      state.isSuccess = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(apiCallForGetEntityGroupList.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(apiCallForGetEntityGroupList.fulfilled, (state, action) => {
      state.listEntityGroup = action.payload.arrEvent;
      state.isSuccess = action.payload.isSuccess;
      state.error = action.payload.isSuccess ? "" : "Something Went wrong";
      state.isLoading = false;
    });
    builder.addCase(apiCallForGetEntityGroupList.rejected, (state, action) => {
      state.listEntityGroup = [];
      state.isSuccess = false;
      state.error = "Something Went wrong";
      state.isLoading = false;
    });
  },
});

export const { actionClearList } = EntityGroupListReducer.actions;

export default EntityGroupListReducer.reducer;
