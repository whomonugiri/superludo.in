import { useEffect, useState } from "react";
import { Card } from "../elements/Card";
import OtpInput from "react-otp-input";
import { useTranslation } from "react-i18next";
import Button1 from "../elements/Button1";
import Button2 from "../elements/Button2";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "motion/react";
import toastr from "toastr";
import {
  isFullNameInvalid,
  isMobileNumberInvalid,
  isOTPInvalid,
} from "../../utils/validation";
import axios from "axios";
import { API_HOST, API_SEND_OTP, API_VERIFY_OTP } from "../../utils/constants";
import { useNavigate } from "react-router";
import {
  playTimer,
  releaseUserData,
  resetTimer,
  saveOtpRef,
} from "../../contexts/slices/registerSlice";
import { authUser } from "../../contexts/slices/authSlice";
import { updateBalance } from "../../contexts/slices/userSlice";

export const VerifyOtp = () => {
  const [working, setWorking] = useState(false);
  const [working2, setWorking2] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { otpRef, mobileNumber, fullName, referralCode, action, timer } =
    useSelector((store) => store.register);
  const { isAuth } = useSelector((store) => store.auth);

  // Format time as mm:ss
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
  };

  const [otp, setOtp] = useState("");
  const handleVerifyOtp = async () => {
    const data = {
      otpRef: otpRef,
      otp: otp,
      mobileNumber: mobileNumber,
      fullName: fullName,
      referralCode: referralCode,
      action: action,
    };

    const check1 = isFullNameInvalid(data.fullName, t);

    const check2 = isMobileNumberInvalid(data.mobileNumber, t);
    const check3 = isOTPInvalid(data.otp, t);

    if (check1 && action == "register") {
      toastr.error(check1);
      return;
    }
    if (check2) {
      toastr.error(check2);
      return;
    }
    if (check3) {
      toastr.error(check3);
      return;
    }
    //console.log(data);
    try {
      setWorking(true);
      const res = await axios.post(API_HOST + API_VERIFY_OTP, data);
      //console.log(res.data);

      if (res.data.success) {
        toastr.success(t("logged_in"));
        dispatch(releaseUserData());
        dispatch(authUser(res.data));
        dispatch(updateBalance(res.data.balance));
        navigate("/");
      } else if (res.data.message == "io") {
        toastr.error(t("incorrect_otp"));
        setWorking(false);
      } else {
        toastr.error(t(res.data.message));
        setWorking(false);
      }
    } catch (error) {
      //console.log(error);
      toastr.error(error.response ? error.response.data : error.message);
      setWorking(false);
    }
  };

  const handleResendOtp = async () => {
    if (timer > 0) return;

    const data = {
      mobileNumber: mobileNumber,
      action: action,
      resend: true,
    };

    try {
      setWorking2(true);
      const res = await axios.post(API_HOST + API_SEND_OTP, data);

      if (res.data.success) {
        setOtp("");
        dispatch(saveOtpRef(res.data.otpRef));
        toastr.success(t("otp_sended_msg"));
        dispatch(resetTimer());
        setWorking2(false);
      } else {
        toastr.error(res.data.message);
        setWorking2(false);
      }
    } catch (error) {
      toastr.error(error.response ? error.response.data : error.message);
      setWorking2(false);
    }
  };

  useEffect(() => {
    if (!otpRef) navigate("/login");
    if (isAuth) navigate("/");

    if (timer <= 0) return;

    const timeref = setInterval(() => {
      dispatch(playTimer());
    }, 1000);

    return () => clearInterval(timeref); // Cleanup the timer
  }, []);

  return (
    <>
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
        <Card>
          <label className="text-center w-100 mb-2 fw-bold">
            {t("otp_label")}
          </label>
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderSeparator={" "}
            inputType="tel"
            renderInput={(props) => <input {...props} />}
            containerStyle={"d-flex justify-content-between gap-2"}
            inputStyle={
              "form-control w-100 rounded-4 border-secondary text-center fw-bold"
            }
          />
          <div
            className="small text-secondary mt-3"
            style={{ fontSize: "12px" }}
          >
            {t("legal_terms_disclaimer_p1")}{" "}
            <a href="" className="text-decoration-none text-primary">
              {t("legal_terms_disclaimer_p2")}
            </a>{" "}
            {t("legal_terms_disclaimer_p3")}
          </div>

          <Button1
            text={t("verify_otp_btn")}
            class="w-100 mt-2 btn-danger"
            action={handleVerifyOtp}
            working={working}
          />
          <hr></hr>
          <div className="d-flex justify-content-between align-items-center">
            <div className={`small ${timer <= 0 ? "d-none" : ""}`}>
              {t("resend_in")} {formatTime(timer)}
            </div>{" "}
            <div></div>
            <Button2
              text={t("resend_otp_btn")}
              action={handleResendOtp}
              class={`${timer <= 0 ? "" : "disabled"} btn-outline-danger`}
              working={working2}
            />
          </div>
        </Card>
      </motion.div>
    </>
  );
};
