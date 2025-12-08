import { IoInformationCircleOutline } from "react-icons/io5";
import { formatTimestamp, maskMobile } from "../../../utils/api.manager";

export const Log = ({ log }) => {
  return (
    <>
      <div className="bg-white d-flex align-items-center gap-1 border rounded p-1 my-2">
        <IoInformationCircleOutline className="text-info fs-2" />
        <div>
          <div className="small">{maskMobile(log.message)}</div>
          <div className="xs-small">{formatTimestamp(log.createdAt)}</div>
        </div>
      </div>
    </>
  );
};
