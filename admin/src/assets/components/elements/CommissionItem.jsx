import { useState } from "react";
import { singleFetcher } from "../../../utils/api.manager";

export const CommissionItem = ({ param, set }) => {
  const [_param, _setParam] = useState(param);

  const remove = () => {
    _setParam(null);
  };

  const deleteParam = () => {
    singleFetcher("/deleteParam", { _id: param._id }, remove, () => {});
  };
  return (
    <>
      {_param && (
        <tr>
          <td>₹ {_param.minAmount}</td>
          <td>₹ {_param.maxAmount}</td>
          <td>{_param.commission}</td>

          <td>
            <button
              className="p-0 px-2 btn btn-sm btn-danger m-0"
              onClick={deleteParam}
            >
              Delete
            </button>
          </td>
        </tr>
      )}
    </>
  );
};
