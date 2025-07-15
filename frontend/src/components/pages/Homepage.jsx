import { ImYoutube } from "react-icons/im";
import { GameCard } from "../elements/GameCard";
import { InfoCard1 } from "../elements/InfoCard1";
import { InfoCard2 } from "../elements/InfoCard2";
import { Trans, useTranslation } from "react-i18next";
import { InfoCard3 } from "../elements/InfoCard3";
import { API_FETCH_GAMES, API_HOST, HOST } from "../../utils/constants";
import { useEffect, useState } from "react";
import toastr from "toastr";
import axios from "axios";
import { motion } from "motion/react";
import { useSelector } from "react-redux";
import AudioRecorder from "../elements/AudioRecorder";
import { FaRegCircleDot } from "react-icons/fa6";
import { Link } from "react-router";

const Homepage = () => {
  const { t, i18n } = useTranslation();
  const { textData, youtubeVideoLink } = useSelector((store) => store.auth);

  const [games, setGames] = useState(null);

  const fetchGames = async () => {
    try {
      const res = await axios.post(API_HOST + API_FETCH_GAMES);
      if (res.data.success) {
        setGames(res.data.games);
      } else {
        toastr.error(t(res.data.message));
      }
    } catch (error) {
      toastr.error(error.response ? error.response.data : error.message);
    }
  };

  const gamemode = {
    classicManual: "classic-manual",
    classicOnline: "classic-online",
    speedOnline: "speedludo",
  };

  useEffect(() => {
    fetchGames();
    const interval = setInterval(() => {
      const btn = document.getElementById("nb");
      if (btn) {
        btn.click();
      }
    }, 3000);

    // 🔁 Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="mt-3">
          <InfoCard2
            text={
              textData &&
              textData["Homepage Top Banner"] &&
              textData["Homepage Top Banner"][
                i18n.language === "hindi" ? "hindi" : "english"
              ]
            }
          />
        </div>

        <div>
          <a
            href={youtubeVideoLink}
            target="_blank"
            className="text-decoration-none text-dark"
          >
            <div className="d-flex rounded p-2 gap-2 align-items-center border border-dark mb-3">
              <img src="assets/yt.png?" style={{ height: "40px" }} />
              <div>
                <div className="small fw-bold">
                  {t("homepage_yt_card_title")}
                </div>
                <div className="small">{t("homepage_yt_card_subtitle")}</div>
              </div>
            </div>
          </a>
        </div>

        {/* Game Cards (Speed Ludo, Classic Ludo, etc.) */}
        <div className="d-flex flex-wrap justify-content-center">
          {games &&
            games.map((game, index) => {
              if (!index) return;
              return (
                <GameCard
                  game={game.game}
                  key={"k" + index}
                  title={game.title}
                  path={gamemode[game.game]}
                  banner={"assets/" + game.banner}
                  status={game.status}
                  full={false}
                />
              );
            })}

          {/* //xox */}
          <div className={`col-6 p-1 col-12`}>
            <Link to={""} className={`text-decoration-none`}>
              <div className="">
                <div
                  style={{ fontSize: "10px" }}
                  className={`mb-1 text-danger animate__slow animate__animated text-dark animate__flash animate__infinite text-decoration-none`}
                >
                  <div>
                    <FaRegCircleDot /> Coming Soon
                  </div>
                </div>

                <img
                  src={"/assets/snake.png" + "?v"}
                  className={`w-100 rounded border border-warning border-3  text-dark opacity-50`}
                />
              </div>
            </Link>
          </div>
          {/* /xox */}
        </div>

        {/* Auto-Sliding Image Carousel Below the Games Section */}
        <div className="mt-1">
          <div id="carouselExample" className="carousel slide">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <a
                  href="https://superludo.in/profile"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="assets/1.png"
                    className="d-block w-100"
                    alt="Ludo League"
                  />
                </a>
              </div>
              <div className="carousel-item">
                <a
                  href="https://superludo.in/refer"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="assets/2.png"
                    className="d-block w-100"
                    alt="Classic Ludo"
                  />
                </a>
              </div>
              <div className="carousel-item">
                <a
                  href="https://superludo.in/withdraw"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="assets/3.png"
                    className="d-block w-100"
                    alt="1 Token Ludo"
                  />
                </a>
              </div>
              <div className="carousel-item">
                <a
                  href="https://superludo.in/chat"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="assets/4.png"
                    className="d-block w-100"
                    alt="1 Token Ludo"
                  />
                </a>
              </div>
              <div className="carousel-item">
                <a
                  href="https://superludo.in"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="assets/5.png"
                    className="d-block w-100"
                    alt="1 Token Ludo"
                  />
                </a>
              </div>
            </div>

            {/* Carousel Controls */}
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExample"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExample"
              data-bs-slide="next"
              id="nb"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>

        {/*<br />
        <InfoCard3
          title={t("homepage_warning_title")}
          text={<Trans i18nKey="homepage_warning_text" />}
          subtitle={t("homepage_warning_subtitle")}
        /> */}
      </motion.div>{" "}
      {/* Close motion.div properly */}
    </>
  );
};

export default Homepage;
