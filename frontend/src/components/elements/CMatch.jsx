import { useEffect, useState } from "react";
import Button1 from "./Button1";
import {
  API_CANCEL_MATCH,
  API_HOST,
  API_JOIN_MATCH,
} from "../../utils/constants";
import axios from "axios";
import toastr from "toastr";
import { useTranslation } from "react-i18next";
import { MdVerified } from "react-icons/md";
import { motion } from "motion/react";

export const notify = () => {
  const audio = new Audio("/assets/not.mp3"); // Replace with your actual sound file path
  audio.play();
};
export const CMatch = ({ match }) => {
  const [working, setWorking] = useState(false);
  const [working2, setWorking2] = useState(false);
  const [working3, setWorking3] = useState(false);

  const { t } = useTranslation();

  const joinMatch = async (joinerId) => {
    try {
      setWorking2(true);
      const headers = {
        "Content-Type": "application/json",
        _t: localStorage.getItem("_tk"),
        _di: localStorage.getItem("_di"),
      };
      const res = await axios.post(
        API_HOST + API_JOIN_MATCH,
        {
          matchId: match._id,
          joinerId: joinerId,
          ...headers,
        },
        { headers }
      );

      ////console.log(res.data);
      if (res.data.success) {
        setWorking2(false);
      } else {
        toastr.error(t(res.data.message));
        setWorking2(false);
      }
    } catch (error) {
      ////console.log(error);
      toastr.error(error.response ? error.response.data : error.message);
      setWorking2(false);
    }
  };

  const cancelJoin = async (joinerId) => {
    try {
      setWorking3(true);
      const headers = {
        "Content-Type": "application/json",
        _t: localStorage.getItem("_tk"),
        _di: localStorage.getItem("_di"),
      };
      const res = await axios.post(
        API_HOST + API_JOIN_MATCH + "Cancel",
        {
          matchId: match._id,
          joinerId: joinerId,
          ...headers,
        },
        { headers }
      );

      ////console.log(res.data);
      if (res.data.success) {
        setWorking3(false);
      } else {
        toastr.error(t(res.data.message));
        setWorking3(false);
      }
    } catch (error) {
      ////console.log(error);
      toastr.error(error.response ? error.response.data : error.message);
      setWorking3(false);
    }
  };

  const cancelMatch = async () => {
    try {
      setWorking(true);
      const headers = {
        "Content-Type": "application/json",
        _t: localStorage.getItem("_tk"),
        _di: localStorage.getItem("_di"),
      };
      const res = await axios.post(
        API_HOST + API_CANCEL_MATCH,
        {
          matchId: match._id,
          ...headers,
        },
        { headers }
      );

      ////console.log(res.data);
      if (res.data.success) {
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

  return (
    <>
      <div className="p-1 px-2 rounded-2 bg-primary-light border my-3 animate__animated animate__backInLeft animate__fast">
        <div className="border-bottom border-2 py-1 d-flex justify-content-between">
          <div className="x-small fw-bold d-flex align-items-center gap-1">
            {t("challenge_from")}{" "}
            <span className="text-primary d-flex gap-1 align-items-center">
              {match.hostData.fullName}{" "}
              {match.hostData.kyc ? (
                <MdVerified className="text-primary" title="KYC Completed" />
              ) : (
                ""
              )}
            </span>
          </div>
          <div>
            <Button1
              text={t("cancel_btn")}
              working={working}
              action={cancelMatch}
              class="btn-danger fw-bold p-0 px-2 x-small"
            />
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex gap-4 py-2 fw-bold">
            <div>
              <div className="x-small"> {t("entry_fee")}</div>
              <div className="d-flex align-items-center gap-1">
                <img src="assets/money2.png" height="20px" />
                {match.entryFee}
              </div>
            </div>
            <div>
              <div className="x-small"> {t("prize")}</div>
              <div className="d-flex align-items-center gap-1">
                <img src="assets/money2.png" height="20px" />
                {match.prize}
              </div>
            </div>
          </div>
          <div
            className="text-center d-flex flex-column justify-content-start align-items-center"
            style={{ lineHeight: "5px" }}
          >
            <img src="assets/loading2.svg" height="35px" />
            <div className="x-small fw-bold"> {t("finding_player")}</div>
          </div>
        </div>

        {match.joinerReqs &&
          match.joinerReqs.map((req) => {
            return (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                key={req.userId}
                className="border-top py-1 d-flex justify-content-between align-items-center"
              >
                <div className="text-primary x-small fw-bold ">{req.name}</div>

                <div className="d-flex gap-1">
                  <Button1
                    text={t("accept_btn")}
                    action={() => {
                      joinMatch(req.userId);
                    }}
                    working={working2}
                    class="btn-success fw-bold p-0 x-small px-1"
                  />
                  <Button1
                    text={t("reject_btn")}
                    working={working3}
                    action={() => {
                      cancelJoin(req.userId);
                    }}
                    class="btn-danger fw-bold p-0 x-small px-1"
                  />
                </div>
              </motion.div>
            );
          })}
        <div></div>
      </div>
    </>
  );
};
