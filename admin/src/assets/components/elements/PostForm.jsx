import { base } from "../../../utils/api.manager";
import axios from "axios";
import { useState } from "react";
import toastr from "toastr";
import { ThreeDots } from "react-loader-spinner";
import { useDispatch } from "react-redux";
import { setAuth } from "../../../contexts/slices/authSlice";
export const PostForm = ({
  children,
  action,
  subBtn,
  subBtnClass,
  loaderColor,
  hideBtn,
  formRef,
}) => {
  const dispatch = useDispatch();
  const [working, setWorking] = useState(false);

  const handleFormSubmit = function (e) {
    setWorking(true);
    e.preventDefault();
    const form = e.target;
    const data = {};
    data._token = localStorage.getItem("_token");
    data._deviceId = localStorage.getItem("_deviceId");
    new FormData(e.target).forEach((value, key) => {
      data[key] = value.trim();
    });
    axios
      .post(form.action, data)
      .then(function (response) {
        //console.log("response : ", response.data);
        if (response.data.success) {
          if (response.data.auth) {
            dispatch(setAuth(response.data.auth));
          }
          toastr.success(response.data.message);
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
      {" "}
      <form
        ref={formRef}
        method="post"
        action={base(action)}
        onSubmit={handleFormSubmit}
      >
        {children}
        <div className="">
          {!hideBtn && (
            <button
              type="submit"
              className={` ${subBtnClass} text-nowrap ${
                working ? "disabled" : ""
              }`}
            >
              <div className="d-flex gap-2 justify-content-center align-items-center">
                <ThreeDots
                  visible={working}
                  height="8"
                  width="25"
                  color={loaderColor}
                  radius="15"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />{" "}
                {subBtn}
              </div>
            </button>
          )}
        </div>
      </form>
    </>
  );
};
