import { ImYoutube } from "react-icons/im";
import { GameCard } from "../elements/GameCard";

import { InfoCard1 } from "../elements/InfoCard1";
import { InfoCard2 } from "../elements/InfoCard2";
import { useTranslation } from "react-i18next";
import { InfoCard3 } from "../elements/InfoCard3";
import {
  API_FETCH_GAMES,
  API_FETCH_LEADERBOARD,
  API_HOST,
  HOST,
} from "../../utils/constants";
import { useEffect, useState } from "react";
import toastr from "toastr";
import axios from "axios";
import { motion } from "motion/react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { MdVerified } from "react-icons/md";
import { truncateName } from "../../game/twoplayer/helpers/ActionHandler";
export const Leaderboard = () => {
  const { t } = useTranslation();
  const { isAuth } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const [players, setPlayers] = useState(null);

  const fetchLeaderborad = async () => {
    try {
      const headers = {
        "Content-Type": "application/json",
        _t: localStorage.getItem("_tk"),
        _di: localStorage.getItem("_di"),
      };
      const res = await axios.post(
        API_HOST + API_FETCH_LEADERBOARD,
        { ...headers },
        { headers }
      );
      ////console.log(res.data);
      if (res.data.success) {
        setPlayers(res.data.players);
      } else {
        toastr.error(t(res.data.message));
      }
    } catch (error) {
      ////console.log(error);
      toastr.error(error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    if (!isAuth) navigate("/login");
    fetchLeaderborad();
  }, []);

  return (
    <>
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
        {players && players.length > 2 && (
          <div className="bg-warning rounded-3 border shadow-sm my-3">
            <div className="bg-overlay p-2">
              <div className="d-flex align-items-end justify-content-around">
                {/* //user */}
                <div className="text-center position-relative">
                  <div className="d-inline d-flex justify-content-center">
                    <div
                      className="d-flex align-items-center justify-content-center"
                      style={{
                        fontSize: "15px",
                        backgroundColor: "#C62828",
                        color: "white",
                        fontWeight: "bold",
                        border: "1px solid white",
                        width: "20px",
                        height: "20px",
                        position: "absolute",
                        borderRadius: "50%",
                        marginTop: "0px",
                        marginLeft: "45px",
                      }}
                    >
                      2
                    </div>
                    <img
                      src={`assets/avatars/${players[1].profilePic}`}
                      height="60px"
                      width="60px"
                      className="rounded-circle border border-2 border-white"
                    />
                  </div>

                  <div className="fw-bold small text-dark d-flex gap-1 justify-content-center align-items-center">
                    {truncateName(players[1].name)}{" "}
                    {players[1].kyc ? (
                      <MdVerified
                        className="text-primary "
                        title="KYC Completed"
                      />
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="fw-bold text-danger fs-6">
                    ₹ {Number(players[1].totalReward).toFixed(2)}
                  </div>
                </div>
                {/* user ends */}

                {/* //user */}
                <div className="text-center position-relative">
                  <div className="d-inline d-flex justify-content-center">
                    <div
                      className="d-flex align-items-center justify-content-center"
                      style={{
                        fontSize: "15px",
                        backgroundColor: "#C62828",
                        color: "white",
                        fontWeight: "bold",
                        border: "1px solid white",
                        width: "20px",
                        height: "20px",
                        position: "absolute",
                        borderRadius: "50%",
                        marginTop: "0px",
                        marginLeft: "45px",
                      }}
                    >
                      1
                    </div>
                    <img
                      src={`assets/avatars/${players[0].profilePic}`}
                      height="80px"
                      width="80px"
                      className="rounded-circle border border-2 border-white"
                    />
                  </div>
                  <div className="fw-bold small text-dark d-flex gap-1 justify-content-center align-items-center">
                    {truncateName(players[0].name)}{" "}
                    {players[0].kyc ? (
                      <MdVerified
                        className="text-primary "
                        title="KYC Completed"
                      />
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="fw-bold text-danger fs-6">
                    ₹ {Number(players[0].totalReward).toFixed(2)}
                  </div>
                </div>
                {/* user ends */}

                {/* //user */}
                <div className="text-center position-relative">
                  <div className="d-inline d-flex justify-content-center">
                    <div
                      className="d-flex align-items-center justify-content-center"
                      style={{
                        fontSize: "15px",
                        backgroundColor: "#C62828",
                        color: "white",
                        fontWeight: "bold",
                        border: "1px solid white",
                        width: "20px",
                        height: "20px",
                        position: "absolute",
                        borderRadius: "50%",
                        marginTop: "0px",
                        marginLeft: "45px",
                      }}
                    >
                      3
                    </div>
                    <img
                      src={`assets/avatars/${players[2].profilePic}`}
                      height="60px"
                      width="60px"
                      className="rounded-circle border border-2 border-white"
                    />
                  </div>
                  <div className="fw-bold small text-dark  d-flex gap-1 align-items-center justify-content-center">
                    {truncateName(players[2].name)}
                    {players[2].kyc ? (
                      <MdVerified
                        className="text-primary "
                        title="KYC Completed"
                      />
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="fw-bold text-danger fs-6">
                    ₹ {Number(players[2].totalReward).toFixed(2)}
                  </div>
                </div>
                {/* user ends */}
              </div>
            </div>
          </div>
        )}

        {players && players.length > 3 && (
          <div>
            {/* //rank tile */}

            {players.map((player, index) => {
              if (index < 3) return;
              return (
                <div key={index} className="border rounded-1 my-3 bg-info">
                  <div className="d-flex justify-content-between p-2 bg-overlay align-items-center">
                    <div className="d-flex gap-2 align-items-center">
                      <span className="fw-bold">{index + 1}</span>
                      <img
                        src={`assets/avatars/${player.profilePic}`}
                        height="40px"
                        width="40px"
                        className="rounded-circle border border-warning"
                      />
                      <div>
                        <div className="fw-bold small text-dark d-flex gap-1 align-items-center">
                          {truncateName(player.name)}{" "}
                          {player.kyc ? (
                            <MdVerified
                              className="text-primary "
                              title="KYC Completed"
                            />
                          ) : (
                            ""
                          )}
                        </div>
                        <div className="x-small opacity-75 d-flex">
                          ********
                          {player.mobileNumber.substr(-2)}
                        </div>
                      </div>
                    </div>

                    <div className="fw-bold fs-6">
                      ₹ {Number(player.totalReward).toFixed(2)}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* rank tile end */}
          </div>
        )}

        {players && players.length < 3 && (
          <div className="p-2 text-center fs-5 opacity-75 border rounded-2 mt-3 bg-warning text-dark">
            {t("no_data_leaderboard")}
          </div>
        )}
      </motion.div>
    </>
  );
};
