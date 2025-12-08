import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { API_AUTOLOGIN, API_HOST } from "../../utils/constants";
import { authUser, loadingoff, logout } from "../../contexts/slices/authSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { updateBalance, updateUM } from "../../contexts/slices/userSlice";
import toastr from "toastr";

export const AutoLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((store) => store.auth);
  const al = async () => {
    const token = localStorage.getItem("_tk");
    const deviceId = localStorage.getItem("_di");
    if (token && deviceId) {
      try {
        const res = await axios.post(API_HOST + API_AUTOLOGIN, {
          token: token,
          deviceId: deviceId,
        });

        if (res.data.success) {
          dispatch(loadingoff());
          //console.log("auto login success");
          dispatch(authUser(res.data));
          dispatch(updateBalance(res.data.balance));
          dispatch(updateUM(res.data.unreadMessage));
        } else {
          dispatch(loadingoff());
          //console.log(res.data);
          dispatch(logout());
          navigate("/login");
        }
      } catch (error) {
        dispatch(loadingoff());
        //console.log(error);
        toastr.error(error.message);
        navigate("/");
      }
    } else {
      dispatch(loadingoff());
      dispatch(logout());
    }
  };

  useEffect(() => {
    al();
  });
  return (
    <>
      <div></div>
    </>
  );
};
