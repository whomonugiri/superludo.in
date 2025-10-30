import { useTranslation } from "react-i18next";
import { GiSandsOfTime, GiTakeMyMoney } from "react-icons/gi";
import { GrCurrency } from "react-icons/gr";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { RiCopperCoinFill, RiErrorWarningLine } from "react-icons/ri";
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
  const date = new Date(props.createdAt);
  const day = date.toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
  });
  const time = date.toLocaleString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const gst = props.amount * 0.28;
  const gam = props.amount - gst;
  function formatNumber(num) {
    // If the number has decimal part
    return num % 1 === 0 ? num.toString() : num.toFixed(2);
  }
  return (
    <>
      {props.txnCtg == "deposit" &&
        props.status == "completed" &&
        props.txnType == "credit" && (
          <div className=" border-bottom rounded-2  p-0 px-2 py-2">
            <div className=" d-flex justify-content-between align-items-center mt-1">
              <div className="d-flex align-items-center gap-2">
                <div
                  className="opacity-75 text-center"
                  style={{
                    paddingRight: "10px",
                    borderRight: "1px solid rgba(0,0,0,0.5)",
                  }}
                >
                  <div className="">{day}</div>
                  <div style={{ fontSize: "12px" }}>{time.toUpperCase()}</div>
                </div>
                <div style={{ lineHeight: "18px" }}>
                  <div className="fw-bold small">Deposit Cashback 💸</div>
                  <div
                    className="d-flex justify-content-between small opacity-50 "
                    style={{ fontSize: "12px" }}
                  >
                    <div>
                      {props.status == "completed"
                        ? t(type[props.txnType])
                        : ""}
                      {props.status == "cancelled" ? t("txn_cancel") : ""}
                      {props.status == "failed" ? t("txn_failed") : ""}
                      {props.status == "pending" ? "" : ""}
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ lineHeight: "19px" }} className="">
                <div className="fw-bold fs-6 text-end text-nowrap d-flex gap-1 align-items-center">
                  {props.txnType == "debit" ? (
                    <span className="text-danger">(-)</span>
                  ) : (
                    <span className="text-success">(+)</span>
                  )}{" "}
                  ₹ {formatNumber(gst)}
                </div>
                <div
                  style={{ fontSize: "12px" }}
                  className="opacity-75 text-end"
                >
                  {status[props.status]}
                </div>
              </div>
            </div>
          </div>
        )}

      <div className=" border-bottom rounded-2  p-0 px-2 py-2">
        <div className=" d-flex justify-content-between align-items-center mt-1">
          <div className="d-flex align-items-center gap-2">
            <div
              className="opacity-75 text-center"
              style={{
                paddingRight: "10px",
                borderRight: "1px solid rgba(0,0,0,0.5)",
              }}
            >
              <div className="">{day}</div>
              <div style={{ fontSize: "12px" }}>{time.toUpperCase()}</div>
            </div>
            <div style={{ lineHeight: "18px" }}>
              <div className="fw-bold small">{t(props.remark)}</div>
              <div
                className="d-flex justify-content-between small opacity-50 "
                style={{ fontSize: "12px" }}
              >
                <div>
                  {props.status == "completed" ? t(type[props.txnType]) : ""}
                  {props.status == "cancelled" ? t("txn_cancel") : ""}
                  {props.status == "failed" ? t("txn_failed") : ""}
                  {props.status == "pending" ? "" : ""}
                </div>
              </div>
            </div>
          </div>

          <div style={{ lineHeight: "19px" }} className="">
            <div className="fw-bold fs-6 text-end text-nowrap d-flex gap-1 align-items-center">
              {props.txnType == "debit" ? (
                <span className="text-danger">(-)</span>
              ) : (
                <span className="text-success">(+)</span>
              )}{" "}
              ₹{props.txnCtg == "deposit" ? formatNumber(gam) : props.amount}
            </div>
            <div style={{ fontSize: "12px" }} className="opacity-75 text-end">
              {status[props.status]}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
