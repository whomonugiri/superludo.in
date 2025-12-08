import { useEffect, useState } from "react";
import { DashButton } from "../elements/DashButton";
import { AddAdmin } from "../elements/AddAdmin";
import { AdminList } from "../elements/AdminList";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const ManageAdmins = () => {
  const [menu, setMenu] = useState("Admin List");
  const handleMenu = (menu) => {
    setMenu(menu);
  };

  const navigate = useNavigate();
  const { _access, _isSuperadmin } = useSelector((store) => store.auth);
  useEffect(() => {
    if (!_isSuperadmin) navigate("/");
  }, []);
  return (
    <>
      <div>
        <div className="p-2 my-2 d-flex gap-2 flex-wrap">
          <DashButton current={menu} action={handleMenu} text="Admin List" />
          <DashButton current={menu} action={handleMenu} text="Add New Admin" />
        </div>

        {menu == "Admin List" && <AdminList />}

        {menu == "Add New Admin" && <AddAdmin setMenu={setMenu} />}
      </div>
    </>
  );
};
