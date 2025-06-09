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
          <span
            className="input-group-text f-bold bg-primary text-white"
            id="basic-addon1"
          >
            <Button1
              text={props.btn}
              working={props.working}
              action={props.action}
              class="fw-bold p-0 btn-primary"
            />
          </span>
        </div>
      </div>
    </>
  );
};
