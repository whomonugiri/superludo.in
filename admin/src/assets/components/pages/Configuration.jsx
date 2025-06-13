import { useEffect, useState } from "react";
import { PostForm } from "../elements/PostForm";
import { singleFetcher } from "../../../utils/api.manager";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const Configuration = () => {
  const [configs, setConfigs] = useState(null);
  const navigate = useNavigate();
  const { _access, _isSuperadmin } = useSelector((store) => store.auth);
  useEffect(() => {
    if (!_isSuperadmin) navigate("/");
    singleFetcher("/fetchConfig", {}, setConfigs, () => {});
  }, []);
  return (
    <>
      <div className="border mx-2 p-4 shadow rounded bg-white">
        <div className="fw-bold mb-2 border-bottom">Website Configuration</div>
        <PostForm
          action="/updateConfig"
          subBtn="UPDATE WEBSITE CONFIGURATION"
          subBtnClass="btn bg-gradient-dark mt-3 w-100 mb-2"
          loaderColor="white"
        >
          {configs &&
            Object.entries(configs).map(([key, value]) => {
              if (
                key == "__v" ||
                key == "createdAt" ||
                key == "updatedAt" ||
                key == "_id" ||
                key == "PAYTM_PAYMENT_VERIFICATION_URL" ||
                // key == "FAST2SMS_APIKEY" ||
                // key == "FAST2SMS_ROUTE" ||
                // key == "FAST2SMS_SENDER_ID" ||
                // key == "FAST2SMS_MESSAGE" ||
                key == "PAYTM_CHECKSUM"
              )
                return;
              return (
                <div key={key} className="my-3">
                  <div className="small fw-bold text-dark">
                    {key.replaceAll("_", " ")}
                  </div>
                  <input
                    type="text"
                    name={key}
                    className="form-control"
                    defaultValue={value}
                  />
                </div>
              );
            })}
        </PostForm>
      </div>
    </>
  );
};
