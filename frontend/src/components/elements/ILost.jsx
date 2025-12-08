import { useState } from "react";
import Button1 from "./Button1";
import $ from "jquery";
import axios from "axios";
import toastr from "toastr";
import {
  API_HOST,
  API_REQ_CANCEL_MATCH,
  API_SUBMIT_I_LOST,
  API_SUBMIT_I_WON,
} from "../../utils/constants";
import { useTranslation } from "react-i18next";
import { FaRegThumbsDown, FaRegThumbsUp } from "react-icons/fa";

export const ILost = ({ match }) => {
  const { t } = useTranslation();
  const [working, setWorking] = useState(false);

  const handleLost = async () => {
    try {
      setWorking(true);
      const headers = {
        "Content-Type": "application/json",
        _t: localStorage.getItem("_tk"),
        _di: localStorage.getItem("_di"),
      };

      const res = await axios.post(
        API_HOST + API_SUBMIT_I_LOST,
        {
          matchId: match._id,
          ...headers,
        },
        {
          headers,
        }
      );
      ////console.log(res.data);
      if (res.data.success) {
        $(".cancelcanvas").trigger("click");
        toastr.success(t(res.data.message));
      } else {
        toastr.error(t(res.data.message));
        setWorking(false);
      }
    } catch (error) {
      ////console.log(error);
      toastr.error(error.response ? error.response.data : error.message);
      setWorking(false);
    }
  };

  return (
    <>
      <div className="w-100">
        <button
          className="btn btn-danger w-100 fw-bold d-flex justify-content-center align-items-center gap-2 text-nowrap"
          data-bs-toggle="offcanvas"
          data-bs-target="#ilost"
        >
          <FaRegThumbsDown /> {t("i_lost")}
        </button>

        <div
          className="offcanvas offcanvas-bottom"
          tabIndex="-1"
          id="ilost"
          aria-labelledby="offcanvasBottomLabel"
        >
          <div className="offcanvas-header pb-0">
            <button
              type="button"
              className="btn-close cancelcanvas"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <div className="fw-bold small mb-3"></div>

            <Button1
              text={t("sub_lost")}
              action={handleLost}
              working={working}
              class="btn-dark w-100"
            />
          </div>
        </div>
      </div>
    </>
  );
};
