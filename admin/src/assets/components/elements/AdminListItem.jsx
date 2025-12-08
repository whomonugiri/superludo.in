import { Link } from "react-router-dom";
import {
  base,
  formatTimestamp,
  singleFetcher,
} from "../../../utils/api.manager";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";
import toastr from "toastr";

export const AdminListItem = ({ admin }) => {
  const [working, setWorking] = useState(false);

  const [_admin, _setAdmin] = useState(admin);

  const updateAdmin = function (e) {
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
      .post(base("/updateAdmin"), data)
      .then(function (response) {
        console.log("response : ", response.data);
        if (response.data.success) {
          toastr.success(response.data.message);
          _setAdmin(response.data.data);
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

  const deleteAdmin = function (adminId) {
    setWorking(true);

    const data = {};
    data._token = localStorage.getItem("_token");
    data._deviceId = localStorage.getItem("_deviceId");
    data._id = adminId;

    axios
      .post(base("/deleteAdmin"), data)
      .then(function (response) {
        console.log("response : ", response.data);
        if (response.data.success) {
          toastr.success(response.data.message);
          _setAdmin(null);
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

  return (
    <>
      {_admin && (
        <div className="p-1 my-3 mx-2 bg-white rounded shadow-sm border">
          <div className="d-flex  justify-content-between">
            <div className="d-flex gap-2">
              <img
                src={`/assets/avatars/admin.png`}
                height="70px"
                className=" rounded border"
              />

              <div style={{ lineHeight: "17px" }}>
                <div className="small fw-bold text-primary">
                  {" "}
                  {_admin.name}{" "}
                </div>
                <div className="small">
                  {_admin.emailId} <span></span>
                </div>
                <div
                  className={`xs-small text-center rounded fw-bold  ${
                    _admin.status == "inactive" && "bg-danger text-white"
                  } ${_admin.status == "active" && "bg-success text-white"}`}
                >
                  {_admin.status}
                </div>
                <div className="xs-small">
                  created at {formatTimestamp(_admin.createdAt)}
                </div>
              </div>
            </div>

            <div>
              <div className=" xs-small d-flex justify-content-end gap-1 flex-wrap ">
                {_admin.access.map((ac) => (
                  <div className="bg-info text-white px-1 rounded" key={ac}>
                    {ac}
                  </div>
                ))}
              </div>

              <div className="d-flex justify-content-end align-items-end mt-1">
                {
                  <div className="text-end">
                    <button
                      className={`btn btn-sm p-0 m-0 xs-small  px-2 py-1 mb-1 mx-1 bg-gradient-danger  ${
                        working ? "disabled " : ""
                      }`}
                      onClick={() => deleteAdmin(_admin._id)}
                    >
                      Delete Admin
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm p-0 m-0 xs-small  px-2 py-1 mb-1 bg-gradient-primary"
                      data-bs-toggle="collapse"
                      data-bs-target={`#update${_admin._id}`}
                      aria-expanded="false"
                      aria-controls="collapseExample"
                    >
                      Update Admin
                    </button>
                  </div>
                }
              </div>
            </div>
          </div>

          <div
            className="collapse pt-3 mt-2 border-top w-100"
            id={`update${_admin._id}`}
          >
            {/* ################## */}

            <div className="border bg-shadow-sm rounded p-3 mx-2 bg-white">
              <div className="small fw-bold text-dark">Update Admin</div>
              <form onSubmit={updateAdmin}>
                <input type="hidden" name="_id" value={_admin._id} />
                <div className="d-flex flex-wrap">
                  <div className="col-12 col-md-4 p-1">
                    <div className="small fw-bold">Name</div>
                    <input
                      type="text"
                      name="name"
                      className="form-control form-control-sm "
                      defaultValue={_admin.name}
                    />
                  </div>

                  <div className="col-12 col-md-4 p-1">
                    <div className="small fw-bold">Email Id</div>
                    <input
                      type="email"
                      name="emailId"
                      className="form-control form-control-sm "
                      defaultValue={_admin.emailId}
                    />
                  </div>

                  <div className="col-12 col-md-4 p-1">
                    <div className="small fw-bold">Password (new password)</div>
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
                      defaultValue={_admin.status}
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
                        <div
                          key={index}
                          className="col-6 form-check form-switch"
                        >
                          <input
                            name="access[]"
                            defaultValue={permission}
                            className="form-check-input"
                            type="checkbox"
                            id={`p${_admin._id + index}`}
                            defaultChecked={_admin.access.includes(permission)}
                            onChange={(e) => {}}
                          />
                          <label
                            className="form-check-label fw-bold"
                            htmlFor={`#p${_admin._id + index}`}
                          >
                            {permission}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <button
                  className={`btn btn-sm btn-dark w-100 mt-2 ${
                    working ? "disabled " : ""
                  }`}
                >
                  UPDATE ADMIN
                </button>
              </form>
            </div>

            {/* ######################## */}
          </div>
        </div>
      )}
    </>
  );
};
