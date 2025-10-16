import { useTranslation } from "react-i18next";
import { Card } from "../elements/Card";
import $ from "jquery";
import { Input1 } from "../elements/Input1";
import { FaRegUser } from "react-icons/fa6";
import { FaFileAlt } from "react-icons/fa";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  MdOutlineContentCopy,
  MdOutlineCurrencyRupee,
  MdOutlinePhoneIphone,
} from "react-icons/md";
import Button1 from "../elements/Button1";
import { BsQrCode } from "react-icons/bs";
import Button2 from "../elements/Button2";
import toastr from "toastr";
import axios from "axios";
import {
  API_ADD_WITHDRAW_REQ,
  API_CANCEL_PAYMENT,
  API_GET_PAYMENT_QR,
  API_HOST,
  API_PAYMENT_QR_STATUS,
  API_SUBMIT_PAYMENT,
  API_UPDATE_ME,
} from "../../utils/constants";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { updateBalance, updateWallet } from "../../contexts/slices/userSlice";
import { motion } from "motion/react";
import { Select } from "../elements/Select";
import { GiTakeMyMoney } from "react-icons/gi";

export const Withdraw = () => {
  const {
    isAuth,
    minUpiDeposit,
    maxUpiDeposit,
    minQrDeposit,
    maxQrDeposit,
    depositUPI,
    minWithdraw,
    maxWithdraw,
    withdrawLimit,
    upiId,
    bankName,
    bankAccountNo,
    bankIfscCode,
    kyc,
  } = useSelector((store) => store.auth);
  const [working, setWorking] = useState(false);
  const [qr, setQr] = useState("");
  const [txnid, setTxnid] = useState(false);
  const [am, setAm] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { t } = useTranslation();
  const add = (amount) => {
    $("#withdraw_amount").val(amount);
  };

  const handleMethodChange = () => {
    let method = $("#withdraw_method").val();

    if (method == "UPI") {
      $("#withdraw_upi").parent().parent().show();
      $("#withdraw_bank_name").parent().parent().hide();
      $("#withdraw_ac_no").parent().parent().hide();
      $("#withdraw_ifsc_code").parent().parent().hide();
    } else if (method === "BANK") {
      $("#withdraw_upi").parent().parent().hide();
      $("#withdraw_bank_name").parent().parent().show();
      $("#withdraw_ac_no").parent().parent().show();
      $("#withdraw_ifsc_code").parent().parent().show();
    }
  };

  const submitPayment = async () => {
    try {
      const headers = {
        "Content-Type": "application/json",
        _t: localStorage.getItem("_tk"),
        _di: localStorage.getItem("_di"),
      };

      const data = {
        amount: $("#withdraw_amount").val(),
        method: $("#withdraw_method").val(),
        upiId: $("#withdraw_upi").val().trim(),
        bankName: $("#withdraw_bank_name").val().trim(),
        bankAccountNo: $("#withdraw_ac_no").val().trim(),
        bankIfscCode: $("#withdraw_ifsc_code").val().trim(),
        ...headers,
      };
      setWorking(true);
      const res = await axios.post(API_HOST + API_ADD_WITHDRAW_REQ, data, {
        headers,
      });
      //console.log(res.data);
      if (res.data.success) {
        $("#withdraw_amount").val("");
        $("#withdraw_upi").val("");
        toastr.success(t(res.data.message));
        dispatch(updateWallet(res.data.money));
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

  const updateMe = async () => {
    try {
      setWorking(true);
      const headers = {
        "Content-Type": "application/json",
        _t: localStorage.getItem("_tk"),
        _di: localStorage.getItem("_di"),
      };
      const data = {
        upiId: $("#withdraw_upi").val().trim(),
        bankName: $("#withdraw_bank_name").val().trim(),
        bankAccountNo: $("#withdraw_ac_no").val().trim(),
        bankIfscCode: $("#withdraw_ifsc_code").val().trim(),
        ...headers,
      };

      //console.log(data);
      const res = await axios.post(API_HOST + API_UPDATE_ME, data, { headers });
      //console.log(res.data);
      if (res.data.success) {
        toastr.success(t(res.data.message));
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

  useEffect(() => {
    if (!isAuth) navigate("/login");
    $("#withdraw_upi").parent().parent().hide();
  }, []);

  return (
    <>
      

      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
        <Card class="p-0">
          <div className="">
            <Select
              icon={<GiTakeMyMoney />}
              label={t("select_payment_method")}
              id="withdraw_method"
              action={handleMethodChange}
            />

            <div>
              <Input1
                icon={<FaFileAlt />}
                label={t("upi_label")}
                id="withdraw_upi"
                type="text"
                value={""}
              />

              <Input1
                icon={<FaFileAlt />}
                label={t("bank_name_label")}
                id="withdraw_bank_name"
                type="text"
                value={""}
              />
              <Input1
                icon={<FaFileAlt />}
                label={t("ac_no_label")}
                id="withdraw_ac_no"
                type="number"
                value={""}
              />

              <Input1
                icon={<FaFileAlt />}
                label={t("ifsc_code_label")}
                id="withdraw_ifsc_code"
                type="text"
                value={""}
              />
            </div>

            <Input1
              icon={<MdOutlineCurrencyRupee />}
              label={t("amount_label")}
              id="withdraw_amount"
              type="number"
            />

            <div className="d-flex jsutify-content-around mb-2">
              <Button2
                text="₹ 100"
                class=""
                working={false}
                action={() => add(100)}
              />

              <Button2
                text="₹ 500"
                class=""
                working={false}
                action={() => add(500)}
              />

              <Button2
                text="₹ 1000"
                class=""
                working={false}
                action={() => add(1000)}
              />

              <Button2
                text="₹ 2000"
                class=""
                working={false}
                action={() => add(2000)}
              />

              <Button2
                text="₹ 5000"
                class=""
                working={false}
                action={() => add(5000)}
              />
            </div>
            <div className="d-flex gap-2">
              <Button1
                text={t("submit_withdraw_btn")}
                class="w-100 btn-primary"
                working={working}
                action={submitPayment}
              />
            </div>
            <div className="x-small opacity-75 mt-1">
              <b>{t("note")} : </b>
              {t("min_withdraw")} <b>₹{minWithdraw}</b> & {t("max_withdraw")} ₹
              <b>{maxWithdraw}</b>, {t("withdraw_limit_1")}{" "}
              <b>{withdrawLimit}</b> {t("withdraw_limit_2")}
            </div>
          </div>
        </Card>
      </motion.div>
    </>
  );
};
