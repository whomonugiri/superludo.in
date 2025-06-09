import { FaAngleRight } from "react-icons/fa6";
import { MdKeyboardArrowRight } from "react-icons/md";
import { NavLink } from "react-router";
import $ from "jquery";

export const SidebarButton = (props) => {
  return (
    <>
      {" "}
      <NavLink
        to={props.path}
        className="text-decoration-none sidebarlink text-dark "
        onClick={() => {
          $("#sidebar-close-btn").trigger("click");
        }}
      >
        <div className="d-flex justify-content-between align-items-center py-1 px-2 my-2 fs-4">
          <div className="d-flex align-items-center gap-2">
            {props.icon} {props.title}
          </div>
          <div>
            <FaAngleRight />
          </div>
        </div>
        <div className="border-bottom"></div>
      </NavLink>
    </>
  );
};
