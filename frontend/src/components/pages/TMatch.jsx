import { useEffect, useState } from "react";
import axios from "axios";
import toastr from "toastr";
import $ from "jquery";
import {
  API_ACCEPT_CANCEL_MATCH,
  API_FETCH_MATCH,
  API_FETCH_TOURNAMENT,
  API_HOST,
  API_JOIN_TOURNAMENT,
  API_UPDATE_ROOM_CODE,
} from "../../utils/constants";
import { Link, useNavigate, useParams } from "react-router";
import { RMatch } from "../elements/RMatch";
import { EnterRoomCard } from "../elements/EnterRoomCard";
import Button1 from "../elements/Button1";
import Button2 from "../elements/Button2";
import Button3 from "../elements/Button3";
import { Button4 } from "../elements/Button4";
import {
  FaHandHoldingHeart,
  FaMedal,
  FaRegArrowAltCircleLeft,
  FaRegPlayCircle,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";
import CopyToClipboard from "react-copy-to-clipboard";
import { MdOutlineContentCopy } from "react-icons/md";
import { WaitingRoomCard } from "../elements/WaitingRoomCard";
import { FaRegThumbsDown, FaRegThumbsUp } from "react-icons/fa6";
import { ReqCancel } from "../elements/ReqCancel";
import { IWon } from "../elements/IWon";
import { ILost } from "../elements/ILost";
import { useSelector } from "react-redux";
import { motion } from "motion/react";
import { GrTrophy } from "react-icons/gr";
import { AiFillLike } from "react-icons/ai";
import { CiMedal } from "react-icons/ci";
import { GiMedal } from "react-icons/gi";
export const TMatch = () => {
  const { isAuth } = useSelector((store) => store.auth);
  const [busy, setBusy] = useState(false);
  const [match, setMatch] = useState(null);
  const [userType, setUserType] = useState(null);
  const [working, setWorking] = useState(false);
  const [time, setTime] = useState(180);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const params = useParams("gameUid");
  const fetchMatch = async () => {
    try {
      setBusy(true);
      const headers = {
        "Content-Type": "application/json",
        _t: localStorage.getItem("_tk"),
        _di: localStorage.getItem("_di"),
        tournamentId: params.gameUid,
      };
      const res = await axios.post(
        API_HOST + API_FETCH_TOURNAMENT,
        { ...headers },
        { headers }
      );

      if (!res.data.match) {
        navigate("/tournament");
        return;
      }
      if (res.data.success) {
        setMatch(res.data.match);
      } else {
        toastr.error(t(res.data.message));
      }
      setBusy(false);
    } catch (error) {
      //console.log(error);
      toastr.error(error.response ? error.response.data : error.message);
    }
  };

  const jointournament = async () => {
    try {
      setWorking(true);
      const headers = {
        "Content-Type": "application/json",
        _t: localStorage.getItem("_tk"),
        _di: localStorage.getItem("_di"),
      };
      const res = await axios.post(
        API_HOST + API_JOIN_TOURNAMENT,
        {
          tournamentId: match._id,
          ...headers,
        },
        { headers }
      );
      //console.log(res.data);
      if (res.data.success) {
        setWorking(false);
      } else {
        toastr.error(t(res.data.message));
        setWorking(false);
      }
    } catch (error) {
      ////console.log(error);
      toastr.error(error.response ? error.response.data : error.message);
      setWorking(false);
    }
  };

  useEffect(() => {
    if (!isAuth) navigate("/login");
    fetchMatch();
    const intervalId = setInterval(() => {
      if (!busy) fetchMatch();
    }, 2000); // Runs every 1 second

    // Clean up the interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
  };
  return (
    <>
      {match && (
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
          <div
            style={{ backgroundColor: "rgba(0,0,0,0.05)" }}
            className="rounded small rounded-4 shadow-sm py-1 text-center my-2 mb-3 border fw-bold"
          >
            <FaHandHoldingHeart /> You can enter this tournament up to{" "}
            {match.totalAllowedEntriesPerUser} times
          </div>

          <div
            style={{ backgroundColor: "rgba(0,0,0,0.05)" }}
            className="rounded rounded-4 shadow-sm p-2 my-2 mb-3 border"
          >
            <div className="d-flex flex-column justify-content-between p-2 gap-2">
              {/* FIRST PRIZE */}
              <div className="d-flex align-items-center gap-2">
                <div style={{ lineHeight: "17px" }}>
                  <div style={{ fontSize: "10px", opacity: 0.7 }}>
                    PRIZE POOL
                  </div>
                  <div className="fw-bold" style={{ fontSize: "20px" }}>
                    ₹{match.firstPrize}
                  </div>
                </div>
              </div>

              <div className="">
                <div className="my-1 w-100">
                  <div
                    className="progress bg-secondary border shadow-sm "
                    style={{ height: "8px" }}
                  >
                    <div
                      className="progress-bar bg-warning"
                      style={{
                        width: `${
                          (match.totalJoined / match.totalAllowedEntries) * 100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div style={{ fontSize: "10px", opacity: 0.95 }}>
                  {match.totalJoined} / {match.totalAllowedEntries} filled
                </div>
              </div>

              {/* PRIZE POOL */}
              <div className="d-flex align-items-center gap-2">
                <div className="text-dark">
                  <FaRegPlayCircle size={20} />
                </div>
                <div style={{ lineHeight: "13px" }}>
                  <div style={{ fontSize: "9px" }}>FEE PER ENTRY</div>
                  <div className="fw-bold" style={{ fontSize: "13px" }}>
                    ₹{match.entryFee}
                  </div>
                </div>
              </div>

              {/* PRIZE POOL */}
              <div className="d-flex align-items-center gap-2">
                <div className="text-dark">
                  <FaMedal size={20} />
                </div>
                <div style={{ lineHeight: "13px" }}>
                  <div style={{ fontSize: "9px" }}>FIRST PRIZE</div>
                  <div className="fw-bold" style={{ fontSize: "13px" }}>
                    ₹{match.firstPrize}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            {match.isUserPlaying && (
              <button
                className="btn btn-warning rounded-pill w-100 fw-bold fs-4 py-1"
                style={{ fontSize: "12px" }}
                onClick={() =>
                  navigate("/play-tournament/" + match.activeMatch._id)
                }
              >
                RESUME GAME
              </button>
            )}

            {!match.isUserPlaying && (
              <Button1
                text={t("PLAY NOW")}
                working={working}
                action={jointournament}
                class="btn-success  fw-bold px-3  px-2 small rounded-5 fs-4 w-100"
              />
            )}
          </div>

          <div
            style={{ backgroundColor: "rgba(0,0,0,0.05)" }}
            className="rounded rounded-4 shadow-sm p-2 my-3 mb-3 border"
          >
            <div className="fw-bold">Prize Distribution</div>
            <table className="table">
              <tbody>
                {match.scoring.map((score) => {
                  return (
                    <tr key={score._id} className="">
                      <td className="bg-transparent">
                        Rank {score.fromRank == score.toRank && score.fromRank}
                        {score.fromRank != score.toRank &&
                          score.fromRank + "-" + score.toRank}
                      </td>
                      <td className="text-end bg-transparent">
                        ₹{score.reward}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </>
  );
};
