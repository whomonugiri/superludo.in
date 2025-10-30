import {
  HiFire,
  HiHome,
  HiMiniShare,
  HiUser,
  HiUserPlus,
} from "react-icons/hi2";
import { Button4 } from "../elements/Button4";
import { useTranslation } from "react-i18next";
import { BiHome, BiLogIn, BiRupee } from "react-icons/bi";
import { useSelector } from "react-redux";
import {
  FaFileLines,
  FaRankingStar,
  FaRegCircleUser,
  FaRegUser,
  FaShare,
} from "react-icons/fa6";
import { HiTranslate } from "react-icons/hi";
import { Button5 } from "../elements/Button5";
import toastr from "toastr";
import { FloatButton } from "../elements/FloatButton";

const Footer = () => {
  const { t, i18n } = useTranslation();
  const { isAuth } = useSelector((store) => store.auth);
  const toggleLanguage = () => {
    if (i18n.language == "english") i18n.changeLanguage("hindi");
    else i18n.changeLanguage("english");

    toastr.success(t(i18n.language + "_change_msg"));
  };

  return (
    <>
      {isAuth && <FloatButton />}
      <nav className="navbar fixed-bottom bg-body-tertiary border-top shadow">
        <div className="container-fluid d-flex justify-content-around">
          {/* {!isAuth && (
            <Button4 path="/login" text={t("login_btn")} icon={<BiLogIn />} />
          )} */}
          {/* {isAuth && (
            <Button4
              path="/register"
              text={t("register_btn")}
              icon={<HiUserPlus />}
            />
          )} */}
          {isAuth && (
            <Button4 path="/" text={t("home_btn")} icon={<BiHome />} />
          )}

          {isAuth && (
            <Button4
              path="/profile"
              text={t("profile_btn")}
              icon={<HiUser />}
            />
          )}

          {isAuth && (
            <Button4 path="/deposit" text={t("Add Money")} icon={<BiRupee />} />
          )}

          {isAuth && (
            <Button4
              path="/leaderboard"
              text={t("Leaderboard")}
              icon={<FaRankingStar />}
            />
          )}

          {isAuth && (
            <Button4
              path="/refer"
              text={t("refer_btn")}
              icon={<HiMiniShare />}
            />
          )}

          {/* <Button5
            action={toggleLanguage}
            text={t("language_btn")}
            icon={<HiTranslate />}
          /> */}

          {!isAuth && (
            <div className="fw-bold animate__animated animate__rubberBand animate__infinite animate__slow">
              www.superludo.in
            </div>
          )}
        </div>
      </nav>
      <div className="my-5 py-5"></div>
    </>
  );
};

export default Footer;
