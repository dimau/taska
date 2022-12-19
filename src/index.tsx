import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { persistedStore, store } from "./app/store";
import { App } from "./app/App/App";
import "./normalize.css";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  //<React.StrictMode>
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistedStore}>
        <App />
      </PersistGate>
    </Provider>
  </BrowserRouter>
  //</React.StrictMode>
);
