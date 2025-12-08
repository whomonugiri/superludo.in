import { useEffect, useState } from "react";
import axios from "axios";
import toastr from "toastr";
import $ from "jquery";
import {
  API_ACCEPT_CANCEL_MATCH,
  API_FETCH_MATCH,
  API_HOST,
  API_UPDATE_ROOM_CODE,
} from "../../utils/constants";
import { Link, useNavigate } from "react-router";
import { RMatch } from "../elements/RMatch";
import { EnterRoomCard } from "../elements/EnterRoomCard";
import Button1 from "../elements/Button1";
import Button2 from "../elements/Button2";
import Button3 from "../elements/Button3";
import { Button4 } from "../elements/Button4";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
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
export const Match = () => {
  const { isAuth } = useSelector((store) => store.auth);
  const [busy, setBusy] = useState(false);
  const [match, setMatch] = useState(null);
  const [userType, setUserType] = useState(null);
  const [working, setWorking] = useState(false);
  const [time, setTime] = useState(180);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const fetchMatch = async () => {
    try {
      setBusy(true);
      const headers = {
        "Content-Type": "application/json",
        _t: localStorage.getItem("_tk"),
        _di: localStorage.getItem("_di"),
      };
      const res = await axios.post(
        API_HOST + API_FETCH_MATCH,
        { ...headers },
        { headers }
      );

      if (!res.data.match) {
        navigate("/classic-manual");
        return;
      }
      if (res.data.success) {
        if (res.data.match.conflict) {
          toastr.error(t("conflict_error"));
          navigate("/classic-manual");
        }

        setMatch(res.data.match);
        setUserType(res.data.userType);
        if (time > 0) {
          const createdAt = new Date(res.data.match.joiner.joinAt).getTime();
          const targetAt = createdAt + 3 * 60 * 1000;
          const currentAt = Date.now();

          let nt = (targetAt - currentAt) / 1000;
          nt = Math.round(nt);

          setTime(nt);
        }
      } else {
        toastr.error(t(res.data.message));
      }
      setBusy(false);
    } catch (error) {
      //console.log(error);
      toastr.error(error.response ? error.response.data : error.message);
    }
  };

  const updateRoomCode = async () => {
    try {
      setWorking(true);
      const headers = {
        "Content-Type": "application/json",
        _t: localStorage.getItem("_tk"),
        _di: localStorage.getItem("_di"),
      };
      const res = await axios.post(
        API_HOST + API_UPDATE_ROOM_CODE,
        {
          matchId: match._id,
          roomCode: $("#match-room-code").val(),
          ...headers,
        },
        { headers }
      );

      //console.log(res.data);
      if (res.data.success) {
      } else {
        toastr.error(t(res.data.message));
      }
      setWorking(false);
    } catch (error) {
      //console.log(error);
      toastr.error(error.response ? error.response.data : error.message);
      setWorking(false);
    }
  };

  const acceptCancelRequest = async () => {
    try {
      setWorking(true);
      const headers = {
        "Content-Type": "application/json",
        _t: localStorage.getItem("_tk"),
        _di: localStorage.getItem("_di"),
      };
      const res = await axios.post(
        API_HOST + API_ACCEPT_CANCEL_MATCH,
        {
          matchId: match._id,
          ...headers,
        },
        { headers }
      );

      //console.log(res.data);
      if (res.data.success) {
        toastr.success(t(res.data.message));
      } else {
        toastr.error(t(res.data.message));
        setWorking(false);
      }
    } catch (error) {
      //console.log(error);
      toastr.error(error.response ? error.response.data : error.message);
      setWorking(false);
    }
  };
  useEffect(() => {
    if (!isAuth) navigate("/login");
    fetchMatch();
    const intervalId = setInterval(() => {
      if (!busy) fetchMatch();
    }, 1000); // Runs every 1 second

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
          <div>
            <div className="d-flex justify-content-between align-items-center mt-3">
              <div className="fw-bold small text-center border rounded-2 bg-dark text-white">
                <div className="bg-overlay py-2 px-3 small">
                  {match && match.matchId}
                </div>
              </div>
              <div>
                <Link to="/classic-manual">
                  <Button1
                    icon={<FaRegArrowAltCircleLeft />}
                    text={t("back")}
                    working={false}
                  />
                </Link>
              </div>
            </div>

            {match && <RMatch match={match} />}

            {match && userType == "host" && match.roomCode == null && (
              <EnterRoomCard
                time={formatTime(time)}
                id="match-room-code"
                working={working}
                action={updateRoomCode}
              />
            )}

            {match && userType == "joiner" && match.roomCode == null && (
              <WaitingRoomCard
                time={formatTime(time)}
                id="match-room-code"
                working={working}
                action={updateRoomCode}
              />
            )}

            {match && match.roomCode != null && (
              <div>
                <CopyToClipboard
                  text={match.roomCode}
                  onCopy={() => {
                    toastr.success(t("room_copied_msg"));
                  }}
                >
                  <div className="border rounded-3 border border-primary p-2  my-3 alert alert-primary d-flex justify-content-between flex-column align-items-center">
                    <div className="mx-2">
                      <div className="small text-center fw-bold text-dark">
                        {t("room_code")}
                      </div>
                      <div className="fw-bold fs-1">{match.roomCode}</div>
                    </div>
                    <div className="mx-1">
                      <button className=" border-0 bg-primary rounded-3 text-white small fw-bold py-1 px-3">
                        {t("copy_room_code")}
                      </button>
                    </div>
                  </div>
                </CopyToClipboard>

                {match[userType].result == null && (
                  <div className="d-flex justify-content-between gap-2 my-3">
                    <IWon match={match} />
                    <ILost match={match} />
                  </div>
                )}
              </div>
            )}

            {match &&
              !match.cancellationRequested.req &&
              match[userType].result == null && <ReqCancel match={match} />}

            {match && match[userType].result != null && (
              <div className="alert alert-success fw-bold text-center py-2">
                {t("result_posted")}: {t(match[userType].result)}
              </div>
            )}

            {match &&
              match.cancellationRequested.req &&
              match.cancellationRequested.by == userType && (
                <div className="small alert alert-warning text-center fw-bold p-1 border-warning py-2">
                  {t("cancel_req_posted")}{" "}
                </div>
              )}

            {match &&
              match.cancellationRequested.req &&
              match.cancellationRequested.by != userType && (
                <div className="small alert alert-danger fw-bold p-1 border-warning px-3 py-2 d-flex justify-content-between align-items-center animate__animated animate__infinite	infinite animate__pulse">
                  {t("cancel_req_get")}
                  <div>
                    {" "}
                    <Button1
                      text={t("accept")}
                      action={acceptCancelRequest}
                      working={working}
                      class="fw-bold btn-danger"
                    />
                  </div>
                </div>
              )}
          </div>
        </motion.div>
      )}
    </>
  );
};
