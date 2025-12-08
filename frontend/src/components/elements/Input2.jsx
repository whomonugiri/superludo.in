export const Input2 = (props) => {
  return (
    <>
      <div className="mb-3">
        <label className="mb-1">{props.label}</label>
        <div className="input-group ">
          <span className="input-group-text" id="basic-addon1">
            {props.icon}
          </span>
          <input type={props.type} className="form-control" id={props.id} />
          <span
            className="input-group-text"
            onClick={props.action}
            id="basic-addon1"
          >
            {props.icon}
          </span>
        </div>
      </div>
    </>
  );
};
