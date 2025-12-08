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
import { FaRegCircleDot, FaTelegram, FaYoutube } from "react-icons/fa6";
const Homepage = () => {
  const { t, i18n } = useTranslation();
  const { textData, youtubeVideoLink, _y } = useSelector((store) => store.auth);

  const [games, setGames] = useState(null);

  const fetchGames = async () => {
    try {
      const res = await axios.post(API_HOST + API_FETCH_GAMES);
      //////console.log(res.data);
      if (res.data.success) {
        setGames(res.data.games);
      } else {
        toastr.error(t(res.data.message));
      }
    } catch (error) {
      //////console.log(error);
      toastr.error(error.response ? error.response.data : error.message);
    }
  };

  const gamemode = {
    classicManual: "classic-manual",
    classicOnline: "classic-online",
    speedOnline: "speedludo",
    quickOnline: "quickludo",
  };

  useEffect(() => {
    fetchGames();
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
                i18n.language == "hindi" ? "hindi" : "english"
              ]
            }
          />
        </div>
        <div></div>
        <div className="d-flex flex-wrap justify-content-center">
          {games &&
            games.map((game, index) => {
              if (game.game == "classicManual" || game.game == "classic1Token") {
                return null;
              }
              return (
                <GameCard
                  game={game.game}
                  key={"k" + index}
                  title={game.title}
                  path={gamemode[game.game]}
                  banner={"assets/" + game.banner + "?v=1235"}
                  status={game.status}
                  full={game.full}
                />
              );
            })}
        </div>
        <br />
        <a
          href={youtubeVideoLink}
          target="_blank"
          className="text-decoration-none text-white"
        >
          <div className="animate__animated animate__pulse animate__infinite animate__slower d-flex rounded  p-2 gap-2 align-items-center border mb-3 bg-danger">
            <FaYoutube className="display-2 text-white" />

            <div>
              <div className="small fw-bold">LEARN HOW TO PLAY ?</div>
              <div className="small">How To Play Games In Super Ludo ?</div>
            </div>
          </div>
        </a>
      </motion.div>
    </>
  );
};

export default Homepage;
