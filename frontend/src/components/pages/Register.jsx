import { MdCall, MdShare } from "react-icons/md";
import { Card } from "../elements/Card";
import { Input1 } from "../elements/Input1";
import Button1 from "../elements/Button1";
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useParams } from "react-router";
import { FaRegUser } from "react-icons/fa6";
import axios from "axios";
import { API_HOST, API_SEND_OTP } from "../../utils/constants";
import $ from "jquery";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "motion/react";
import {
  resetTimer,
  saveOtpRef,
  saveUserData,
} from "../../contexts/slices/registerSlice";
import toastr from "toastr";
import {
  isFullNameInvalid,
  isMobileNumberInvalid,
} from "../../utils/validation";
import { useEffect, useState } from "react";
export const Register = () => {
  const { referralCode } = useParams();
  const [working, setWorking] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { isAuth } = useSelector((store) => store.auth);
  const handleSubmit = async () => {
    const data = {
      fullName: $("#signup_full_name").val().trim(),
      mobileNumber: $("#signup_mobile_no").val().trim(),
      referralCode: $("#signup_referral_code").val().trim(),
      action: "register",
    };
    dispatch(saveUserData(data));
    const check1 = isFullNameInvalid(data.fullName, t);
    const check2 = isMobileNumberInvalid(data.mobileNumber, t);

    if (check1) {
      toastr.error(check1);
      return;
    }
    if (check2) {
      toastr.error(check2);
      return;
    }

    try {
      setWorking(true);
      const res = await axios.post(API_HOST + API_SEND_OTP, data);
      //console.log(res.data);
      if (res.data.success) {
        dispatch(saveOtpRef(res.data.otpRef));
        toastr.success(t("otp_sended_msg"));
        dispatch(resetTimer());
        navigate("/verify-otp");
      } else if (res.data.message == "exists") {
        toastr.error(t("exists_msg"));
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

  //console.log(working);

  return (
    <>
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
        <Card>
          <Input1
            icon={<FaRegUser />}
            label={t("full_name_label")}
            id="signup_full_name"
            type="text"
          />

          <Input1
            icon={<MdCall />}
            label={t("mobile_number_label")}
            id="signup_mobile_no"
            type="number"
          />

          <Input1
            icon={<MdShare />}
            label={t("referral_code_label")}
            id="signup_referral_code"
            value={referralCode}
            type="text"
          />

          <div className="small">
            {t("legal_terms_disclaimer_p1")}{" "}
            <a href="" className="text-decoration-none text-primary">
              {t("legal_terms_disclaimer_p2")}
            </a>{" "}
            {t("legal_terms_disclaimer_p3")}
          </div>

          <Button1
            action={handleSubmit}
            text={t("submit_btn")}
            working={working}
            class="w-100 mt-2 btn-primary"
          />
          <hr></hr>
          <div className="text-center">
            {t("account_note")}{" "}
            <Link to="/login" className="text-decoration-none text-primary">
              {t("login_link")}
            </Link>{" "}
          </div>
        </Card>
      </motion.div>
    </>
  );
};
