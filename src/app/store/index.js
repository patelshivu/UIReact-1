import { configureStore } from "@reduxjs/toolkit";

/**
 * reducer
 */
import LoginReducer from "./reducer/login-reducer";
import ThemeReducer from "./reducer/theme-reducer";
import EntityListReducer from "./reducer/entity-landing/enityt-list";
import EntityGroupListReducer from "./reducer/entity-landing/entity-group-list";
import ClientListReducer from "./reducer/client-list/client-list";

export default configureStore({
  reducer: {
    rLogin: LoginReducer,
    rTheme: ThemeReducer,
    rEntityList: EntityListReducer,
    rEntityGroupList: EntityGroupListReducer,
    rClientList: ClientListReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});
