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

export const MatchInfo = ({ match, refresh, reset }) => {
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
                  {match.winner &&
                  match.winner.userId &&
                  match.host.userId == match.winner.userId ? (
                    <span className="bg-success text-white xs-small fw-bold px-1 rounded p-0">
                      Winner
                    </span>
                  ) : (
                    ""
                  )}

                  {match.looser &&
                  match.looser.userId &&
                  match.host.userId == match.looser.userId ? (
                    <span className="bg-danger text-white xs-small fw-bold px-1 rounded p-0">
                      Looser
                    </span>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
            <div>
              <img src="/assets/vv.png" height="40px" />
            </div>
            {!match.joiner.userId && (
              <div className="d-flex align-items-center">no joiner</div>
            )}
            {match.joiner.userId && (
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
                    {match.winner &&
                    match.winner.userId &&
                    match.joiner.userId == match.winner.userId ? (
                      <span className="bg-success text-white xs-small fw-bold px-1 rounded p-0">
                        Winner
                      </span>
                    ) : (
                      ""
                    )}
                    {match.looser &&
                    match.looser.userId &&
                    match.joiner.userId == match.looser.userId ? (
                      <span className="bg-danger text-white xs-small fw-bold px-1 rounded p-0">
                        Looser
                      </span>
                    ) : (
                      ""
                    )}
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

          <div className="xs-small d-flex justify-content-between">
            <div>
              {match.host.result && (
                <div className="px-2 ">
                  Result Submitted <b>{match.host.result}</b>
                  <br></br> at {formatTimestamp(match.host.resultAt)}
                </div>
              )}
            </div>

            <div>
              {match.joiner.result && (
                <div className="px-2 ">
                  Result Submitted <b>{match.joiner.result}</b>
                  <br></br> at {formatTimestamp(match.joiner.resultAt)}
                </div>
              )}
            </div>
          </div>

          <div className="xs-small d-flex px-2 justify-content-between">
            <div>
              {match.host.screenshot && (
                <div>
                  <button
                    type="button"
                    className="btn btn-sm p-0 m-0 xs-small  px-2 mb-1 bg-gradient-primary"
                    data-bs-toggle="collapse"
                    data-bs-target="#hostscreenshot"
                    aria-expanded="false"
                    aria-controls="collapseExample"
                  >
                    Screenshot
                  </button>
                  <div className="collapse" id="hostscreenshot">
                    <div className="card card-body">
                      <img
                        src={
                          HOST +
                          "/uploads/screenshots/" +
                          match.matchId +
                          "/" +
                          match.host.screenshot
                        }
                        width="250px"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div>
              {match.joiner.screenshot && (
                <div>
                  <button
                    type="button"
                    className="btn btn-sm p-0 m-0 xs-small  px-2 mb-1 bg-gradient-primary"
                    data-bs-toggle="collapse"
                    data-bs-target="#joinscreenshot"
                    aria-expanded="false"
                    aria-controls="collapseExample"
                  >
                    Screenshot
                  </button>
                  <div className="collapse" id="joinscreenshot">
                    <div className="card card-body">
                      <img
                        src={
                          HOST +
                          "/uploads/screenshots/" +
                          match.matchId +
                          "/" +
                          match.joiner.screenshot
                        }
                        width="250px"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
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
                  match.status == "open" ? "btn-info" : ""
                } ${match.status == "cancelled" ? "btn-danger" : ""} 
              ${match.status == "completed" ? "btn-success" : ""}
              ${match.status == "running" ? "btn-warning" : ""}
              `}
              >
                {match.status}
              </button>

              {match.conflict && (
                <button className="btn btn-sm btn-danger p-0 p-1 px-2 m-0 xs-small ">
                  Conflict
                </button>
              )}

              <button
                onClick={refresh}
                className="btn btn-sm btn-outline-dark p-0 p-1 px-2 m-0 xs-small "
              >
                Refresh Data
              </button>
              <button
                onClick={reset}
                className="btn btn-sm btn-outline-danger p-0 p-1 px-2 m-0 xs-small "
              >
                Reset Result
              </button>
            </div>
            <div className="d-flex gap-1">
              {match.joinerData && (
                <button className="btn btn-sm btn-info p-0 p-1 px-2 m-0 xs-small ">
                  Joined at {formatTimestamp(match.joiner.joinAt)}
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

        {_access &&
          (_access.includes("MANAGE CONFLICT") || _isSuperadmin) &&
          match.status == "running" &&
          match.conflict &&
          match.hostData &&
          match.joinerData && (
            <ConflictManager sup={true} refresh={refresh} match={match} />
          )}

        {_access &&
          (_access.includes("PENDING RESULT") || _isSuperadmin) &&
          match.status == "running" &&
          match.host.userId &&
          match.joiner.userId &&
          (!match.host.result || !match.joiner.result) && (
            <ConflictManager sup={true} refresh={refresh} match={match} />
          )}

        {_access &&
          (_access.includes("PENDING RESULT") || _isSuperadmin) &&
          !match.winner.userId &&
          match.host.result == "lose" &&
          match.joiner.result == "lose" && (
            <ConflictManager sup={true} refresh={refresh} match={match} />
          )}

        {_access &&
          (_access.includes("CANCEL REQUEST") || _isSuperadmin) &&
          match.status == "running" &&
          match.cancellationRequested.req &&
          match.cancellationRequested.req == true && (
            <ConflictManager refresh={refresh} match={match} />
          )}

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
            Ludo King Rapid API Manager
          </div>
          <div>
            {!match.gameId && (
              <div className="small text-center py-2">
                no verified room code or game id found in this match
              </div>
            )}

            {match.gameId && (
              <GameJson
                _id={match._id}
                gameId={match.gameId}
                gameJson={match.apiData}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
