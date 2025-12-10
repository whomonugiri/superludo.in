import { useState } from "react";
import Button1 from "./Button1";
import {
  API_CANCEL_MATCH,
  API_CLASSIC_ONLINE_CANCEL,
  API_CLASSIC_ONLINE_PLAY,
  API_HOST,
  API_QUICK_LUDO_CANCEL,
  API_QUICK_LUDO_PLAY,
  API_SPEED_LUDO_CANCEL,
  API_SPEED_LUDO_PLAY,
} from "../../utils/constants";
import { AiFillLike } from "react-icons/ai";

import axios from "axios";
import toastr from "toastr";
import { useTranslation } from "react-i18next";
import { MdVerified } from "react-icons/md";
import { FcRating } from "react-icons/fc";
import { HiUsers } from "react-icons/hi";
import { FaMedal } from "react-icons/fa6";
import { GrTrophy } from "react-icons/gr";
import { useNavigate } from "react-router";

export const TournamentItem = ({ data }) => {
  const [working, setWorking] = useState(false);
  const { t } = useTranslation();

  const playmatch = async () => {
    try {
      setWorking(true);
      const headers = {
        "Content-Type": "application/json",
        _t: localStorage.getItem("_tk"),
        _di: localStorage.getItem("_di"),
      };
      const res = await axios.post(
        API_HOST + API_QUICK_LUDO_PLAY,
        {
          amount: data.amount,
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

  const navigate = useNavigate();

  return (
    <>
      <div
        className="d-flex rounded-3 overflow-hidden my-3 animate__animated animate__backInLeft animate__fast border shadow-sm border-secondary"
        style={{ maxWidth: "380px", margin: "auto" }}
      >
        {/* LEFT SIDE */}
        <div className="bg-warning d-flex flex-column justify-content-between col-6 p-2 gap-2">
          {/* FIRST PRIZE */}
          <div className="d-flex align-items-center gap-2">
            <div
              className="bg-dark rounded-circle d-flex align-items-center justify-content-center text-warning opacity-75"
              style={{ width: "26px", height: "26px" }}
            >
              <FaMedal size={14} />
            </div>
            <div style={{ lineHeight: "13px" }}>
              <div style={{ fontSize: "9px", opacity: 0.7 }}>FIRST PRIZE</div>
              <div className="fw-bold" style={{ fontSize: "13px" }}>
                ₹{data.firstPrize}
              </div>
            </div>
          </div>

          {/* PRIZE POOL */}
          <div className="d-flex align-items-center gap-2">
            <div
              className="bg-dark rounded-circle d-flex align-items-center justify-content-center text-warning opacity-75"
              style={{ width: "26px", height: "26px" }}
            >
              <GrTrophy size={14} />
            </div>
            <div style={{ lineHeight: "13px" }}>
              <div style={{ fontSize: "9px", opacity: 0.7 }}>PRIZE POOL</div>
              <div className="fw-bold" style={{ fontSize: "13px" }}>
                ₹{data.prizePool}
              </div>
            </div>
          </div>

          {/* ASSURED WINNERS */}
          <div className="d-flex align-items-center gap-2">
            <div
              className="bg-dark rounded-circle d-flex align-items-center justify-content-center text-warning opacity-75"
              style={{ width: "26px", height: "26px" }}
            >
              <AiFillLike size={14} />
            </div>
            <div style={{ lineHeight: "13px" }}>
              <div style={{ fontSize: "9px", opacity: 0.7 }}>
                ASSURED WINNERS
              </div>
              <div className="fw-bold" style={{ fontSize: "13px" }}>
                {data.assuredWinners}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="col-6 p-2 d-flex flex-column justify-content-between">
          {/* ENTRIES */}
          <div>
            <div
              className="small fw-bold text-center "
              style={{ fontSize: "9px", fontWeight: 500, opacity: 0.8 }}
            >
              {data.name}
            </div>
            <div
              className="text-center"
              style={{ fontSize: "9px", fontWeight: 500, opacity: 0.8 }}
            >
              TOURNAMENT ENTRIES
            </div>

            <div className="my-1">
              <div
                className="progress bg-secondary border shadow-sm"
                style={{ height: "8px" }}
              >
                <div
                  className="progress-bar bg-warning"
                  style={{
                    width: `${
                      (data.totalJoined / data.totalAllowedEntries) * 100
                    }%`,
                  }}
                ></div>
              </div>
            </div>

            <div style={{ fontSize: "9px", opacity: 0.8 }}>
              {data.totalJoined} / {data.totalAllowedEntries} filled
            </div>
          </div>

          {/* ENTRY BUTTON */}
          <div>
            <div
              className="text-center"
              style={{ fontSize: "9px", opacity: 0.8 }}
            >
              ENTRY
            </div>

            {data.isUserPlaying && (
              <button
                className="btn btn-warning rounded-pill w-100 fw-bold py-1"
                style={{ fontSize: "12px" }}
                onClick={() => navigate("/open-tournament/" + data._id)}
              >
                RESUME GAME
              </button>
            )}

            {!data.isUserPlaying && (
              <button
                className="btn btn-success rounded-pill w-100 fw-bold py-1"
                style={{ fontSize: "12px" }}
                onClick={() => navigate("/open-tournament/" + data._id)}
              >
                ₹{data.entryFee}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
