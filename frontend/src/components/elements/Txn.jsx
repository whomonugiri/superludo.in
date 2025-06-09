import { useTranslation } from "react-i18next";
import { GiSandsOfTime, GiTakeMyMoney } from "react-icons/gi";
import { GrCurrency } from "react-icons/gr";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { RiErrorWarningLine } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";

export const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);

  // Format date as "01 Jan 2024"
  const optionsDate = { day: "2-digit", month: "short", year: "numeric" };
  const formattedDate = date.toLocaleDateString("en-IN", optionsDate);

  // Format time as "4:32 pm"
  const optionsTime = { hour: "numeric", minute: "2-digit", hour12: false };
  const formattedTime = date.toLocaleTimeString("en-IN", optionsTime);

  return `${formattedDate}, ${formattedTime}`;
};

const Done = () => {
  const { t } = useTranslation();
  return (
    <>
      <span className="text-success text-nowrap">
        <IoCheckmarkDoneSharp /> {t("completed")}
      </span>
    </>
  );
};

const Pending = () => {
  const { t } = useTranslation();
  return (
    <>
      <span className="text-primary">
        <RiErrorWarningLine /> {t("pending")}
      </span>
    </>
  );
};

const Failed = () => {
  const { t } = useTranslation();
  return (
    <>
      <span className="text-danger">
        <RxCross2 /> {t("failed")}
      </span>
    </>
  );
};

const Cancel = () => {
  const { t } = useTranslation();
  return (
    <>
      <span className="text-danger">
        <RxCross2 /> {t("cancelled")}
      </span>
    </>
  );
};
const status = {
  pending: <Pending key="p" />,
  completed: <Done key="d" />,
  failed: <Failed key="f" />,
  cancelled: <Cancel key="c" />,
};

const type = {
  credit: "credit_to_wallet",
  debit: "debit_from_wallet",
};

export const Txn = (props) => {
  const { t } = useTranslation();
  return (
    <>
      <div className="alert alert-success p-0 px-2 py-1 my-2">
        <div className=" d-flex justify-content-between align-items-center mt-1">
          <div className="d-flex align-items-center gap-2">
            <div
              className="bg-success d-flex justify-content-center align-items-center fs-3 text-white rounded-4"
              style={{ width: "40px", height: "40px" }}
            >
              <GiTakeMyMoney />
            </div>
            <div style={{ lineHeight: "18px" }}>
              <div style={{ fontSize: "12px" }} className="opacity-75">
                {props.txnId}
              </div>
              <div className="fw-bold small">{t(props.remark)}</div>
            </div>
          </div>

          <div style={{ lineHeight: "19px" }}>
            <div className="fw-bold fs-4 text-end text-nowrap">
              {props.txnType == "debit" ? "-" : "+"} ₹{props.amount}
            </div>
            <div style={{ fontSize: "12px" }} className="opacity-75 text-end">
              {status[props.status]}
            </div>
          </div>
        </div>
        <div
          className="d-flex justify-content-between small opacity-50 mt-1"
          style={{ fontSize: "12px" }}
        >
          <div>{formatTimestamp(props.createdAt)}</div>

          <div>
            {props.status == "completed" ? t(type[props.txnType]) : ""}
            {props.status == "cancelled" ? t("txn_cancel") : ""}
            {props.status == "failed" ? t("txn_failed") : ""}
            {props.status == "pending" ? "" : ""}
          </div>
        </div>
      </div>
    </>
  );
};
