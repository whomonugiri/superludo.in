import { Outlet } from "react-router";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useDispatch } from "react-redux";
import { AutoLogin } from "./AutoLogin";

const Master = () => {
  return (
    <>
      <Header />
      <Sidebar />
      <div className="d-flex justify-content-center">
        <div className="col-12 col-md-5 px-3">
          <Outlet />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Master;
