import { createSlice } from "@reduxjs/toolkit";
import {
  GET_LOCAL_STORAGE_DATA,
  SET_LOCAL_STORAGE_DATA,
} from "../../../helper/local-storage/location-storage";
import { KEY_LOCAL_STORAGE } from "../../../helper/local-storage/locationStorage-key";

/**
 * get data from local storage and store into redux
 */
const themeData = GET_LOCAL_STORAGE_DATA(KEY_LOCAL_STORAGE.setThemeName);
let data = "theme-light";
if (themeData && themeData !== null) {
  data = themeData;
}

const setThemeNameToBody = (strName) => {
  SET_LOCAL_STORAGE_DATA(KEY_LOCAL_STORAGE.setThemeName, strName);
  document.documentElement.className = "";
  document.documentElement.classList.add(`${strName}`);
};

export const ThemeSlice = createSlice({
  name: "theme-reducer",
  initialState: {
    themeName: data,
  },
  reducers: {
    actionChangeTheme: (state) => {
      /**
       * get current theme and chang theme
       * if current theme is light then set dark
       * if current theme is dark then set light
       */
      let strName = state.themeName;
      if (strName === "theme-light") {
        strName = "theme-dark";
      } else {
        strName = "theme-light";
      }

      setThemeNameToBody(strName);
      state.themeName = strName;
    },
    actionInitThemeData: (state) => {
      setThemeNameToBody(state.themeName);
    },
  },
});

// Action creators are generated for each case reducer function
export const { actionChangeTheme, actionInitThemeData } = ThemeSlice.actions;

export default ThemeSlice.reducer;
