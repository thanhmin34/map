import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import mapReducer, { mapFetch } from "./redux/mapSlice";
import { mapApi } from "./redux/mapApi";
const store = configureStore({
  reducer: {
    map: mapReducer,
    [mapApi.reducerPath]: mapApi.reducer,
  },
  mjddleware: (getDefaultMiddleware) => {
    getDefaultMiddleware().concat(mapApi.middleware);
  },
});
const root = ReactDOM.createRoot(document.getElementById("root"));
store.dispatch(mapFetch());

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
