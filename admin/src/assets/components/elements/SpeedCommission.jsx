import { useEffect, useRef, useState } from "react";
import { singleFetcher } from "../../../utils/api.manager";
import { CommissionItem } from "./CommissionItem";

export const SpeedCommission = () => {
  const minAmount = useRef();
  const maxAmount = useRef();
  const commission = useRef();

  const [params, setParams] = useState([]);

  const updateParams = (data) => {
    minAmount.current.value = "";
    maxAmount.current.value = "";
    commission.current.value = "";

    setParams(data);
  };
  const addCommissionParam = () => {
    singleFetcher(
      "/addCommisionParam",
      {
        minAmount: minAmount.current.value,
        maxAmount: maxAmount.current.value,
        commission: commission.current.value,

        type: "speed",
      },
      updateParams,
      () => {}
    );
  };

  useEffect(() => {
    singleFetcher(
      "/fetchCommissionParams",
      { type: "speed" },
      updateParams,
      () => {}
    );
  }, []);

  return (
    <>
      <div className="mx-2 p-2 rounded bg-white shadow-sm">
        <div className="fw-bold">SpeedLudo Commission Management</div>
        <div className="d-flex gap-2">
          <div className="w-100">
            <label className="p-0 m-0">Minimum Amount</label>
            <input
              ref={minAmount}
              type="number"
              className="m-0 form-control form-control-sm"
              placeholder="enter amount"
            />
          </div>

          <div className="w-100">
            <label className="p-0 m-0">Maximum Amount</label>
            <input
              ref={maxAmount}
              type="number"
              className="m-0 form-control form-control-sm"
              placeholder="enter amount"
            />
          </div>
          <div className="w-100">
            <label className="p-0 m-0">Commission Percentage (1 = 100%)</label>
            <input
              ref={commission}
              type="number"
              className="m-0 form-control form-control-sm"
              placeholder="enter value"
            />
          </div>
        </div>
        <div>
          <button
            className="mt-2 btn w-100 btn-sm btn-primary m-0"
            onClick={addCommissionParam}
          >
            Add Commission Parameter
          </button>
        </div>
      </div>

      <div className="mx-2 p-2 rounded bg-white shadow-sm mt-3">
        {params && params.length < 1 && (
          <div className="text-center py-2 small">no parameters available</div>
        )}
        {params && params.length > 0 && (
          <div>
            <table className="table table-striped">
              <thead>
                <tr>
                  <td>Minimum Amount</td>
                  <td>Maximum Amount</td>
                  <td>Commission</td>

                  <td>Action</td>
                </tr>
              </thead>
              <tbody>
                {params.map((param) => (
                  <CommissionItem
                    key={param._id}
                    set={updateParams}
                    param={param}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};
