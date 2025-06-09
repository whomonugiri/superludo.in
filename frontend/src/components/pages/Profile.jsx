import { ImYoutube } from "react-icons/im";
import { GameCard } from "../elements/GameCard";

import { InfoCard1 } from "../elements/InfoCard1";
import { InfoCard2 } from "../elements/InfoCard2";
import { useTranslation } from "react-i18next";
import { InfoCard3 } from "../elements/InfoCard3";
import {
  API_FETCH_GAMES,
  API_FETCH_LEADERBOARD,
  API_FETCH_ME,
  API_HOST,
  API_UPDATE_ME,
  HOST,
} from "../../utils/constants";
import { useEffect, useState } from "react";
import toastr from "toastr";
import axios from "axios";
import { motion } from "motion/react";
import { FaEdit, FaMobileAlt, FaRegUser } from "react-icons/fa";
import { Input1 } from "../elements/Input1";
import { MdCall, MdVerified, MdOutlineVerified, MdShare } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Button1 from "../elements/Button1";
import $ from "jquery";
import { Input12 } from "../elements/Input12";
import { logout, updateMe } from "../../contexts/slices/authSlice";
import { IoCallSharp, IoFingerPrint } from "react-icons/io5";
import { Card } from "../elements/Card";
import { GiInvertedDice6 } from "react-icons/gi";
import { KYCManager } from "../elements/KYCManager";
import { useNavigate } from "react-router";

export const Profile = () => {
  const { t } = useTranslation();
  const [working, setWorking] = useState(false);
  const { isAuth, mobileNumber, profile, fullName, kyc } = useSelector(
    (store) => store.auth
  );

  const navigate = useNavigate();
  const [avt, setAvt] = useState(profile);
  const [players, setPlayers] = useState(null);
  const dispatch = useDispatch();
  const [me, setMe] = useState(null);

  const fetchMe = async () => {
    try {
      const headers = {
        "Content-Type": "application/json",
        _t: localStorage.getItem("_tk"),
        _di: localStorage.getItem("_di"),
      };
      const res = await axios.post(
        API_HOST + API_FETCH_ME,
        { ...headers },
        { headers }
      );
      //console.log(res.data);
      if (res.data.success) {
        setMe(res.data.stat);
      } else {
        toastr.error(t(res.data.message));
      }
    } catch (error) {
      //console.log(error);
      toastr.error(error.response ? error.response.data : error.message);
    }
  };

  const updateProfile = async (profile) => {
    try {
      const headers = {
        "Content-Type": "application/json",
        _t: localStorage.getItem("_tk"),
        _di: localStorage.getItem("_di"),
      };
      const data = {
        profilePic: profile,
        ...headers,
      };

      //console.log(data);
      const res = await axios.post(API_HOST + API_UPDATE_ME, data, { headers });
      //console.log(res.data);
      if (res.data.success) {
        $(".cancelcanvas").trigger("click");
        dispatch(updateMe(data));
        toastr.success(t(res.data.message));
      } else {
        toastr.error(t(res.data.message));
      }
    } catch (error) {
      //console.log(error);
      toastr.error(error.response ? error.response.data : error.message);
    }
  };

  const updateName = async () => {
    try {
      setWorking(true);
      const headers = {
        "Content-Type": "application/json",
        _t: localStorage.getItem("_tk"),
        _di: localStorage.getItem("_di"),
      };
      const data = {
        fullName: $("#profile_full_name").val(),
        ...headers,
      };

      //console.log(data);
      const res = await axios.post(API_HOST + API_UPDATE_ME, data, { headers });
      //console.log(res.data);
      setWorking(false);
      if (res.data.success) {
        $(".cancelcanvas").trigger("click");
        dispatch(updateMe(data));
        toastr.success(t(res.data.message));
      } else {
        toastr.error(t(res.data.message));
      }
    } catch (error) {
      //console.log(error);
      toastr.error(error.response ? error.response.data : error.message);
      setWorking(false);
    }
  };
  const avatars = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];

  useEffect(() => {
    if (!isAuth) navigate("/login");
    fetchMe();
  }, []);

  return (
    <>
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
        <div className="d-flex align-items-end justify-content-around my-3">
          {/* //user */}
          <div
            className="text-center position-relative"
            data-bs-toggle="offcanvas"
            data-bs-target="#avatars"
          >
            <div
              className="d-flex align-items-center justify-content-center bg-primary"
              style={{
                fontSize: "15px",

                color: "white",
                fontWeight: "bold",
                border: "1px solid white",
                width: "25px",
                height: "25px",
                position: "absolute",
                borderRadius: "50%",
                marginTop: "0px",
                right: "0px",
                bottom: "0px",
              }}
            >
              <FaEdit />
            </div>
            <img
              src={`assets/avatars/${profile}`}
              height="80px"
              width="80px"
              className="rounded-circle border border-2 border-primary"
            />
          </div>

          <div
            className="offcanvas offcanvas-bottom h-50"
            tabIndex="-1"
            id="avatars"
            aria-labelledby="offcanvasBottomLabel"
          >
            <div className="offcanvas-header pb-0">
              <button
                type="button"
                className="btn-close cancelcanvas"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              {/* //avatars/ */}

              <div className="fw-bold text-center">Select Avatar</div>
              <div className="d-flex gap-3 justify-content-center flex-wrap my-4">
                {avatars.map((avatar) => {
                  return (
                    <img
                      key={avatar}
                      src={`assets/avatars/avatar${avatar}.png`}
                      className="rounded rounded-circle border border-dark border-2"
                      onClick={() => {
                        updateProfile("avatar" + avatar + ".png");
                      }}
                      height="55px"
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {kyc && (
          <div>
            <div className="fw-bold d-flex gap-1 justify-content-center mb-3 align-items-center">
              {fullName}{" "}
              {kyc ? (
                <MdVerified className="text-primary " title="KYC Completed" />
              ) : (
                ""
              )}
            </div>
          </div>
        )}

        {true && (
          <div>
            <Input12
              value={fullName}
              icon={<FaRegUser />}
              label={t("full_name_label")}
              id="profile_full_name"
              type="text"
              btn={t("update_btn")}
              working={working}
              action={updateName}
            />
          </div>
        )}

        <div className="bg-primary rounded rounded-3 shadow-sm border">
          <div className="bg-overlay p-2">
            <div className="d-flex justify-content-between align-items-center fw-bold text-white">
              <div className="d-flex align-items-center gap-1">
                <FaMobileAlt /> {t("mobile_number_label")}{" "}
              </div>
              <div>{mobileNumber} </div>
            </div>

            <div className="border border-white border-1 my-3 opacity-75"></div>

            <div className="d-flex justify-content-between align-items-center fw-bold text-white">
              <div className="d-flex align-items-center gap-1">
                <IoFingerPrint />
                {t("aadhar_kyc")}
              </div>
              <div>
                {kyc && (
                  <button
                    className="btn  btn-sm btn-warning fw-bold d-flex align-items-center gap-1"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#kyc"
                  >
                    <MdOutlineVerified className="fs-5" />
                    {t("verified_kyc")}
                  </button>
                )}
                {!kyc && (
                  <button
                    className="btn  btn-sm btn-dark fw-bold"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#kyc"
                  >
                    {t("submit_kyc_btn")}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* //popup for KYC */}
        <div
          className="offcanvas offcanvas-bottom h-50  "
          tabIndex="-1"
          id="kyc"
          aria-labelledby="offcanvasBottomLabel"
        >
          <div className="offcanvas-header pb-0 bg-primary-light">
            <button
              type="button"
              className="btn-close cancelcanvas"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body bg-primary-light">
            {/* //avatars/ */}

            <div className="fw-bold text-center"></div>
            <KYCManager />
          </div>
        </div>
        {/* //popend */}

        {me && (
          <Card>
            <div className="text-center fw-bold border-bottom">
              {t("player_stats")}
            </div>
            <div className="d-flex flex-column gap-1 mt-3">
              {/* <div className="d-flex justify-content-between align-items-center fw-bold small">
                <span>{t("game_played")}</span>
                <span className="text-primary">{me.playedMatch}</span>
              </div> */}

              <div className="d-flex justify-content-between align-items-center fw-bold small">
                <span>{t("game_won")}</span>
                <span className="text-primary">{me.wonMatch}</span>
              </div>

              {/* <div className="d-flex justify-content-between align-items-center fw-bold small">
                <span>{t("game_lost")}</span>
                <span className="text-primary">{me.lostMatch}</span>
              </div> */}

              <div className="d-flex justify-content-between align-items-center fw-bold small">
                <span>{t("winning_earnings")}</span>
                <span className="text-primary">
                  ₹ {Number(me.totalEarnings).toFixed(2)}
                </span>
              </div>

              <div className="d-flex justify-content-between align-items-center fw-bold small">
                <span>{t("referral_earnings")}</span>
                <span className="text-primary">
                  ₹ {Number(me.refEarnings).toFixed(2)}
                </span>
              </div>

              <div className="d-flex justify-content-between align-items-center fw-bold small">
                <span>{t("referred_users")}</span>
                <span className="text-primary"> {me.referredUsers}</span>
              </div>
            </div>
          </Card>
        )}

        <Button1
          text={t("logout_btn").toUpperCase()}
          action={() => {
            dispatch(logout());
            toastr.success(t("logout_success"));
            navigate("/login");
          }}
          class="fw-bold btn-danger w-100"
          working={false}
        />
      </motion.div>
    </>
  );
};
