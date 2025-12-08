export const Select = (props) => {
  return (
    <>
      <div className="mb-3">
        <label className="mb-1">{props.label}</label>
        <div className="input-group ">
          <span className="input-group-text" id="basic-addon1">
            {props.icon}
          </span>
          <select
            onChange={props.action}
            className="form-control"
            id={props.id}
          >
            <option value="BANK">Bank</option>
            <option value="UPI">UPI</option>
          </select>
        </div>
      </div>
    </>
  );
};
