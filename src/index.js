import React from "react";
import ReactDOM from "react-dom/client"; // Đúng cách
import { Provider } from "react-redux";
import store from "./redux/store";
import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root")); // Đảm bảo bạn dùng cách này
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
