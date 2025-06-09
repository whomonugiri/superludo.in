import { MdOutlineInfo } from "react-icons/md";

export const InfoCard2 = (props) => {
  return (
    <>
      <div
        className="alert alert-primary d-flex align-items-center gap-2 border border-primary fw-bold"
        role="alert"
      >
        <div className="small">{props.text}</div>
      </div>
    </>
  );
};
