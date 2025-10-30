import { useTranslation } from "react-i18next";
import { formatTimestamp } from "./Txn";
import { FaHeart, FaThumbsDown, FaThumbsUp } from "react-icons/fa6";
import { motion } from "motion/react";
import { IoIosHeart, IoIosHeartDislike } from "react-icons/io";

import { MdVerified } from "react-icons/md";
import { truncateName } from "../../game/twoplayer/helpers/ActionHandler";
export const HMatch = ({ match }) => {
  const { t } = useTranslation();
  const date = new Date(match.createdAt);
  const day = date.toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
  });
  const time = date.toLocaleString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const d = {
    opponent: "",
    result: "",
  };
  console;
  if (match.currentUserId == match.hostData._id) {
    d.opponent = match.joinerData.fullName;
  } else if (match.currentUserId == match.joinerData._id) {
    d.opponent = match.hostData.fullName;
  } else {
    d.opponent = "unknown";
  }

  if (match.status == "completed") {
    if (match.type == "manual") {
      if (match.winner.userId == match.currentUserId) {
        d.result = "Win";
      } else {
        d.result = "Lost";
      }
    } else {
      if (
        match.blue.userId == match.currentUserId &&
        match.blue.result == "winner"
      ) {
        d.result = "Win";
      } else if (
        match.green.userId == match.currentUserId &&
        match.green.result == "winner"
      ) {
        d.result = "Win";
      } else if (match.green.result == "draw") {
        d.result = "Draw";
      } else {
        d.result = "Lost";
      }
    }
  } else {
    d.result = "Played";
  }
  return (
    <>
      <div className=" border-bottom rounded-2  p-0 px-2 py-2">
        <div className=" d-flex justify-content-between align-items-center mt-1">
          <div className="d-flex align-items-center gap-2">
            <div
              className="opacity-75 text-center"
              style={{
                paddingRight: "10px",
                borderRight: "1px solid rgba(0,0,0,0.5)",
              }}
            >
              <div className="">{day}</div>
              <div style={{ fontSize: "12px" }}>{time.toUpperCase()}</div>
            </div>
            <div style={{ lineHeight: "18px" }}>
              <div className="fw-bold small">
                {d.result} against {truncateName(d.opponent)}
              </div>
              <div
                className="d-flex justify-content-between small opacity-50 "
                style={{ fontSize: "12px" }}
              >
                <div>
                  {match.matchId} | {match.roomCode}
                </div>
              </div>
            </div>
          </div>

          <div style={{ lineHeight: "19px" }} className="">
            <div className="fw-bold fs-6 text-end text-nowrap d-flex gap-1 align-items-center">
              {d.result == "Lost" && <span className="text-danger">(-)</span>}
              {d.result == "Win" && <span className="text-success">(+)</span>}
              {/* <span className="text-success">(+)</span> */}
              <img src="/assets/money2.png" style={{ height: "20px" }} />₹
              {d.result == "Win" && match.prize}
              {d.result == "Lost" && match.entryFee}
              {d.result == "Draw" && match.entryFee}
              {d.result == "Played" && match.entryFee}
            </div>
            <div style={{ fontSize: "12px" }} className="opacity-75 text-end">
              {match.status}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
