import { useNavigate } from "react-router";
import Button1 from "./Button1";

export const WalletInfo = (props) => {
  const navigate = useNavigate();
  const action = () => {
    navigate(props.path);
  };
  return (
    <>
      <div className={`card text-bg-dark my-3 ${props.class}`}>
        <img
          src="assets/money.jpg"
          className="card-img"
          style={{ opacity: "0.15" }}
          alt="..."
        />
        <div className="card-img-overlay">
          <h5 className="card-title d-flex align-items-center justify-content-between gap-2">
            {props.title}
            {props.btnText && (
              <Button1
                text={props.btnText}
                working={false}
                action={action}
                class="btn-dark"
              />
            )}
          </h5>
          <div className="card-text">
            <div className=" fs-1 fw-bold">₹ {props.amount}</div>
            <div className="">{props.info}</div>
          </div>
        </div>
      </div>
    </>
  );
};
