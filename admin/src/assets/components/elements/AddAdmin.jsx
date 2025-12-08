import { useState } from "react";
import { base } from "../../../utils/api.manager";
import axios from "axios";
import toastr from "toastr";

export const AddAdmin = ({ setMenu }) => {
  const permissions = [
    "MANAGE USER",
    "ADD TRANSACTION",
    "CHAT SUPPORT",
    "MANAGE DEPOSIT",
    "MANAGE WITHDRAW",
    "PENDING RESULT",
    "CANCEL REQUEST",
    "MANAGE CONFLICT",
    "MANAGE MATCH",
    "DASHBOARD REPORT",
  ];
  const [working, setWorking] = useState(false);

  const handleFormSubmit = function (e) {
    setWorking(true);
    e.preventDefault();
    const form = e.target;
    const data = {};
    data._token = localStorage.getItem("_token");
    data._deviceId = localStorage.getItem("_deviceId");
    new FormData(e.target).forEach((value, key) => {
      if (key === "access[]") {
        // If key is "access[]", store values in an array
        if (!data.access) {
          data.access = [];
        }
        data.access.push(value);
      } else {
        data[key] = value.trim();
      }
    });

    axios
      .post(base("/addNewAdmin"), data)
      .then(function (response) {
        console.log("response : ", response.data);
        if (response.data.success) {
          toastr.success(response.data.message);
          setMenu("Admin List");
        } else {
          toastr.error(response.data.message);
        }
        setWorking(false);
      })
      .catch(function (error) {
        toastr.error(error.response ? error.response.data : error.message);
        setWorking(false);
      });
  };
  return (
    <>
      <div className="border bg-shadow-sm rounded p-3 mx-2 bg-white">
        <div className="small fw-bold text-dark">Add Admin</div>
        <form onSubmit={handleFormSubmit}>
          <div className="d-flex flex-wrap">
            <div className="col-12 col-md-4 p-1">
              <div className="small fw-bold">Name</div>
              <input
                type="text"
                name="name"
                className="form-control form-control-sm "
              />
            </div>

            <div className="col-12 col-md-4 p-1">
              <div className="small fw-bold">Email Id</div>
              <input
                type="email"
                name="emailId"
                className="form-control form-control-sm "
              />
            </div>

            <div className="col-12 col-md-4 p-1">
              <div className="small fw-bold">Password</div>
              <input
                type="text"
                name="password"
                className="form-control form-control-sm "
              />
            </div>

            <div className="col-12 col-md-4 p-1">
              <div className="small fw-bold">Status</div>
              <select
                // ref={walletRef}
                className="form-control form-control-sm"
                name="status"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="mt-3 border-top pt-3">
            <div className="d-flex flex-wrap">
              {permissions.map((permission, index) => {
                return (
                  <div key={index} className="col-6 form-check form-switch">
                    <input
                      name="access[]"
                      value={permission}
                      className="form-check-input"
                      type="checkbox"
                      id={`p${index}`}
                    />
                    <label
                      className="form-check-label fw-bold"
                      htmlFor={`#p${index}`}
                    >
                      {permission}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
          <button
            className={`btn btn-sm btn-primary w-100 mt-2 ${
              working ? "disabled " : ""
            }`}
          >
            ADD ADMIN
          </button>
        </form>
      </div>
    </>
  );
};
