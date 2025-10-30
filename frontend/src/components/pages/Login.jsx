import { MdCall } from "react-icons/md";
import { Card } from "../elements/Card";
import { Input1 } from "../elements/Input1";
import Button1 from "../elements/Button1";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import $ from "jquery";
import { FaMobileAlt } from "react-icons/fa";

import {
  resetTimer,
  saveOtpRef,
  saveUserData,
} from "../../contexts/slices/registerSlice";
import { isMobileNumberInvalid } from "../../utils/validation";
import toastr from "toastr";
import axios from "axios";
import { API_HOST, API_SEND_OTP } from "../../utils/constants";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { FaWhatsapp } from "react-icons/fa6";
export const Login = () => {
  const [working, setWorking] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { isAuth } = useSelector((store) => store.auth);

  const handleSendOtp = async () => {
    const data = {
      mobileNumber: $("#login_mobile_no").val().trim(),
      action: "login",
    };
    dispatch(saveUserData(data));
    const check2 = isMobileNumberInvalid(data.mobileNumber, t);
    if (check2) {
      toastr.error(check2);
      return;
    }

    try {
      setWorking(true);
      const res = await axios.post(API_HOST + API_SEND_OTP, data);

      if (res.data.success) {
        dispatch(saveOtpRef(res.data.otpRef));
        toastr.success(t("otp_sended_msg"));
        dispatch(resetTimer());
        navigate("/verify-otp");
      } else if (res.data.message == "notexists") {
        toastr.error(t("not_exists"));
        setWorking(false);
      } else {
        toastr.error(t(res.data.message));
        setWorking(false);
      }
    } catch (error) {
      toastr.error(error.response ? error.response.data : error.message);
      setWorking(false);
    }
  };

  useEffect(() => {
    if (isAuth) navigate("/");
  }, []);
  return (
    <>
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
        <Card>
          <div className="fw-bold text-center fs-3 text-danger mb-3">
            LOGIN TO PLAY
          </div>
          <Input1
            icon={<FaMobileAlt />}
            label={"Enter 10 Digit Mobile Number"}
            id="login_mobile_no"
            type="number"
          />

          <div className="small text-secondary" style={{ fontSize: "12px" }}>
            {t("legal_terms_disclaimer_p1")}{" "}
            <Link to="/terms" className="text-decoration-none text-primary">
              {t("legal_terms_disclaimer_p2")}
            </Link>{" "}
            {t("legal_terms_disclaimer_p3")}
          </div>

          <Button1
            text={t("send_otp_btn")}
            action={handleSendOtp}
            class="w-100 mt-2 btn-danger"
            working={working}
          />

          <div className="text-center mt-3">
            {t("no_account_note")}{" "}
            <Link to="/register" className="text-decoration-none text-primary">
              {t("register_link")}
            </Link>{" "}
          </div>
        </Card>
      </motion.div>
    </>
  );
};
