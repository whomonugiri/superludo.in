import { useTranslation } from "react-i18next";
import { MdVerified } from "react-icons/md";
import { truncateName } from "../../game/twoplayer/helpers/ActionHandler";

export const RMatch = ({ match }) => {
  const { t } = useTranslation();
  return (
    <>
      <div className="p-1 px-2 rounded-2 bg-primary-light border my-3 animate__animated animate__backInLeft animate__fast">
        <div className="border-bottom border-2 py-1 d-flex justify-content-between">
          <div className="x-small fw-bold d-flex gap-2">
            {t("playing_for")}{" "}
            <span className="text-primary d-flex gap-1 align-items-center">
              {" "}
              <img src="assets/money2.png" height="18px" />
              {match.entryFee}
            </span>
          </div>
          <div className="x-small fw-bold d-flex gap-2">
            {t("prize")}{" "}
            <span className="text-primary d-flex gap-1 align-items-center">
              {" "}
              <img src="assets/money2.png" height="18px" />
              {match.prize}
            </span>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center py-1 ">
          <div className="text-center py-0 fw-bold">
            <img
              src={`assets/avatars/${match.hostData.profilePic}`}
              className="rounded-circle border"
              height="40px"
            />
            <div className="small d-flex gap-1 align-items-center">
              {truncateName(match.hostData.fullName)}{" "}
              {match.hostData.kyc ? (
                <MdVerified className="text-primary" title="KYC Completed" />
              ) : (
                ""
              )}
            </div>
          </div>
          <div>
            <img src="assets/vv.png" height="40px" />
          </div>
          <div className="text-center py-0 fw-bold">
            <img
              src={`assets/avatars/${match.joinerData.profilePic}`}
              className="rounded-circle border"
              height="40px"
            />
            <div className="small d-flex gap-1 align-items-center">
              {truncateName(match.joinerData.fullName)}{" "}
              {match.joinerData.kyc ? (
                <MdVerified className="text-primary" title="KYC Completed" />
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
