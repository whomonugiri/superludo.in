import { Bars } from "react-loader-spinner";

const Button1 = (props) => {
  return (
    <>
      <button
        onClick={props.action}
        className={
          `${
            props.working && "disabled"
          } btn  btn-sm d-flex justify-content-center align-items-center gap-1  ` +
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
        />
        {props.icon} {props.text}
      </button>
    </>
  );
};

export default Button1;
