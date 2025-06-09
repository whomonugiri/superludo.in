import { GiDiceSixFacesSix } from "react-icons/gi";
import Button1 from "../elements/Button1";
import { CreateMatchCard } from "../elements/CreateMatchCard";
import { useEffect, useRef, useState } from "react";
import {
  API_CREATE_MATCH,
  API_FETCH_MATCHES,
  API_HOST,
} from "../../utils/constants";
import axios from "axios";
import toastr from "toastr";
import $ from "jquery";
import { useTranslation } from "react-i18next";
import { CMatch, notify } from "../elements/CMatch";
import { OMatch } from "../elements/OMatch";
import { useDispatch, useSelector } from "react-redux";
import { updateWallet } from "../../contexts/slices/userSlice";
import { PMatch } from "../elements/PMatch";
import { RMatch } from "../elements/RMatch";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
export const CreateMatch = () => {
  const { isAuth } = useSelector((store) => store.auth);
  const [working, setWorking] = useState(false);
  const [cmatches, setCmatches] = useState([]);
  const [omatches, setOmatches] = useState([]);
  const [rmatches, setRmatches] = useState([]);
  const [fmatches, setFmatches] = useState([]);

  const [pmatch, setPmatch] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [busy, setBusy] = useState(false);
  const lastMatchData = useRef({
    cmatches: [],
    omatches: [],
    rmatches: [],
    fmatches: [],

    pmatch: null,
  });

  const playNotificationIfChanged = (newMatches) => {
    if (
      JSON.stringify(lastMatchData.current.cmatches) !==
        JSON.stringify(newMatches.cmatches) ||
      JSON.stringify(lastMatchData.current.pmatch) !==
        JSON.stringify(newMatches.pmatch)
    ) {
      notify(); // Play sound if any match data changes
    }
  };

  const createNewMatch = async () => {
    try {
      setWorking(true);
      const headers = {
        "Content-Type": "application/json",
        _t: localStorage.getItem("_tk"),
        _di: localStorage.getItem("_di"),
      };
      const res = await axios.post(
        API_HOST + API_CREATE_MATCH,
        {
          game: "classicManual",
          amount: $("#classic-manual-amount").val(),
          ...headers,
        },
        { headers }
      );

      //console.log(res.data);
      if (res.data.success) {
        $("#classic-manual-amount").val("");
      } else if (res.data.message == "gie") {
        toastr.error(
          t("game_info_1") +
            res.data.game.multipleOf +
            t("game_info_2") +
            res.data.game.maxAmount
        );
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

  const fetchMatchData = async () => {
    if (busy) return;
    try {
      setBusy(true);
      const headers = {
        "Content-Type": "application/json",
        _t: localStorage.getItem("_tk"),
        _di: localStorage.getItem("_di"),
      };
      const res = await axios.post(
        API_HOST + API_FETCH_MATCHES,
        { ...headers },
        { headers }
      );

      // //console.log(res.data);

      if (res.data.success) {
        const newMatches = {
          cmatches: res.data.matches.cmatch,
          omatches: res.data.matches.omatch,
          rmatches: res.data.matches.rmatch,
          pmatch: res.data.matches.pmatch,
          fmatches: res.data.matches.fmatch,

          // pmatch: res.data.matches.pmatch,
        };

        playNotificationIfChanged(newMatches);
        setCmatches(res.data.matches.cmatch);
        setOmatches(res.data.matches.omatch);
        setRmatches(res.data.matches.rmatch);
        setPmatch(res.data.matches.pmatch);
        setFmatches(res.data.matches.fmatch);

        lastMatchData.current = newMatches; // Store latest match data in ref

        dispatch(updateWallet(res.data.balance));
      } else {
        toastr.error(t(res.data.message));
      }

      setBusy(false);
    } catch (error) {
      //console.log(error);
      toastr.error(error.response ? error.response.data : error.message);
      setWorking(false);
      setBusy(false);
    }
  };

  useEffect(() => {
    if (!isAuth) navigate("/login");
    fetchMatchData();
    const fmd = setInterval(() => {
      if (!busy) fetchMatchData();
    }, 800);

    return () => {
      clearInterval(fmd);
    };
  }, []);

  return (
    <>
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
        {/* //creation */}
        <CreateMatchCard
          id="classic-manual-amount"
          action={createNewMatch}
          working={working}
        />
        {pmatch && <PMatch match={pmatch} />}
        {/* //active battles */}
        {(cmatches.length > 0 || omatches.length > 0) && (
          <div className="fw-bold fs-5 d-flex align-items-center gap-1">
            <img src="assets/trophy.png" height="25px" />
            {t("open_battles")}
          </div>
        )}

        {cmatches &&
          cmatches.length > 0 &&
          cmatches.map((match) => {
            return <CMatch match={match} key={match._id} />;
          })}

        {omatches &&
          omatches.length > 0 &&
          omatches.map((match) => {
            return <OMatch match={match} key={match._id} />;
          })}

        <div className="fw-bold fs-5 d-flex align-items-center gap-1 mt-2">
          <img src="assets/trophy.png" height="25px" />
          {t("running_battles")}
        </div>

        {rmatches &&
          rmatches.length > 0 &&
          rmatches.map((match) => {
            return <RMatch match={match} key={match._id} />;
          })}

        {fmatches &&
          fmatches.length > 0 &&
          fmatches.map((match) => {
            return <RMatch match={match} key={match._id} />;
          })}
      </motion.div>
    </>
  );
};
