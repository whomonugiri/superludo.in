import { useState } from "react";
import Button1 from "./Button1";
import $ from "jquery";
import axios from "axios";
import toastr from "toastr";
import {
  API_HOST,
  API_REQ_CANCEL_MATCH,
  API_SUBMIT_I_WON,
} from "../../utils/constants";
import { useTranslation } from "react-i18next";
import { FaRegThumbsUp } from "react-icons/fa";

export const IWon = ({ match }) => {
  const [image, setImage] = useState(null);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const { t } = useTranslation();
  const [working, setWorking] = useState(false);

  const handleSubmit = async () => {
    try {
      if (!image) {
        toastr.error(t("select_screenshot"));
        return;
      }

      const formData = new FormData();
      formData.append("image", image);

      formData.append("matchId", match._id);
      //console.log(image, formData);
      setWorking(true);
      const headers = {
        _t: localStorage.getItem("_tk"),
        _di: localStorage.getItem("_di"),
        "Content-Type": "multipart/form-data",
      };

      formData.append("_t", headers._t);
      formData.append("_di", headers._di);

      const res = await axios.post(API_HOST + API_SUBMIT_I_WON, formData);
      //console.log(res.data);
      if (res.data.success) {
        $(".cancelcanvas").trigger("click");
        toastr.success(t(res.data.message));
      } else {
        toastr.error(t(res.data.message));
        setWorking(false);
      }
      $("#screenshot").val("");
    } catch (error) {
      //console.log(error);
      toastr.error(error.response ? error.response.data : error.message);
      setWorking(false);
    }
  };

  return (
    <>
      <div className="w-100">
        <button
          className="btn btn-success w-100 fw-bold d-flex justify-content-center align-items-center gap-2 text-nowrap"
          data-bs-toggle="offcanvas"
          data-bs-target="#iwon"
          style={{ backgroundColor: "#2ecc71" }}
        >
          <FaRegThumbsUp /> {t("i_won")}
        </button>

        <div
          className="offcanvas offcanvas-bottom"
          tabIndex="-1"
          id="iwon"
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
            <div className="fw-bold small">{t("screenshot_label")}</div>

            <div className="d-flex flex-wrap gap-2 my-3 ">
              <input
                type="file"
                id="screenshot"
                accept="image/*"
                className="form-control"
                onChange={handleFileChange}
              />
            </div>

            <Button1
              text={t("sub_win")}
              action={handleSubmit}
              working={working}
              class="btn-dark w-100"
            />

            <div className="small mt-2">
              <b>{t("note")} : </b> {t("iwon_msg")}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
