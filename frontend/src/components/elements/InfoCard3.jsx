import { Trans } from "react-i18next";
import {
  MdOutlineInfo,
  MdOutlineWarning,
  MdOutlineWarningAmber,
} from "react-icons/md";

export const InfoCard3 = (props) => {
  return (
    <>
      <div
        className="alert alert-danger d-flex align-items-center gap-2"
        role="alert"
      >
        <div className="small">
          <div className="small fw-bold">{props.title}</div>

          {props.text}
          <div className="small fw-bold">{props.subtitle}</div>
        </div>
      </div>
    </>
  );
};
