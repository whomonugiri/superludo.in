import { HiHome } from "react-icons/hi2";
import { NavLink } from "react-router";

export const Button5 = (props) => {
  return (
    <>
      <div
        className="d-flex flex-column justify-content-center"
        style={{ lineHeight: "10px" }}
        onClick={props.action}
      >
        <div className="fs-2 text-center">{props.icon}</div>
        <div style={{ fontSize: "10px" }} className="text-center">
          {props.text}
        </div>
      </div>
    </>
  );
};
