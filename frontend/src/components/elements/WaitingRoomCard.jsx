import { GiDiceSixFacesSix } from "react-icons/gi";
import Button1 from "./Button1";
import { useTranslation } from "react-i18next";

export const WaitingRoomCard = (props) => {
  const { t } = useTranslation();
  return (
    <>
      {" "}
      <div className="p-2 border rounded-2 my-3 bg-primary-light">
        <div className="my-3 text-center fw-bold fs-1 text-primary">
          {props.time}
        </div>

        <div className="fw-bold  mb-2 text-center">{t("wait_room_code")}</div>
        <div className="text-center">
          <img src="assets/loading2.svg" height="80px" />
        </div>

        <div className=" x-small my-2 text-danger">
          <b>{t("note")} :</b> {t("match_message_1")}
        </div>
      </div>
    </>
  );
};
