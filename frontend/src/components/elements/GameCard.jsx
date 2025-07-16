import { useTranslation } from "react-i18next";
import { FaRegCircleDot } from "react-icons/fa6";
import { Link } from "react-router";

export const GameCard = (props) => {
  const { t } = useTranslation();
  ////console.log(props);
  return (
    <>
      <div className={`col-6 p-1 ${props.full && "col-12"}`}>
        <Link
          to={props.status == "live" ? props.path : ""}
          className={`text-decoration-none`}
        >
          <div className="">
            <div
              style={{ fontSize: "10px" }}
              className={`mb-1 text-danger animate__slow ${
                props.status == "coming_soon"
                  ? " text-dark opacity-50"
                  : "animate__animated"
              } animate__flash animate__infinite text-decoration-none`}
            >
              {!props.full && (
                <div>
                  <FaRegCircleDot /> {t(props.status)}
                </div>
              )}
            </div>

            <img
              src={props.banner + "?v=5"}
              className={`w-100 rounded border border-warning border-3 ${
                props.status == "coming_soon" ? " text-dark opacity-50" : ""
              }`}
            />
          </div>
        </Link>
      </div>
    </>
  );
};
