import { useEffect, useState } from "react";
import { base, fetcher } from "../../../utils/api.manager";
import axios from "axios";
import toastr from "toastr";
import { UserListItem } from "../elements/UserListItem";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const ManageUsers = () => {
  const auth = "MANAGE USER";
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [users, setUsers] = useState([]);
  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    setUsers([]);
  };
  const navigate = useNavigate();
  const { _access, _isSuperadmin } = useSelector((store) => store.auth);
  useEffect(() => {
    if (!_access.includes(auth) && !_isSuperadmin) navigate("/");

    fetcher("/fetchUsersList", { keyword: keyword }, page, setPage, setUsers);
  }, [page, users]);
  return (
    <>
      <div className="p-2 bg-white rounded shadow mb-3">
        <div>Manage Users </div>
        <form onSubmit={handleSearch}>
          <div className="d-flex gap-2 mt-2">
            <input
              type="text"
              className="form-control"
              placeholder="enter name, mobile number or username"
              onChange={(e) => setKeyword(e.target.value)}
            />
            <button className="btn btn-outline-primary mb-0" type="submit">
              FIND
            </button>
          </div>
        </form>
      </div>

      {users.length > 0 && (
        <div className="d-flex flex-wrap">
          {users.map((user) => (
            <UserListItem key={user._id} user={user} />
          ))}
        </div>
      )}

      {users.length < 1 && (
        <div className="text-center py-5">No Users Found</div>
      )}
    </>
  );
};
