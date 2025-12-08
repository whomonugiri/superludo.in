import { useNavigate } from "react-router";
import Button1 from "./Button1";
import { RiCopperCoinFill } from "react-icons/ri";

export const WalletInfo = (props) => {
  const navigate = useNavigate();
  const action = () => {
    navigate(props.path);
  };
  return (
    <>
      <div className={`card text-bg-dark my-3 ${props.class}`}>
        <div className="px-3 py-2">
          <h5 className="card-title d-flex align-items-center justify-content-between gap-2">
            {props.title}
          </h5>
          <div className="card-text">
            <div className=" fs-1 fw-bold text-warning">₹ {props.amount}</div>
            <div className="small mb-2">{props.info}</div>
            {props.btnText && (
              <Button1
                text={props.btnText}
                working={false}
                action={action}
                class="btn-warning btn-sm fw-bold"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
