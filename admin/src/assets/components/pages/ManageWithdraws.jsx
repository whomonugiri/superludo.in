import { useEffect, useState } from "react";
import { fetcher } from "../../../utils/api.manager";
import { DashButton } from "../elements/DashButton";
import { UserManualMatchesItem } from "../elements/UserManualMatchesItem";
import { WithdrawItem } from "../elements/WithdrawItem";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const ManageWithdraws = () => {
  const auth = "MANAGE WITHDRAW";
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [menu, setMenu] = useState("pending");
  const [withdraws, setWithdraws] = useState([]);
  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    setWithdraws([]);
  };

  const handleMenu = (menu) => {
    setMenu(menu);
    setPage(1);
    setWithdraws([]);
  };

  const navigate = useNavigate();
  const { _access, _isSuperadmin } = useSelector((store) => store.auth);
  useEffect(() => {
    if (!_access.includes(auth) && !_isSuperadmin) navigate("/");

    fetcher(
      "/fetchWithdraws",
      { status: menu, keyword: keyword },
      page,
      setPage,
      setWithdraws
    );
  }, [page, withdraws]);

  return (
    <>
      <div className="p-2 rounded shadow-sm bg-white mx-2">
        <div className="p-2 bg-white rounded mb-3">
          <div className="mb-1">Manage Withdraws</div>
          <div className="d-flex gap-1 flex-wrap">
            <DashButton current={menu} action={handleMenu} text="all" />
            <DashButton current={menu} action={handleMenu} text="completed" />
            <DashButton current={menu} action={handleMenu} text="pending" />
            <DashButton current={menu} action={handleMenu} text="cancelled" />
          </div>
          <form onSubmit={handleSearch}>
            <div className="d-flex gap-2 mt-2">
              <input
                type="text"
                className="form-control"
                placeholder="enter txnid"
                onChange={(e) => setKeyword(e.target.value)}
              />
              <button className="btn btn-outline-primary mb-0" type="submit">
                FIND
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="">
        {withdraws.length > 0 && (
          <div className="">
            {withdraws.map((withdraw) => (
              <WithdrawItem key={withdraw._id} withdraw={withdraw} />
            ))}
          </div>
        )}

        {withdraws.length < 1 && (
          <div className="text-center py-2">no withdrawal found</div>
        )}
      </div>
    </>
  );
};
