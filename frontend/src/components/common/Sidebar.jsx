import {
  FaFileLines,
  FaMoneyBillTransfer,
  FaRankingStar,
} from "react-icons/fa6";
import { MdKeyboardArrowRight, MdMobileScreenShare } from "react-icons/md";
import { useSelector } from "react-redux";
import { SidebarButton } from "../elements/SidebarButton";
import { SiReadthedocs } from "react-icons/si";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { GiTakeMyMoney } from "react-icons/gi";
import { LiaDiceD6Solid } from "react-icons/lia";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { GrChat } from "react-icons/gr";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import $ from "jquery";
import { FaHome } from "react-icons/fa";
import { MdOutlineVerified, MdVerified } from "react-icons/md";
import { Button5 } from "../elements/Button5"; // Assuming Button5 is used for the language toggle

const Sidebar = () => {
  const { t, i18n } = useTranslation();
  const { profile, fullName, mobileNumber, kyc } = useSelector(
    (store) => store.auth
  );
  const navigate = useNavigate();

  const toggleLanguage = () => {
    if (i18n.language === "english") {
      i18n.changeLanguage("hindi");
    } else {
      i18n.changeLanguage("english");
    }
  };

  return (
    <>
      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="sidebar"
        aria-labelledby="offcanvasExampleLabel"
        style={{ width: "90%" }}
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasExampleLabel"></h5>
          <button
            type="button"
            id="sidebar-close-btn"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <div
            className="bg-primary rounded-2 mb-3"
            onClick={() => {
              navigate("/profile");
              $("#sidebar-close-btn").trigger("click");
            }}
          >
            <div className="border p-2 rounded-2 d-flex gap-2 align-items-center text-white shadow-sm bg-transparent bg-overlay">
              <img
                src={`assets/avatars/${profile}`}
                height="50px"
                className="rounded-circle border"
              />
              <div>
                <div className="fw-bold d-flex gap-1 align-items-center">
                  {fullName}{" "}
                  {kyc ? (
                    <MdVerified className="text-white" title="KYC Completed" />
                  ) : (
                    ""
                  )}
                </div>
                <div>{mobileNumber}</div>
              </div>
            </div>
          </div>

          {/* Sidebar buttons */}
          <SidebarButton title={t("home_btn")} icon={<FaHome />} path="/" />
          <SidebarButton
            title={t("sidebar_transactions")}
            icon={<FaFileLines />}
            path="/transactions"
          />
          <SidebarButton
            title={t("sidebar_add_money")}
            icon={<RiMoneyRupeeCircleFill />}
            path="/deposit"
          />
          <SidebarButton
            title={t("sidebar_withdraw")}
            icon={<GiTakeMyMoney />}
            path="/withdraw"
          />

          <SidebarButton
            title={t("sidebar_leaderboard")}
            icon={<FaRankingStar />}
            path="/leaderboard"
          />
          <SidebarButton
            title={t("sidebar_match_history")}
            icon={<LiaDiceD6Solid />}
            path="/matches"
          />
          <SidebarButton
            title={t("sidebar_refer")}
            icon={<MdMobileScreenShare />}
            path="/refer"
          />
          <SidebarButton
            title={t("sidebar_chat_support")}
            icon={<GrChat />}
            path="/chat"
          />

          {/* New Language Button */}
          <Button5 action={toggleLanguage} text={t("language_btn")} icon={<MdOutlineVerified />} />

          {/* sidebar buttons ends */}

          {/* Important links */}
          <div className="d-flex gap-3 flex-wrap justify-content-center mt-3">
            <a href="#" className="text-decoration-none small">
              {t("page_about_us")}
            </a>
            <a href="#" className="text-decoration-none small">
              {t("page_privacy_policy")}
            </a>
            <a href="#" className="text-decoration-none small">
              {t("page_terms")}
            </a>
          </div>

          {/* Important links ends here */}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
