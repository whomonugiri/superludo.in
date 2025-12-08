import Button1 from "./Button1";
import axios from "axios";
import toastr from "toastr";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { API_HOST, API_JOIN_MATCH } from "../../utils/constants";
import { MdVerified } from "react-icons/md";

export const OMatch = ({ match }) => {
  const [working, setWorking] = useState(false);
  const [working2, setWorking2] = useState(false);

  const { t } = useTranslation();
  const joinMatch = async () => {
    try {
      setWorking(true);
      const headers = {
        "Content-Type": "application/json",
        _t: localStorage.getItem("_tk"),
        _di: localStorage.getItem("_di"),
      };
      const res = await axios.post(
        API_HOST + API_JOIN_MATCH + "Req",
        {
          matchId: match._id,
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
      //console.log(error);
      toastr.error(error.response ? error.response.data : error.message);
      setWorking(false);
    }
  };

  const cancelJoin = async () => {
    try {
      setWorking2(true);
      const headers = {
        "Content-Type": "application/json",
        _t: localStorage.getItem("_tk"),
        _di: localStorage.getItem("_di"),
      };
      const res = await axios.post(
        API_HOST + API_JOIN_MATCH + "Cancel",
        {
          matchId: match._id,
          ...headers,
        },
        { headers }
      );

      //console.log(res.data);
      if (res.data.success) {
        setWorking2(false);
      } else {
        toastr.error(t(res.data.message));
        setWorking2(false);
      }
    } catch (error) {
      //console.log(error);
      toastr.error(error.response ? error.response.data : error.message);
      setWorking2(false);
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
            {match.requested && (
              <Button1
                text={t("cancel_btn")}
                working={working2}
                action={cancelJoin}
                class="btn-danger fw-bold p-0 px-2 x-small"
              />
            )}
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
          <div>
            {match.requested == true ? (
              <Button1
                text={t("requested")}
                working={false}
                class="fw-bold btn-dark  opacity-75"
              />
            ) : (
              <Button1
                text={t("play")}
                action={joinMatch}
                working={working}
                class="fw-bold btn-primary"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
