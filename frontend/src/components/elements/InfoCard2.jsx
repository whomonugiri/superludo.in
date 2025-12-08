import { MdOutlineInfo } from "react-icons/md";

export const InfoCard2 = (props) => {
  return (
    <>
      <div
        className="alert alert-warning d-flex align-items-center gap-2 border border-warning fw-bold rounded-4 "
        role="alert"
      >
        <div className="small">{props.text}</div>
      </div>
    </>
  );
};
