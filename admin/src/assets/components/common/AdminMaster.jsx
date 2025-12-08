import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { Footer } from "./Footer";

export const AdminMaster = () => {
  return (
    <>
      <Sidebar />
      <main className="px-3 main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
        <Header />
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
