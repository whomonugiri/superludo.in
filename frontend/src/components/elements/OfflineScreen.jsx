import { MdSignalWifiStatusbarConnectedNoInternet1 } from "react-icons/md";

export const OfflineScreen = () => {
  return (
    <>
      <div
        style={{ height: "100vh" }}
        className="overflow-hidden d-flex align-items-center justify-content-center bg-dark"
      >
        <div className="text-nowrap fw-bold text-white text-center">
          <div className="display-1">
            <MdSignalWifiStatusbarConnectedNoInternet1 />
          </div>
          <div>YOU ARE OFFLINE</div>
          <div className="small">CHECK YOUR INTERNET</div>
        </div>
      </div>
    </>
  );
};
