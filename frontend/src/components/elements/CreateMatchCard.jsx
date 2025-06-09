import { useTranslation } from "react-i18next";
import Button1 from "./Button1";
import { useSelector } from "react-redux";
import { MdOutlineInfo } from "react-icons/md";

export const CreateMatchCard = (props) => {
  const { t, i18n } = useTranslation();
  const { textData } = useSelector((store) => store.auth);
  return (
    <>
      {" "}
      <div className="p-2 border rounded-2 my-3 bg-primary-light">
        <div className="d-flex justify-content-between mb-2 align-items-center">
          <div className="fw-bold  mb-2 fs-5">{t("create_battle_label")}</div>
          <div className="">
            {/* //user */}
            <button
              className="btn btn-outline-primary btn-sm d-flex align-items-center gap-1"
              data-bs-toggle="offcanvas"
              data-bs-target="#avatars"
            >
              <MdOutlineInfo /> {t("guide_btn")}
            </button>

            <div
              className="offcanvas offcanvas-bottom h-75"
              tabIndex="-1"
              id="avatars"
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
                <div
                  dangerouslySetInnerHTML={{
                    __html:
                      textData &&
                      textData["Classic Manual"] &&
                      textData["Classic Manual"][
                        i18n.language == "hindi" ? "hindi" : "english"
                      ],
                  }}
                />
                {}
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex">
          <div className="input-group">
            <span className="input-group-text fw-bold" id="basic-addon1">
              ₹
            </span>
            <input
              type="number"
              id={props.id}
              className="form-control  rounded-0 fw-bold"
              placeholder="0"
            />
          </div>
          <Button1
            action={props.action}
            text={t("create_btn")}
            working={props.working}
            class="btn-primary rounded-0 rounded-end fw-bold"
          />
        </div>
      </div>
    </>
  );
};
