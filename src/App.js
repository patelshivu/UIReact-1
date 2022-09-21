import React, { Suspense } from "react";
import RootRoute from "./app/routes";
import Store from "./app/store";
import { Provider } from "react-redux";
import "./App.scss";
import "./app/themes/styles.scss";
// import "./app/themes/adminlte.min.css";

function App() {
  return (
    <Suspense fallback={<label>Loading...</label>}>
      <Provider store={Store}>
        <RootRoute />
      </Provider>
    </Suspense>
  );
}

export default App;
