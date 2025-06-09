import { useTranslation } from "react-i18next";
import { formatTimestamp } from "./Txn";
import { FaHeart, FaThumbsDown, FaThumbsUp } from "react-icons/fa6";
import { motion } from "motion/react";
import { IoIosHeart, IoIosHeartDislike } from "react-icons/io";

import { MdVerified } from "react-icons/md";
import { truncateName } from "../../game/twoplayer/helpers/ActionHandler";
export const HMatch = ({ match }) => {
  const { t } = useTranslation();
  return (
    <>
      <div className="p-1 px-2 rounded-2 bg-primary-light border shadow my-3">
        <div className="border-bottom border-2 py-1 d-flex justify-content-between">
          <div className="x-small fw-bold d-flex gap-2">
            {t("entry_fee")}{" "}
            <span className="text-danger d-flex gap-1 align-items-center">
              {" "}
              <img src="assets/money2.png" height="18px" />
              {match.entryFee}
            </span>
          </div>

          <div className="x-small fw-bold d-flex gap-2">
            {t("prize")}{" "}
            <span className="text-danger d-flex gap-1 align-items-center">
              {" "}
              <img src="assets/money2.png" height="18px" />
              {match.prize}
            </span>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center py-1 ">
          <div className="text-center py-0 fw-bold">
            <img
              src={`assets/avatars/${match.hostData.profilePic}`}
              className="rounded-circle border"
              height="40px"
            />
            <div className="small gap-1 align-items-center">
              {truncateName(match.hostData.fullName)}{" "}
              {match.hostData.kyc ? (
                <MdVerified className="text-success" title="KYC Completed" />
              ) : (
                ""
              )}{" "}
              {match.type == "online" || match.type == "speedludo" ? (
                <>
                  {match.status == "completed" &&
                    match.blue.result == "winner" && (
                      <span className="text-success">
                        <FaThumbsUp />
                      </span>
                    )}
                  {match.status == "completed" &&
                    match.blue.result == "looser" && (
                      <span className="text-danger">
                        <FaThumbsDown />
                      </span>
                    )}

                  {match.status == "completed" && match.type == "speedludo" && (
                    <div
                      style={{ fontSize: "11px" }}
                      className="text-white text-start"
                    >
                      <div className=" rounded bg-dark d-inline-block px-2">
                        Score : {match.blue.score}
                      </div>

                      <div className=" rounded bg-primary mx-1 d-inline-block px-2">
                        {match.apiData.data[0].life < 0 ? (
                          <span>
                            <IoIosHeartDislike />
                          </span>
                        ) : (
                          <span>
                            <IoIosHeart /> {match.apiData.data[0].life}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <>
                  {match.status == "completed" &&
                    match.winner &&
                    match.winner.userId == match.hostData._id && (
                      <span className="text-success">
                        <FaThumbsUp />
                      </span>
                    )}
                  {match.status == "completed" &&
                    match.looser &&
                    match.looser.userId == match.hostData._id && (
                      <span className="text-danger">
                        <FaThumbsDown />
                      </span>
                    )}
                </>
              )}
            </div>
          </div>
          <div>
            <img src="assets/vv.png" height="40px" />
          </div>
          <div className="text-center py-0 fw-bold">
            <img
              src={`assets/avatars/${match.joinerData.profilePic}`}
              className="rounded-circle border"
              height="40px"
            />
            <div className="small  gap-1 align-items-center">
              {truncateName(match.joinerData.fullName)}{" "}
              {match.joinerData.kyc ? (
                <MdVerified className="text-primary" title="KYC Completed" />
              ) : (
                ""
              )}
              {match.type == "online" || match.type == "speedludo" ? (
                <>
                  {match.status == "completed" &&
                    match.green.result == "winner" && (
                      <span className="text-success">
                        <FaThumbsUp />
                      </span>
                    )}
                  {match.status == "completed" &&
                    match.green.result == "looser" && (
                      <span className="text-danger">
                        <FaThumbsDown />
                      </span>
                    )}

                  {match.status == "completed" && match.type == "speedludo" && (
                    <div
                      style={{ fontSize: "11px" }}
                      className="text-white text-end"
                    >
                      <div className=" rounded bg-dark d-inline-block px-2">
                        Score : {match.green.score}
                      </div>
                      <div className=" rounded bg-primary mx-1 d-inline-block px-2">
                        {match.apiData.data[1].life < 0 ? (
                          <span>
                            <IoIosHeartDislike />
                          </span>
                        ) : (
                          <span>
                            <IoIosHeart /> {match.apiData.data[1].life}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <>
                  {match.status == "completed" &&
                    match.winner &&
                    match.winner.userId == match.joinerData._id && (
                      <span className="text-success">
                        <FaThumbsUp />
                      </span>
                    )}
                  {match.status == "completed" &&
                    match.looser &&
                    match.looser.userId == match.joinerData._id && (
                      <span className="text-danger">
                        <FaThumbsDown />
                      </span>
                    )}
                </>
              )}
            </div>
          </div>
        </div>
        <div
          className="text-center border-top d-flex justify-content-between
         
          "
          style={{ fontSize: "11px" }}
        >
          <div>
            {formatTimestamp(match.createdAt)} (
            <span className="">{match.matchId}</span>)
          </div>
          <div
            className={`${
              match.status == "cancelled" ? "text-danger" : "text-primary"
            }`}
          >
            {t(match.status)}
            {match.green && match.green.result == "draw" && " (Draw)"}
          </div>
        </div>
      </div>
    </>
  );
};
