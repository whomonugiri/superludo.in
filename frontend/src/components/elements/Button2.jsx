import { Bars } from "react-loader-spinner";

const Button2 = (props) => {
  return (
    <>
      <button
        onClick={props.action}
        className={
          `${
            props.working && "disabled"
          } m-1 btn btn-outline-primary btn-sm d-flex justify-content-center align-items-center gap-1 ` +
          props.class
        }
      >
        <Bars
          height="18"
          width="18"
          color="white"
          ariaLabel="bars-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={props.working}
        />{" "}
        {props.icon} {props.text}
      </button>
    </>
  );
};

export default Button2;
