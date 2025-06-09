import { use } from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_FETCH_TXNS, API_HOST } from "../../utils/constants";
import toastr from "toastr";
import axios from "axios";
import { useNavigate } from "react-router";
import { updateWallet } from "../../contexts/slices/userSlice";
import { CiCloudDrizzle } from "react-icons/ci";
import { CgDebug } from "react-icons/cg";
import { NoData } from "../elements/NoData";
import { useTranslation } from "react-i18next";
import { Txn } from "../elements/Txn";
import { Button4 } from "../elements/Button4";
import Button1 from "../elements/Button1";
import Button6 from "../elements/Button6";
import { motion } from "motion/react";
export const Transactions = () => {
  const { isAuth } = useSelector((store) => store.auth);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [ctg, setCtg] = useState("ALL");
  const [txns, setTxns] = useState([]);

  const fetchTransactions = async () => {
    try {
      const headers = {
        "Content-Type": "application/json",
        _t: localStorage.getItem("_tk"),
        _di: localStorage.getItem("_di"),
      };
      const res = await axios.post(
        API_HOST + API_FETCH_TXNS,
        {
          page: page,
          ctg: ctg,
          ...headers,
        },
        { headers }
      );
      //console.log(res.data);
      if (res.data.success) {
        if (res.data.txns.length > 0) {
          setTxns((oldTxns) => [...oldTxns, ...res.data.txns]);
          setPage((oldPage) => oldPage + 1);
          dispatch(updateWallet(res.data.balance));
        }
      } else {
        toastr.error(t(res.data.message));
      }

      //console.log(txns);
    } catch (error) {
      //console.log(error);
      toastr.error(error.response ? error.response.data : error.message);
    }
  };

  const changeType = (stype) => {
    setCtg(stype);
    setPage(1);
    setTxns([]);
  };

  useEffect(() => {
    if (!isAuth) navigate("/login");
    fetchTransactions();
  }, [page, ctg, txns]);
  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="my-2 d-flex gap-2 overflow-scroll py-2">
          <Button6 text="ALL" type={ctg} action={changeType} working={false} />
          <Button6
            text="DEPOSIT"
            type={ctg}
            action={changeType}
            working={false}
          />
          <Button6 text="BET" type={ctg} action={changeType} working={false} />
          <Button6
            text="REWARD"
            type={ctg}
            action={changeType}
            working={false}
          />
          <Button6
            text="REFERRAL"
            type={ctg}
            action={changeType}
            working={false}
          />
          <Button6
            text="BONUS"
            type={ctg}
            action={changeType}
            working={false}
          />
          <Button6
            text="WITHDRAWAL"
            type={ctg}
            action={changeType}
            working={false}
          />
        </div>
        {txns.length < 1 && <NoData text={t("no_transaction_found")} />}
        <div className="">
          {txns.map((txn) => {
            return (
              <Txn
                key={txn._id}
                txnId={txn.txnId}
                createdAt={txn.createdAt}
                amount={txn.amount}
                remark={txn.remark}
                status={txn.status}
                txnType={txn.txnType}
              />
            );
          })}
        </div>
      </motion.div>
    </>
  );
};
