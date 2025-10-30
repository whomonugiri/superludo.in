import axios from "axios";
import { HOST } from "./constants";
import toastr from "toastr";
const axiosInstantce = axios.create({
  baseURL: HOST,
});

export const base = (url) => {
  return HOST + "/api/v1/admin" + url;
};

export function maskMobile(text) {
  return text;
  return text.replace(/\b\d{5}(\d{5})\b/g, "*****$1");
}

export const fetcher = (url, cond, page, setPage, setData, clean = false) => {
  if (page > 10) return;
  const data = {};
  data._token = localStorage.getItem("_token");
  data._deviceId = localStorage.getItem("_deviceId");
  data.page = page;
  data.cond = cond;
  //console.log(page, clean);
  axios
    .post(base(url), data)
    .then(function (response) {
      //console.log("response : ", response.data);
      if (response.data.success) {
        if (response.data.data.length > 0) {
          setData((oldData) => [...oldData, ...response.data.data]);
          setPage((oldPage) => page + 1);
        }
      } else {
        toastr.error(response.data.message);
      }
    })
    .catch(function (error) {
      toastr.error(error.response ? error.response.data : error.message);
    });
};

export const chatfetcher = (userId, page, setPage, setData, setDone) => {
  const data = {};
  data._token = localStorage.getItem("_token");
  data._deviceId = localStorage.getItem("_deviceId");
  data.page = page;
  data.userId = userId;

  axios
    .post(base("/fetchChats"), data)
    .then(function (response) {
      //console.log("response : ", response.data);
      if (response.data.success) {
        if (response.data.data.length > 0) {
          setData((oldData) => [...response.data.data, ...oldData]);
          setPage((oldPage) => page + 1);
          console.log("loading...");
        } else {
          console.log("loadig done");

          setDone();
        }
      } else {
        toastr.error(response.data.message);
      }
    })
    .catch(function (error) {
      toastr.error(error.response ? error.response.data : error.message);
    });
};

export const singleFetcher = (url, cond, setData, handleFailure) => {
  const data = {};
  data._token = localStorage.getItem("_token");
  data._deviceId = localStorage.getItem("_deviceId");
  data.cond = cond;
  axios
    .post(base(url), data)
    .then(function (response) {
      //console.log("response : ", response.data);
      if (response.data.success) {
        if (response.data.data) {
          setData(response.data.data);
        }

        if (response.data.message) {
          toastr.success(response.data.message);
        }
      } else {
        toastr.error(response.data.message);
        handleFailure();
      }
    })
    .catch(function (error) {
      toastr.error(error.response ? error.response.data : error.message);
      handleFailure();
    });
};

export const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);

  // Format date as "01 Jan 2024"
  const optionsDate = { day: "2-digit", month: "short", year: "numeric" };
  const formattedDate = date.toLocaleDateString("en-IN", optionsDate);

  // Format time as "4:32 pm"
  const optionsTime = { hour: "numeric", minute: "2-digit", hour12: true };
  const formattedTime = date.toLocaleTimeString("en-IN", optionsTime);

  return `${formattedDate}, ${formattedTime}`;
};

export function transformGameData(gameData) {
  return {
    roomCode: gameData.code,
    createdAt: gameData.createdAt,
    endedAt: gameData.endedAt,
    winner: gameData.winner,
    looser: gameData.looser,
    amount: gameData.amount,

    data: gameData.data.map((player) => ({
      fullName: player.fullName,
      gotiWin: player.winners,
      life: player.life,
      color: player.color,
      playerExited: player.exit ? true : false,
      score: player.score,
      players: player.players.map((goti) => ({
        gotiNo: goti.index,
        position: goti.currentPos,
        score: goti.score,
      })),
    })),
  };
}
