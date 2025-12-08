import {
  MdOutlineInfo,
  MdOutlineWarning,
  MdOutlineWarningAmber,
} from "react-icons/md";

export const InfoCard1 = (props) => {
  return (
    <>
      <div
        className="alert alert-danger d-flex align-items-center gap-2"
        role="alert"
      >
        <div className="small">{props.text}</div>
      </div>
    </>
  );
};
