import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import { Provider } from "react-redux";
import store from "./contexts/store.js";
import "animate.css";
import TimeAgo from "javascript-time-ago";

import en from "javascript-time-ago/locale/en";

TimeAgo.addDefaultLocale(en);

toastr.options = {
  closeButton: true,
  debug: false,
  newestOnTop: true,
  progressBar: true,
  positionClass: "toast-top-center", // Other options: toast-top-left, toast-bottom-right, etc.
  preventDuplicates: false,
  onclick: null,
  showDuration: "300",
  hideDuration: "300",
  timeOut: "3000", // Duration the notification stays
  extendedTimeOut: "1000",
  showEasing: "swing",
  hideEasing: "linear",
  showMethod: "slideDown",
  hideMethod: "slideUp",
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
