import { useEffect, useState } from "react";
import { PostForm } from "../elements/PostForm";
import { singleFetcher } from "../../../utils/api.manager";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const Account = () => {
  const [admin, setAdmin] = useState(null);
  const navigate = useNavigate();
  const { _access, _isSuperadmin } = useSelector((store) => store.auth);
  useEffect(() => {
    if (!_isSuperadmin) navigate("/");
    singleFetcher("/fetchAdmin", {}, setAdmin, () => {});
  }, []);
  return (
    <>
      <div className="border mx-2 p-4 shadow rounded bg-white">
        <div className="fw-bold mb-2 border-bottom">SuperAdmin Credentials</div>
        <PostForm
          action="/updateAdmin"
          subBtn="UPDATE CREDENTIALS"
          subBtnClass="btn bg-gradient-warning mt-3 w-100 mb-2"
          loaderColor="white"
        >
          <input type="hidden" name="_id" defaultValue={admin && admin._id} />
          <div className="d-flex flex-column gap-3">
            <div>
              <div className="fw-bold small">Name</div>
              <input
                type="text"
                name="name"
                defaultValue={admin && admin.name}
                className="form-control form-control-sm"
              />
            </div>

            <div>
              <div className="fw-bold small">Email Id</div>
              <input
                type="email"
                name="emailId"
                defaultValue={admin && admin.emailId}
                className="form-control form-control-sm"
              />
            </div>

            <div>
              <div className="fw-bold small">
                New Password (leave blank if do not want change)
              </div>
              <input
                type="text"
                name="password"
                defaultValue={""}
                className="form-control form-control-sm"
              />
            </div>
          </div>
        </PostForm>
      </div>
    </>
  );
};
