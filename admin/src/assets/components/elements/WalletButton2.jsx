import { HiCurrencyRupee } from "react-icons/hi";

export const WalletButton2 = (props) => {
  return (
    <>
      <button
        className={`btn text-dark p-0 d-flex gap-1 align-items-center justify-content-start px-2  m-0 ${props.class}`}
      >
        <div className="fs-6">{props.icon}</div>
        <div
          style={{
            borderLeft: "2px solid rgba(256,256,256,0.3)",
            paddingLeft: "5px",
          }}
        >
          <div style={{ fontSize: "8px" }} className="text-start text-white">
            {props.title}
          </div>
          <div className="xs-small text-start">{props.amount}</div>
        </div>
      </button>
    </>
  );
};
