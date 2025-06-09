import axios from "axios";
import toastr from "toastr";
import $ from "jquery";
import { Input1 } from "./Input1";
import Button1 from "./Button1";
import { IoFingerPrint } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  API_HOST,
  API_SUBMIT_KYC,
  API_VERIFY_KYC_OTP,
} from "../../utils/constants";
import OTPInput from "react-otp-input";
import { motion } from "motion/react";
export const KYCManager = () => {
  const [otpref, setOtpref] = useState(null);
  const [otp, setOtp] = useState("");
  const [aadhar, setAadhar] = useState(null);
  const [working, setWorking] = useState(false);
  const {
    isAuth,
    kyc,
    photo,
    care_of,
    full_address,
    date_of_birth,
    gender,
    name,
    aadhar_no,
  } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const submitKyc = async () => {
    try {
      setWorking(true);
      const headers = {
        "Content-Type": "application/json",
        _t: localStorage.getItem("_tk"),
        _di: localStorage.getItem("_di"),
      };
      const data = {
        aadharNo: $("#profile_aadhar_no").val(),
        ...headers,
      };

      const res = await axios.post(API_HOST + API_SUBMIT_KYC, data, {
        headers,
      });
      //////console.log(res.data);
      setWorking(false);
      if (res.data.success) {
        setOtpref(res.data.otpRef);
        setAadhar(data.aadharNo);
        toastr.success(t(res.data.message));
      } else {
        toastr.error(t(res.data.message));
      }
    } catch (error) {
      //////console.log(error);
      toastr.error(error.response ? error.response.data : error.message);
      setWorking(false);
    }
  };

  const verifyKyc = async () => {
    try {
      setWorking(true);
      const headers = {
        "Content-Type": "application/json",
        _t: localStorage.getItem("_tk"),
        _di: localStorage.getItem("_di"),
      };
      const data = {
        aadharNo: aadhar,
        otp: otp,
        refId: otpref,
        ...headers,
      };
      //////console.log(data);
      const res = await axios.post(API_HOST + API_VERIFY_KYC_OTP, data, {
        headers,
      });
      //////console.log(res.data);
      setWorking(false);
      console.log(res.data);
      if (res.data.success) {
        navigate("/profile");
        toastr.success(t(res.data.message));
      } else {
        toastr.error(t(res.data.message));
      }
    } catch (error) {
      //////console.log(error);
      toastr.error(error.response ? error.response.data : error.message);
      setWorking(false);
    }
  };
  return (
    <>
      {!kyc && !otpref && (
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
          <div className="mt-3">
            <Input1
              icon={<IoFingerPrint />}
              label={t("aadhar_no_label")}
              id="profile_aadhar_no"
              type="number"
            />
            <Button1
              text={t("send_aadhar_otp")}
              working={working}
              action={submitKyc}
              class="btn-primary w-100 fw-bold"
            />

            <div className="small mt-3">
              <span className="fw-bold">{t("note")} :</span> {t("aadhar_note")}
            </div>
          </div>
        </motion.div>
      )}

      {!kyc && otpref && (
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
          <div className="mt-3">
            <label className="text-center w-100 mb-2">{t("otp_label")}</label>
            <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderSeparator={" "}
              inputType="tel"
              renderInput={(props) => <input {...props} />}
              containerStyle={"d-flex justify-content-between gap-2  mt-2"}
              inputStyle={
                "form-control w-100 border border-primary rounded-5 fw-bold"
              }
            />

            <Button1
              action={verifyKyc}
              working={working}
              text={t("submit_aadhar_otp")}
              class="btn-primary w-100 mt-3"
            />

            <div className="small mt-3">
              <span className="fw-bold">{t("note")} :</span>{" "}
              {t("aadhar_note_2")}
            </div>
          </div>
        </motion.div>
      )}

      {kyc && (
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
          <div className="mt-3">
            <div className="d-flex bg-primary-light gap-3 border p-2">
              <div>
                <img
                  src={`data:image/jpeg;base64,${photo}`}
                  className="rounded"
                  width="95px"
                  height="100px"
                />
              </div>
              <div>
                <div className="fw-bold fs-5">
                  <IoFingerPrint /> {aadhar_no}
                </div>
                <div className="fw-bold fs-6">{name}</div>
                <div className="fw-bold fs-6">{date_of_birth}</div>
                <div className="fw-bold fs-6">
                  {gender == "M" ? "Male" : "Female"}
                </div>
              </div>
            </div>

            <div className="p-2 mt-3 fw-bold">
              <b>Address : </b>
              <br></br>
              <span className="small">
                {care_of} , {full_address}
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};
