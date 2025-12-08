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
import axios from "axios";
import toastr from "toastr";
import { useTranslation } from "react-i18next";
import { MdVerified } from "react-icons/md";
import { FcRating } from "react-icons/fc";
import { HiUsers } from "react-icons/hi";

export const QuickLudoItem = ({ data }) => {
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
  const cancelMatch = async () => {
    try {
      setWorking(true);
      const headers = {
        "Content-Type": "application/json",
        _t: localStorage.getItem("_tk"),
        _di: localStorage.getItem("_di"),
      };
      const res = await axios.post(
        API_HOST + API_QUICK_LUDO_CANCEL,
        {
          amount: data.amount,
          ...headers,
        },
        { headers }
      );
      ////console.log(res.data);
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
  return (
    <>
      <div
        style={{ backgroundColor: "rgba(0, 0, 0,0.1)" }}
        className="rounded rounded-2 overflow-hiddenborder my-3 animate__animated animate__backInLeft animate__fast border shadow-sm border-secondary"
      >
        <div
          className="border-bottom px-2 py-1 border-2 pb-1 align-items-center d-flex justify-content-between rounded-top"
          style={{ backgroundColor: "rgba(0, 0, 0,0.15)" }}
        >
          <div className="x-small fw-bold d-flex align-items-center text-black  gap-1">
            <HiUsers />{" "}
            <span className="text-dark small d-flex gap-1 align-items-center">
              {data.playing}+
            </span>
          </div>
          <div>
            {!data.isMeWaiting && data.waiting > 0 && (
              <span className="x-small text-danger">
                {data.waiting} {t("player_is_waiting")}
              </span>
            )}

            {data.isMeWaiting && data.waiting > 0 && (
              <Button1
                action={cancelMatch}
                text={t("cancel_btn")}
                working={working}
                class="btn-danger x-small p-0 px-3 rounded-3 fw-bold"
              />
            )}
          </div>
        </div>
        <div className="px-2 d-flex justify-content-between align-items-center">
          <div className="d-flex gap-2 py-2 fw-bold">
            <div>
              <div className="x-small"> {t("entry_fee")}</div>
              <div className="d-flex align-items-center gap-1">
                <img src="assets/money.png" height="20px" />
                {data.amount}
              </div>
            </div>
            <div className="mx-3">
              <div className="x-small"> {t("prize")}</div>
              <div className="d-flex align-items-center gap-1">
                <img src="assets/reward.png" height="20px" />
                {data.prize}
              </div>
            </div>
          </div>
          <div
            className="text-center d-flex flex-column justify-content-start align-items-center"
            style={{ lineHeight: "5px" }}
          >
            {data.isMeWaiting ? (
              <Button1
                text={t("waiting")}
                working={true}
                class="btn-warning   p-1  px-2 rounded-5 small "
              />
            ) : (
              <Button1
                text={t("play_btn")}
                working={working}
                action={playmatch}
                class="btn-success  fw-bold px-3  px-2 small rounded-5"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
