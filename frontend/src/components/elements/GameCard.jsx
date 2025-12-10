import { useTranslation } from "react-i18next";
import { FaRegCircleDot } from "react-icons/fa6";
import { Link } from "react-router";

export const GameCard = (props) => {
  const { t } = useTranslation();
  let title = props.title;
  if (props.title == "Quick Ludo") title = "Moves Ludo";

  ////console.log(props);
  return (
    <>
      <div className={`col-6 p-1 ${props.full && "col-12"}`}>
        <Link
          to={props.status == "live" ? props.path : ""}
          className={`text-decoration-none`}
        >
          <div className="rounded-5 border border-warning border-5 bg-warning overflow-hidden">
            <div className="shiny-container bg-warning">
              <img
                src={props.banner}
                className={`shiny-image w-100 rounded-2  shadow ${
                  props.status == "coming_soon" ? " text-dark opacity-50" : ""
                }`}
              />
              <div className="shine"></div>
              <div className="text-dark fw-bold text-center ">
                {title.toUpperCase()}
              </div>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};
