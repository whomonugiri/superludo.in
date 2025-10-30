import { MdVerified } from "react-icons/md";
import { base, formatTimestamp, maskMobile } from "../../../utils/api.manager";
import { WalletButton2 } from "./WalletButton2";
import { Link } from "react-router-dom";
import { IoInformationCircleOutline } from "react-icons/io5";
import { TransactionListItem } from "./TransactionListItem";
import { Log } from "./Log";
import { HOST } from "../../../utils/constants";
import { ConflictManager } from "./ConflictManager";
import { useSelector } from "react-redux";
import { GameJson } from "./GameJson";
import { OnlineGameJson } from "./OnlineGameJson";
import { SpeedUserItem } from "./SpeedUserItem";

export const SpeedMatchInfo = ({ match, refresh }) => {
  const { _access, _isSuperadmin } = useSelector((store) => store.auth);

  return (
    <>
      <div className={`p-2`}>
        <div className="border bg-white shadow rounded opacity-75">
          <div className="bg-dark fw-bold d-flex justify-content-between rounded-top px-2 py-1 small  text-white">
            <div>ENTRY FEE ₹{match.entryFee}</div>
            <div>PRIZE ₹{match.prize}</div>
          </div>
          <div className="d-flex justify-content-between p-2">
            <div className="d-flex align-items-start  gap-2">
              <img
                src={`/assets/avatars/${match.hostData.profilePic}`}
                height="60px"
                width="60px"
                className="rounded border"
              />
              <div style={{ lineHeight: "18px" }}>
                <div className="fw-bold small text-dark d-flex align-items-center gap-1">
                  <span>{match.hostData.fullName}</span>{" "}
                  {match.hostData.kyc ? (
                    <MdVerified
                      className="text-success"
                      title="KYC Completed"
                    />
                  ) : (
                    ""
                  )}
                </div>
                <div className="fw-bold xs-small text-dark">
                  {maskMobile(match.hostData.mobileNumber)}
                </div>
                <div>
                  {match.blue.result == "winner" ? (
                    <span className="bg-success text-white xs-small fw-bold px-1 rounded p-0">
                      Winner
                    </span>
                  ) : (
                    ""
                  )}

                  {match.blue.result == "looser" ? (
                    <span className="bg-danger text-white xs-small fw-bold px-1 rounded p-0">
                      Looser
                    </span>
                  ) : (
                    ""
                  )}

                  <span className="bg-dark text-white xs-small fw-bold px-1 rounded p-0 mx-1">
                    Score : {match.blue.score}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <img src="/assets/vv.png" height="40px" />
            </div>
            {!match.green.userId && (
              <div className="d-flex align-items-center">no joiner</div>
            )}
            {match.green.userId && (
              <div className="d-flex align-items-start  gap-2">
                <div style={{ lineHeight: "18px" }}>
                  <div className="fw-bold small text-dark d-flex justify-content-end align-items-center gap-1">
                    <span>{match.joinerData.fullName}</span>{" "}
                    {match.joinerData.kyc ? (
                      <MdVerified
                        className="text-success"
                        title="KYC Completed"
                      />
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="fw-bold xs-small text-end text-dark">
                    {maskMobile(match.joinerData.mobileNumber)}
                  </div>
                  <div className="text-end">
                    {" "}
                    {match.green.result == "winner" ? (
                      <span className="bg-success text-white xs-small fw-bold px-1 rounded p-0">
                        Winner
                      </span>
                    ) : (
                      ""
                    )}
                    {match.green.result == "looser" ? (
                      <span className="bg-danger text-white xs-small fw-bold px-1 rounded p-0">
                        Looser
                      </span>
                    ) : (
                      ""
                    )}
                    <span className="bg-dark text-white xs-small fw-bold px-1 rounded p-0 mx-1">
                      Score : {match.green.score}
                    </span>
                  </div>
                </div>
                <img
                  src={`/assets/avatars/${match.joinerData.profilePic}`}
                  height="60px"
                  width="60px"
                  className="rounded border"
                />
              </div>
            )}
          </div>

          <div className="d-flex justify-content-between flex-wrap gap-1 border-top p-2">
            <div className="d-flex gap-1 flex-wrap">
              <button className="btn btn-sm btn-dark p-0 p-1 px-2 m-0 xs-small ">
                {match.matchId}
              </button>

              {match.roomCode && (
                <button className="btn btn-sm btn-primary p-0 p-1 px-2 m-0 xs-small ">
                  Room Code : {match.roomCode}
                </button>
              )}
              <button
                className={`btn btn-sm p-0 p-1 px-2 m-0 xs-small ${
                  match.status == "waiting" ? "btn-info" : ""
                } ${match.status == "cancelled" ? "btn-danger" : ""} 
                    ${match.status == "completed" ? "btn-success" : ""}
                    ${match.status == "running" ? "btn-warning" : ""}
                    `}
              >
                {match.status + (match.blue.result == "draw" ? " (draw)" : "")}
              </button>

              <button
                onClick={refresh}
                className="btn btn-sm btn-outline-dark p-0 p-1 px-2 m-0 xs-small "
              >
                Refresh Data
              </button>
            </div>
            <div className="d-flex gap-1">
              <button className="btn btn-sm btn-info p-0 p-1 px-2 m-0 xs-small ">
                Duration : {match.duration} Min
              </button>
              {match.startedAt && (
                <button className="btn btn-sm btn-info p-0 p-1 px-2 m-0 xs-small ">
                  Started at {formatTimestamp(match.startedAt)}
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-between flex-wrap my-2">
          <button className="btn btn-sm btn-dark p-0 p-1 px-2 m-0 xs-small ">
            Created at {formatTimestamp(match.createdAt)}
          </button>

          {match.completedAt && (
            <button className="btn btn-sm btn-success p-0 p-1 px-2 m-0 xs-small ">
              Completed at {formatTimestamp(match.completedAt)}
            </button>
          )}
        </div>

        <div className="bg-white rounded border shadow-sm p-2 mt-3">
          <div className="small fw-bold text-dark border-bottom">
            Transactions
          </div>
          <div>
            {match.transactions.length < 1 && (
              <div className="small text-center py-2">
                no transactions available
              </div>
            )}

            {match.transactions.length > 0 && (
              <div>
                {match.transactions.map((txn) => (
                  <TransactionListItem key={txn._id} txn={txn} />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded border shadow-sm p-2 mt-3">
          <div className="small fw-bold text-dark border-bottom">
            Match Logs
          </div>
          <div>
            {match.logs.length < 1 && (
              <div className="small text-center py-2">no logs available</div>
            )}

            {match.logs.length > 0 && (
              <div>
                {match.logs.map((log, index) => (
                  <Log key={index} log={log} />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded border shadow-sm p-2 mt-3">
          <div className="small fw-bold text-dark border-bottom">
            Online Multiplayer Ludo Data Manager
          </div>
          <div>
            {!match.apiData && (
              <div className="small text-center py-2">
                currently no data is available
              </div>
            )}

            {match.apiData && <OnlineGameJson gameJson={match.apiData} />}
          </div>
        </div>
      </div>
    </>
  );
};
