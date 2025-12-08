export const DashButton = (props) => {
  return (
    <>
      {" "}
      <button
        onClick={() => props.action(props.text)}
        className={`btn btn-sm py-1 m-0 border shadow-sm ${
          props.current == props.text ? "btn-primary" : ""
        }`}
      >
        {props.text}
      </button>
    </>
  );
};
