import { use } from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  API_FETCH_MATCH_HISTORY,
  API_FETCH_TXNS,
  API_HOST,
} from "../../utils/constants";
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
import { RMatch } from "../elements/RMatch";
import { HMatch } from "../elements/HMatch";
export const Matches = () => {
  const { isAuth } = useSelector((store) => store.auth);
  const { t } = useTranslation();

  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [ctg, setCtg] = useState("ALL");
  const [matches, setMatches] = useState([]);

  const fetchMatchHistory = async () => {
    try {
      const headers = {
        "Content-Type": "application/json",
        _t: localStorage.getItem("_tk"),
        _di: localStorage.getItem("_di"),
      };
      const res = await axios.post(
        API_HOST + API_FETCH_MATCH_HISTORY,
        {
          page: page,
          ctg: ctg,
          ...headers,
        },
        { headers }
      );
      //console.log(res.data);
      if (res.data.success) {
        if (res.data.matches.length > 0) {
          setMatches((oldMatches) => [...oldMatches, ...res.data.matches]);
          setPage((oldPage) => oldPage + 1);
        }
      } else {
        toastr.error(t(res.data.message));
      }
    } catch (error) {
      //console.log(error);
      toastr.error(error.response ? error.response.data : error.message);
    }
  };

  const changeType = (stype) => {
    setCtg(stype);
    setPage(1);
    setMatches([]);
  };

  useEffect(() => {
    if (!isAuth) navigate("/login");
    fetchMatchHistory();
  }, [page, ctg, matches]);
  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="my-2 d-flex gap-2 justify-content-between overflow-scroll py-2">
          <Button6 text="ALL" type={ctg} action={changeType} working={false} />
          <Button6 text="WON" type={ctg} action={changeType} working={false} />
          <Button6 text="LOST" type={ctg} action={changeType} working={false} />
          <Button6
            text="CANCELLED"
            type={ctg}
            action={changeType}
            working={false}
          />
        </div>
        {matches.length < 1 && <NoData text={t("no_match_found")} />}
        <div className="">
          {matches.map((match) => {
            return <HMatch key={match._id} match={match} />;
          })}
        </div>
      </motion.div>
    </>
  );
};
