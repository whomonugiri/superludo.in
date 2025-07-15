import {
  HiFire,
  HiHome,
  HiMiniShare,
  HiUser,
  HiUserPlus,
} from "react-icons/hi2";
import { Button4 } from "../elements/Button4";
import { useTranslation } from "react-i18next";
import { BiLogIn } from "react-icons/bi";
import { useSelector } from "react-redux";
import { RiMoneyRupeeCircleFill, RiMoneyRupeeCircleLine } from "react-icons/ri"; // Deposit icon
import { GiRollingDices, GiTakeMyMoney } from "react-icons/gi"; // Withdraw icon
import { Button5 } from "../elements/Button5";
import toastr from "toastr";
import { FloatButton } from "../elements/FloatButton";
import { CgProfile } from "react-icons/cg";
import { Button7 } from "../elements/Button7";

const Footer = () => {
  const { t, i18n } = useTranslation();
  const { isAuth } = useSelector((store) => store.auth); // Authentication state

  const toggleLanguage = () => {
    if (i18n.language === "english") i18n.changeLanguage("hindi");
    else i18n.changeLanguage("english");

    toastr.success(t(i18n.language + "_change_msg"));
  };

  return (
    <>
      {isAuth && <FloatButton />}
      <nav className="navbar fixed-bottom bg-body-tertiary border-top border-3 shadow">
        <div className="container-fluid d-flex justify-content-around">
          {/* Home Button */}
          <Button4 path="/" text={t("home_btn")} icon={<GiRollingDices />} />

          {/* Show Login and Register buttons only if not authenticated */}
          {!isAuth && (
            <Button4 path="/login" text={t("login_btn")} icon={<BiLogIn />} />
          )}
          {!isAuth && (
            <Button4
              path="/register"
              text={t("register_btn")}
              icon={<HiUserPlus />}
            />
          )}

          {/* Show Profile and Refer buttons if authenticated */}
          {isAuth && (
            <Button4
              path="/profile"
              text={t("profile_btn")}
              icon={<CgProfile />}
            />
          )}

          {/* Show Deposit button if authenticated */}
          {isAuth && (
            <Button7
              path="/deposit"
              text={t("deposit_btn")}
              icon={<RiMoneyRupeeCircleLine />} // Deposit icon
            />
          )}

          {/* Show Withdraw button if authenticated */}
          {isAuth && (
            <Button4
              path="/withdraw"
              text={t("withdraw_btn")}
              icon={<GiTakeMyMoney />} // Withdraw icon
            />
          )}

          {isAuth && (
            <Button4
              path="/refer"
              text={t("refer_btn")}
              icon={<HiMiniShare />}
            />
          )}
        </div>
      </nav>
      <div className="my-5 py-5"></div>
    </>
  );
};

export default Footer;
