export const UDI = (props) => {
  return (
    <>
      {" "}
      <div className="col-12 col-md-4 p-2">
        <div className=" border p-1 fw-bold small rounded">
          {props.title} : <span className="text-success">{props.value}</span>
          {props.count > 0 && (
            <span className="bg-dark text-white px-1 xs-small rounded mx-2">
              {props.count}
            </span>
          )}
        </div>
      </div>
    </>
  );
};
