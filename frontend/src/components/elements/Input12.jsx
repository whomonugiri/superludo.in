import Button1 from "./Button1";

export const Input12 = (props) => {
  return (
    <>
      <div className="mb-3">
        <label className="mb-1 fw-bold">{props.label}</label>
        <div className="input-group border rounded ">
          <span className="input-group-text" id="basic-addon1">
            {props.icon}
          </span>
          <input
            type={props.type}
            defaultValue={props.value}
            className="form-control"
            id={props.id}
          />
        </div>
        <Button1
          text={props.btn}
          working={props.working}
          action={props.action}
          class="fw-bold mt-2 w-100 btn-danger"
        />
      </div>
    </>
  );
};
