import { useSelector } from "react-redux";
import { Card } from "../elements/Card";
import { useTranslation } from "react-i18next";
import toastr from "toastr";
import axios from "axios";
import CopyToClipboard from "react-copy-to-clipboard";
import Button1 from "../elements/Button1";
import { MdContentCopy } from "react-icons/md";
import {
  API_FETCH_REFERRAL_DATA,
  API_HOST,
  CLIENT,
} from "../../utils/constants";
import { FaWhatsapp } from "react-icons/fa6";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export function maskMobile(text) {
  return text.replace(/\b\d{5}(\d{5})\b/g, "*****$1");
}

export const Refer = () => {
  const { isAuth, refCode, referralCommisionLevel1, referralCommisionLevel2 } =
    useSelector((store) => store.auth);
  const [referrals, setReferrals] = useState([]);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const fetchReferrals = async () => {
    try {
      const headers = {
        "Content-Type": "application/json",
        _t: localStorage.getItem("_tk"),
        _di: localStorage.getItem("_di"),
      };
      const res = await axios.post(
        API_HOST + API_FETCH_REFERRAL_DATA,
        {
          page: page,
          ...headers,
        },
        { headers }
      );
      //console.log(res.data);
      if (res.data.success) {
        if (res.data.data.length > 0) {
          setReferrals((oldMatches) => [...oldMatches, ...res.data.data]);
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

  useEffect(() => {
    if (!isAuth) navigate("/login");
    fetchReferrals();
  }, [page]);
  return (
    <>
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
        <Card class="border border border-3">
          <div className="text-center">
            <img src="assets/refer.png" className="w-50" />
          </div>
          <div className="fw-bold text-center my-2">
            {t("refer_msg_1")} {referralCommisionLevel1 * 100}%{" "}
            {t("refer_msg_2")} {referralCommisionLevel1 * 100}%{" "}
            {t("refer_msg_3")}
          </div>

          <div className="py-2 text-center bg-overlay rounded-5 border border-2 border-primary">
            <div className="fw-bold black">{t("referral_code")}</div>
            <div className="fs-1 fw-bold text-primary">{refCode}</div>
          </div>
        </Card>

        <div className="d-flex gap-2">
          <CopyToClipboard
            text={refCode}
            onCopy={() => {
              toastr.success(t("refer_code_copied"));
            }}
          >
            <button className="btn btn-primary btn-sm w-100 fw-bold">
              <MdContentCopy /> {t("copy_code_btn")}
            </button>
          </CopyToClipboard>

          <CopyToClipboard
            text={CLIENT + "/register/" + refCode}
            onCopy={() => {
              toastr.success(t("refer_link_copied"));
            }}
          >
            <button className="btn btn-primary btn-sm w-100 fw-bold">
              <MdContentCopy /> {t("copy_link_btn")}
            </button>
          </CopyToClipboard>
        </div>

        <a
          href={`whatsapp://send?text=${encodeURIComponent(
            `🎲 *Play Ludo Online & Earn Money!* 🤑\n\n🔥 Register Now and start winning!\n\n✅ *My Referral Code*: ${refCode}\n🔗 Click here to register: ${CLIENT}/register/${refCode}\n\nDon't miss out—join the fun now! 🚀`
          )}`}
          className="btn btn-success fw-bold w-100 my-2 rounded-4 d-flex gap-2 align-items-center justify-content-center border-white border-3 shadow-sm"
          style={{ backgroundColor: "#4EC95B" }}
        >
          <FaWhatsapp className="fs-4" /> {t("share_on_whatsapp")}
        </a>
      </motion.div>

      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
        <div className="border border-2 rounded shadow-sm p-2 bg-primary-light mt-3">
          <div className="text-center fw-bold border-bottom pb-1 small">
            {t("my_referrals")}
          </div>
          <div>
            {referrals && referrals.length < 1 && (
              <div className="text-center small py-2 opacity-50">
                no referrals found
              </div>
            )}

            {referrals && referrals.length > 0 && (
              <div className="">
                {referrals.map((referral, index) => {
                  return (
                    <div
                      key={index}
                      className="d-flex align-items-center  mb-1 justify-content-between fw-bold"
                    >
                      <div>
                        {index + 1}. {referral.fullName}
                      </div>
                      <div className="x-small text-primary">
                        {maskMobile(referral.mobileNumber)}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
};
