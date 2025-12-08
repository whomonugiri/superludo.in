import { NavLink } from "react-router-dom";

export const SidebarNavItem = (props) => {
  const closeSidebar = () => {
    document.body.classList.remove("g-sidenav-pinned");
  };
  return (
    <>
      <li className="nav-item" onClick={closeSidebar}>
        <NavLink className={`nav-link`} to={props.to}>
          <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center fs-6">
            {props.icon}
          </div>
          <span className="nav-link-text ms-1">{props.title}</span>
        </NavLink>
      </li>
    </>
  );
};
