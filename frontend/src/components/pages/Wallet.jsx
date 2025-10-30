import { useTranslation } from "react-i18next";
import Button1 from "../elements/Button1";
import { WalletInfo } from "../elements/WalletInfo";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import toastr from "toastr";
import axios from "axios";
import { API_FETCH_BALANCE, API_HOST } from "../../utils/constants";
import { updateWallet } from "../../contexts/slices/userSlice";
import { motion } from "motion/react";
export const Wallet = () => {
  const { t } = useTranslation();

  const { isAuth, token, deviceId } = useSelector((store) => store.auth);
  const { cash, bonus, reward } = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchBalance = async () => {
    try {
      const headers = {
        "Content-Type": "application/json",
        _t: localStorage.getItem("_tk"),
        _di: localStorage.getItem("_di"),
      };
      const res = await axios.post(
        API_HOST + API_FETCH_BALANCE,
        { ...headers },
        { headers }
      );
      //console.log(res.data);
      if (res.data.success) {
        dispatch(updateWallet(res.data));
      } else {
        toastr.error(t(res.data.message));
      }
    } catch (error) {
      //console.log(error);
      toastr.error(error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    if (!isAuth) navigate("/login");
    fetchBalance();
  }, []);
  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <WalletInfo
          title={t("cash_wallet_title")}
          btnText={t("cash_wallet_btn")}
          path="/deposit"
          amount={cash}
          info={t("cash_wallet_info")}
          class="bg-dark"
        />

        <WalletInfo
          title={t("bonus_wallet_title")}
          amount={bonus}
          info={t("bonus_wallet_info")}
          class="bg-dark"
        />

        <WalletInfo
          title={t("reward_wallet_title")}
          btnText={t("reward_wallet_btn")}
          path="/withdraw"
          amount={reward}
          info={t("reward_wallet_info")}
          class="bg-primary"
        />
      </motion.div>
    </>
  );
};
