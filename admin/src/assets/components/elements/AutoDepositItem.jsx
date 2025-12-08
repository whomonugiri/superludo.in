import { Link } from "react-router-dom";
import { formatTimestamp, singleFetcher } from "../../../utils/api.manager";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";

export const AutoDepositItem = ({ deposit }) => {
  const [loader1, setLoader1] = useState(false);
  const [loader2, setLoader2] = useState(false);
  const [loader3, setLoader3] = useState(false);

  const [txndata, setTxndata] = useState("");
  const [_withdraw, _setWithdraw] = useState(deposit);

  const handleFailure = () => {
    setLoader1(false);
    setLoader2(false);
    setLoader3(false);
  };
  const updateWithdraw = (status) => {
    if (status == "completed") setLoader1(true);
    if (status == "cancelled") setLoader2(true);
    singleFetcher(
      "/updateDepositStatus",
      {
        depositId: deposit._id,
        status: status,
        txnData: txndata,
      },
      _setWithdraw,
      handleFailure
    );
  };

  const refresh = (data) => {
    setLoader3(false);
    _setWithdraw(data);
  };

  const refreshStatus = () => {
    setLoader3(true);
    singleFetcher(
      "/getPaymentStatus",
      {
        txnId: deposit.txnId,
      },
      refresh,
      handleFailure
    );
  };

  return (
    <>
      <div
        style={{ opacity: _withdraw.status == "cancelled" ? 0.6 : 1 }}
        className="p-1 my-3 mx-2 bg-white rounded shadow-sm border d-flex flex-wrap justify-content-between"
      >
        <div className="d-flex gap-2">
          <img
            src={`/assets/avatars/${_withdraw.user.profilePic}`}
            height="70px"
            className=" rounded border"
          />

          <div style={{ lineHeight: "17px" }}>
            <div className="small fw-bold text-primary">{_withdraw.txnId}</div>
            <div className="small">
              <Link to={`/user/${_withdraw.user._id}`}>
                {_withdraw.user.fullName} <span></span>
              </Link>
            </div>
            <div
              className={`xs-small text-center rounded fw-bold ${
                _withdraw.status == "pending" && "bg-warning text-white"
              } ${_withdraw.status == "cancelled" && "bg-danger text-white"} ${
                _withdraw.status == "completed" && "bg-success text-white"
              }`}
            >
              {_withdraw.status}
            </div>
            <div className="xs-small">
              requested at {formatTimestamp(_withdraw.createdAt)}
            </div>
          </div>
        </div>

        <div>
          <div className="fw-bold fs-5 text-primary fw-bold text-end">
            ₹{_withdraw.amount}
          </div>

          <div className="d-flex flex-wrap gap-1">
            {
              <div className="text-end">
                <button
                  type="button"
                  className="btn btn-sm p-0 m-0 xs-small  px-2 py-1 mb-1 bg-gradient-dark"
                  data-bs-toggle="collapse"
                  data-bs-target={`#detail${_withdraw._id}`}
                  aria-expanded="false"
                  aria-controls="collapseExample"
                >
                  Deposit Details
                </button>
                <div className="collapse" id={`detail${_withdraw._id}`}>
                  <div className="card text-start card-body small p-0 p-2 border bg-dark text-white">
                    {_withdraw.txnData && (
                      <div>
                        {Object.entries(JSON.parse(_withdraw.txnData)).map(
                          ([key, value]) => (
                            <div key={key}>
                              <strong>{key}:</strong> {JSON.stringify(value)}
                            </div>
                          )
                        )}

                        {console.log(JSON.parse(_withdraw.txnData))}
                      </div>
                    )}

                    {_withdraw.method && (
                      <div>
                        <div className="text-start small fw-bold mt-2">
                          Admin Remarks
                        </div>
                        <div className="text-start small">
                          {_withdraw.method}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            }

            {_withdraw.status == "pending" && (
              <div className="text-end">
                <button
                  type="button"
                  className="btn btn-sm p-0 m-0 xs-small  px-2 py-1 mb-1 bg-gradient-info d-flex gap-1"
                  // data-bs-toggle="collapse"
                  // data-bs-target={`#update${_withdraw._id}`}
                  // aria-expanded="false"
                  // aria-controls="collapseExample"
                >
                  <ThreeDots
                    visible={true}
                    height="8"
                    width="25"
                    color="white"
                    radius="15"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                  />{" "}
                  Waiting For Payment
                </button>
                <div className="collapse" id={`update${_withdraw._id}`}>
                  <div className="card card-body small p-0 p-2 border bg-info text-white">
                    <textarea
                      className="form-control"
                      placeholder="anything to say..."
                      onChange={(e) => setTxndata(e.target.value)}
                      value={txndata}
                    ></textarea>
                    <div className="mt-2 d-flex gap-2 justify-content-end">
                      <button
                        onClick={() => updateWithdraw("completed")}
                        className={`btn p-0 p-1 px-2 btn-sm m-0 btn-success text-center ${
                          loader1 || loader2 ? "disabled" : ""
                        }`}
                      >
                        <ThreeDots
                          visible={loader1}
                          height="8"
                          width="25"
                          color="white"
                          radius="15"
                          ariaLabel="three-dots-loading"
                          wrapperStyle={{}}
                          wrapperClass=""
                        />{" "}
                        Accept
                      </button>
                      <button
                        onClick={() => updateWithdraw("cancelled")}
                        className={`btn p-0 p-1 px-2 btn-sm m-0 btn-danger text-center ${
                          loader1 || loader2 ? "disabled" : ""
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
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {_withdraw.status != "completed" && (
              <button
                onClick={refreshStatus}
                type="button"
                className={`btn btn-sm p-0 m-0 xs-small  px-2 py-1 mb-1 bg-gradient-warning text-dark d-flex align-items-center gap-2 ${
                  loader3 ? "disabled" : ""
                }`}
              >
                <ThreeDots
                  visible={loader3}
                  height="8"
                  width="25"
                  color="white"
                  radius="15"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />{" "}
                Refresh Status
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
