import { Link } from "react-router-dom";
import { formatTimestamp, singleFetcher } from "../../../utils/api.manager";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";

export const WithdrawItem = ({ withdraw }) => {
  const [loader1, setLoader1] = useState(false);
  const [loader2, setLoader2] = useState(false);
  const [txndata, setTxndata] = useState("");
  const [_withdraw, _setWithdraw] = useState(withdraw);

  const handleFailure = () => {
    setLoader1(false);
    setLoader2(false);
  };
  const updateWithdraw = (status) => {
    if (status == "completed") setLoader1(true);
    if (status == "cancelled") setLoader2(true);
    singleFetcher(
      "/updateWithdrawStatus",
      {
        withdrawId: withdraw._id,
        status: status,
        txnData: txndata,
      },
      _setWithdraw,
      handleFailure
    );
  };

  return (
    <>
      <div className="p-1 my-3 mx-2 bg-white rounded shadow-sm border d-flex flex-wrap justify-content-between">
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
            <div className="xs-small bg-primary px-1 rounded text-dark fw-bold text-center border">
              Available Rewards:{" "}
              <span className="text-white">₹{_withdraw.balance.reward}</span>
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
          <div
            className={`xs-small text-end fw-bold ${
              _withdraw.status == "pending" && "text-info"
            } ${_withdraw.status == "cancelled" && "text-danger"} ${
              _withdraw.status == "completed" && "text-success"
            }`}
          >
            {_withdraw.status}
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
                  Withdraw Details
                </button>
                <div className="collapse" id={`detail${_withdraw._id}`}>
                  <div className="card card-body small p-0 p-2 border bg-dark text-white">
                    {_withdraw.method == "UPI" && (
                      <div className="text-start">
                        <div>
                          <b>Method :</b> UPI
                        </div>
                        <div>
                          <b>UPI Id :</b> {_withdraw.methodData.upiId}
                        </div>
                      </div>
                    )}

                    {_withdraw.method == "BANK" && (
                      <div className="text-start">
                        <div>
                          <b>Method :</b> BANK
                        </div>
                        <div>
                          <b>Account Holder :</b>{" "}
                          {_withdraw.methodData.bankName}
                        </div>
                        <div>
                          <b>Account No :</b>{" "}
                          {_withdraw.methodData.bankAccountNo}
                        </div>
                        <div>
                          <b>IFSC Code :</b> {_withdraw.methodData.bankIfscCode}
                        </div>
                      </div>
                    )}

                    {_withdraw.txnData && (
                      <div>
                        <div className="text-start small fw-bold mt-2">
                          Admin Remarks
                        </div>
                        <div className="text-start small">
                          {_withdraw.txnData}
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
                  className="btn btn-sm p-0 m-0 xs-small  px-2 py-1 mb-1 bg-gradient-info"
                  data-bs-toggle="collapse"
                  data-bs-target={`#update${_withdraw._id}`}
                  aria-expanded="false"
                  aria-controls="collapseExample"
                >
                  Update Status
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
          </div>
        </div>
      </div>
    </>
  );
};
