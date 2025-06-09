import { GiDiceSixFacesSix } from "react-icons/gi";
import Button1 from "./Button1";
import { useTranslation } from "react-i18next";

export const EnterRoomCard = (props) => {
  const { t } = useTranslation();
  return (
    <>
      {" "}
      <div className="p-2 border rounded-2 my-3 bg-primary-light">
        <div className="my-3 text-center fw-bold fs-1 text-primary">
          {props.time}
        </div>

        <div className="fw-bold  mb-2 text-center">{t("enter_room_code")}</div>
        <div className="d-flex">
          <div className="input-group border border-primary rounded-1">
            <span
              className="input-group-text fw-bold bg-white border-0"
              id="basic-addon1"
            >
              <GiDiceSixFacesSix />
            </span>
            <input
              type="number"
              id={props.id}
              className="form-control  rounded-0 border-0 fw-bold"
              placeholder=""
            />
          </div>
          <Button1
            action={props.action}
            text={t("submit_btn")}
            working={props.working}
            class="btn-primary rounded-0 rounded-end fw-bold"
          />
        </div>

        <div className=" x-small my-2 text-danger">
          <b>{t("note")} :</b> {t("match_message_1")}
        </div>
      </div>
    </>
  );
};
