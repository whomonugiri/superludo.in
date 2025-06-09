import { TbApi, TbServerBolt } from "react-icons/tb";
import {
  formatTimestamp,
  maskMobile,
  singleFetcher,
} from "../../../utils/api.manager";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";

export const ConflictManager = ({ match, refresh, sup = false }) => {
  const [loader, setLoader] = useState(false);
  const [loader2, setLoader2] = useState(false);

  const fetchResultApi = async () => {
    setLoader(true);
    singleFetcher("/updateResultApi", { matchId: match._id }, refresh, refresh);
  };

  const updateResult = async (r) => {
    setLoader(true);
    singleFetcher(
      "/updateResult",
      { matchId: match._id, result: r },
      refresh,
      refresh
    );
  };

  const updateReq = async (r) => {
    setLoader2(true);
    singleFetcher(
      "/updateResult",
      { matchId: match._id, req: true, action: r },
      refresh,
      refresh
    );
  };

  return (
    <>
      <div className="bg-white shadow-sm p-2 my-2 mt-3 rounded">
        <div className="fw-bold small border-bottom text-dark">
          Result Manager
        </div>
        {sup && (
          <div className="d-flex gap-1 justify-content-flex-wrap mt-3">
            <button
              onClick={() => {
                updateResult("host");
              }}
              className={`btn btn-sm bg-gradient-success d-flex align-items-center gap-2 text-nowrap ${
                loader ? "disabled" : ""
              }`}
            >
              <ThreeDots
                visible={loader}
                height="8"
                width="25"
                color="white"
                radius="15"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />{" "}
              <img
                src={`/assets/avatars/${match.hostData.profilePic}`}
                height="20px"
                className="rounded border"
              />{" "}
              {match.hostData.fullName} (
              {maskMobile(match.hostData.mobileNumber)}) is Winner
            </button>

            <button
              onClick={() => {
                updateResult("joiner");
              }}
              className={`btn btn-sm bg-gradient-success d-flex align-items-center gap-2 text-nowrap  ${
                loader ? "disabled" : ""
              }`}
            >
              <ThreeDots
                visible={loader}
                height="8"
                width="25"
                color="white"
                radius="15"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />{" "}
              <img
                src={`/assets/avatars/${match.joinerData.profilePic}`}
                height="20px"
                className="rounded border"
              />{" "}
              {match.joinerData.fullName} (
              {maskMobile(match.joinerData.mobileNumber)}) is Winner
            </button>

            <button
              onClick={() => {
                updateResult("refund");
              }}
              className={`btn btn-sm bg-gradient-danger d-flex align-items-center gap-2 text-nowrap  ${
                loader ? "disabled" : ""
              }`}
            >
              <ThreeDots
                visible={loader}
                height="8"
                width="25"
                color="white"
                radius="15"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
              Cancel & Refund
            </button>

            <button
              onClick={() => {
                updateResult("cancel");
              }}
              className={`btn btn-sm bg-gradient-danger d-flex align-items-center gap-2 text-nowrap  ${
                loader ? "disabled" : ""
              }`}
            >
              <ThreeDots
                visible={loader}
                height="8"
                width="25"
                color="white"
                radius="15"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
              Cancel Only
            </button>
          </div>
        )}

        {match.status == "running" &&
          match.cancellationRequested.req &&
          match.cancellationRequested.req == true && (
            <div>
              <div className="fw-bold text-dark small mt-3">
                Cancellation Requested by{" "}
                <span className="text-primary">
                  {match[match.cancellationRequested.by + "Data"].fullName}
                </span>{" "}
                at{" "}
                <span className="text-info">
                  {formatTimestamp(match.cancellationRequested.reqAt)}
                </span>{" "}
                is currently <span className="text-info">pending</span> and the
                reason is{" "}
                <span className="text-danger">
                  {match.cancellationRequested.reason}
                </span>
                <div className="d-flex gap-2 mt-2">
                  <button
                    onClick={() => {
                      updateReq("accept");
                    }}
                    className={`btn btn-sm bg-success d-flex align-items-center text-white gap-2 text-nowrap  ${
                      loader2 ? "disabled" : ""
                    }`}
                  >
                    <ThreeDots
                      visible={loader2}
                      height="8"
                      width="25"
                      color="white"
                      radius="15"
                      ariaLabel="three-dots-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                    />{" "}
                    Accept Request
                  </button>

                  <button
                    onClick={() => {
                      updateReq("reject");
                    }}
                    className={`btn btn-sm bg-danger d-flex align-items-center text-white gap-2 text-nowrap  ${
                      loader2 ? "disabled" : ""
                    }`}
                  >
                    <ThreeDots
                      visible={loader2}
                      height="8"
                      width="25"
                      color="white"
                      radius="15"
                      ariaLabel="three-dots-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                    />{" "}
                    Reject Request
                  </button>
                </div>
              </div>
            </div>
          )}
      </div>
    </>
  );
};
