import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiEntity } from "../../../api";
import Store from "../../index";

export const apiCallForGetEntityList = createAsyncThunk(
  "fetchEntityList",
  async () => {
    const response = await ApiEntity().apiCallGetEntityList(
      Store.getState().rLogin.loginInfo.token.idToken
    );
    return {
      arrEvent: response,
      isSuccess: Array.isArray(response) ? true : false,
    };
  }
);

const initStates = {
  listEntity: [],
  isLoading: false,
  error: "",
  isSuccess: true,
};

const EntityListReducer = createSlice({
  name: "EntityList",
  initialState: initStates,
  reducers: {
    actionClearList: (state) => {
      state.listEntity = [];
      state.isLoading = false;
      state.error = "";
      state.isSuccess = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(apiCallForGetEntityList.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(apiCallForGetEntityList.fulfilled, (state, action) => {
      state.listEntity = action.payload.arrEvent;
      state.isSuccess = action.payload.isSuccess;
      state.error = action.payload.isSuccess ? "" : "Something Went wrong";
      state.isLoading = false;
    });
    builder.addCase(apiCallForGetEntityList.rejected, (state, action) => {
      state.listEntity = [];
      state.isSuccess = false;
      state.error = "Something Went wrong";
      state.isLoading = false;
    });
  },
});

export const { actionClearList } = EntityListReducer.actions;

export default EntityListReducer.reducer;
