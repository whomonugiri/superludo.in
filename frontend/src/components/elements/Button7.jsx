import { HiHome } from "react-icons/hi2";
import { NavLink } from "react-router";

export const Button7 = (props) => {
  return (
    <>
      <NavLink to={props.path} className="text-decoration-none text-secondary">
        <div
          className="d-flex flex-column justify-content-center align-items-center"
          style={{ lineHeight: "10px" }}
        >
          <div
            className="display-5 text-center d-flex justify-content-center align-items-center"
            style={{
              position: "absolute",
              backgroundColor: "white",
              borderRadius: "50%",
              border: "1px solid gray",
              marginBottom: "50px",
              width: "50px",
              height: "50px",
            }}
          >
            {props.icon}
          </div>
          <div
            style={{ fontSize: "10px", marginTop: "24px" }}
            className="text-center"
          >
            {props.text}
          </div>
        </div>
      </NavLink>
    </>
  );
};
