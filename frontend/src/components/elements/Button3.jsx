const Button3 = (props) => {
  return (
    <>
      <button
        data-bs-toggle="offcanvas"
        href={props.canvasid}
        className="border-0 bg-transparent fs-3"
      >
        {props.icon}
      </button>
    </>
  );
};

export default Button3;
