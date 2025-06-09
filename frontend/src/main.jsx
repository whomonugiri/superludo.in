import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import "animate.css";
import "./index.css";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Master from "./components/common/Master.jsx";
import Homepage from "./components/pages/Homepage.jsx";
import { Provider } from "react-redux";
import { store } from "./contexts/store.js";
import "./utils/i18n.js";
import { Login } from "./components/pages/Login.jsx";
import { Register } from "./components/pages/Register.jsx";
import { VerifyOtp } from "./components/pages/VerifyOtp.jsx";
import { App } from "./App.jsx";
// import ReactPWAInstallProvider, { useReactPWAInstall } from "react-pwa-install";
import { Offline, Online } from "react-detect-offline";
import { OfflineScreen } from "./components/elements/OfflineScreen.jsx";

toastr.options = {
  closeButton: true,
  debug: false,
  newestOnTop: true,
  progressBar: true,
  positionClass: "toast-bottom-center", // Other options: toast-top-left, toast-bottom-right, etc.
  preventDuplicates: true,
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

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      {/* <ReactPWAInstallProvider> */}
      {/* <Online> */}
      <App />
      {/* </Online> */}
      {/* <Offline>
        <OfflineScreen />
      </Offline> */}

      {/* </ReactPWAInstallProvider> */}
    </BrowserRouter>
  </Provider>
);
