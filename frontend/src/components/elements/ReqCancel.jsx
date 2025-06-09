import { useState } from "react";
import Button1 from "./Button1";
import $ from "jquery";
import axios from "axios";
import toastr from "toastr";
import { API_HOST, API_REQ_CANCEL_MATCH } from "../../utils/constants";
import { useTranslation } from "react-i18next";

export const ReqCancel = ({ match }) => {
  const { t } = useTranslation();
  const [working, setWorking] = useState(false);
  const [reason, setReason] = useState("No Room Code");
  $(".reason").click(function () {
    $(".reason").removeClass("btn-primary");
    $(".reason").addClass("btn-outline-primary");
    $(this).removeClass("btn-outline-primary");
    $(this).addClass("btn-primary");
    setReason($(this).text());
  });

  const action = async () => {
    try {
      setWorking(true);
      const headers = {
        "Content-Type": "application/json",
        _t: localStorage.getItem("_tk"),
        _di: localStorage.getItem("_di"),
      };
      const res = await axios.post(
        API_HOST + API_REQ_CANCEL_MATCH,
        {
          matchId: match._id,
          reason: reason,
          ...headers,
        },
        { headers }
      );

      //console.log(res.data);
      if (res.data.success) {
        $(".cancelcanvas").trigger("click");
        toastr.success(t(res.data.message));
      } else {
        toastr.error(t(res.data.message));
        setWorking(false);
      }
    } catch (error) {
      //console.log(error);
      toastr.error(error.response ? error.response.data : error.message);
      setWorking(false);
    }
  };

  return (
    <>
      <div>
        <button
          className="btn btn-sm btn-warning w-100 fw-bold border-dark"
          data-bs-toggle="offcanvas"
          data-bs-target="#cancelreq"
        >
          {t("req_cancel_btn")}
        </button>

        <div
          className="offcanvas offcanvas-bottom h-50"
          tabIndex="-1"
          id="cancelreq"
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
            <div className="fw-bold small">{t("reason_label")}</div>
            <div className="d-flex flex-wrap gap-2 my-3 ">
              <button className="btn rounded-4 px-3 btn-sm btn-primary reason">
                {t("r1")}
              </button>
              <button className="btn rounded-4 px-3 btn-sm btn-outline-primary reason">
                {t("r2")}
              </button>
              <button className="btn rounded-4 px-3 btn-sm btn-outline-primary reason">
                {t("r3")}
              </button>
              <button className="btn rounded-4 px-3 btn-sm btn-outline-primary reason">
                {t("r4")}
              </button>
              <button className="btn rounded-4 px-3 btn-sm btn-outline-primary reason">
                {t("r5")}
              </button>
              <button className="btn rounded-4 px-3 btn-sm btn-outline-primary reason">
                {t("r6")}
              </button>
            </div>

            <Button1
              text={t("sub_can_req")}
              action={action}
              working={working}
              class="btn-dark w-100"
            />

            <div className="small mt-2">
              <b>{t("note")}:</b> {t("cancel_msg")}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
