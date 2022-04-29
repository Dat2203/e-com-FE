import React from "react";
import ReactDOM from "react-dom";
import Layout from "./components/Layout";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

import "./sass/index.scss";

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Layout />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
