import { useEffect, useState } from "react";
import { fetcher } from "../../../utils/api.manager";
import { AdminListItem } from "./AdminListItem";

export const AdminList = () => {
  const [admins, setAdmins] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetcher("/fetchAdmins", {}, page, setPage, setAdmins);
  });
  return (
    <>
      <div>
        {admins.length > 0 &&
          admins.map((admin) => (
            <AdminListItem admin={admin} key={admin._id} />
          ))}

        {admins.length < 1 && (
          <div className="text-center">no admins found</div>
        )}
      </div>
    </>
  );
};
