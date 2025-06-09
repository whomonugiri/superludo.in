import { useEffect, useState } from "react";
import { fetcher } from "../../../utils/api.manager";
import { DashButton } from "../elements/DashButton";
import { UserManualMatchesItem } from "../elements/UserManualMatchesItem";
import { WithdrawItem } from "../elements/WithdrawItem";
import { DepositItem } from "../elements/DepositItem";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AutoDepositItem } from "../elements/AutoDepositItem";

export const ManageAutoDeposits = () => {
  const auth = "MANAGE DEPOSIT";
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [menu, setMenu] = useState("pending");
  const [deposits, setDeposits] = useState([]);
  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    setDeposits([]);
  };

  const handleMenu = (menu) => {
    setMenu(menu);
    setPage(1);
    setDeposits([]);
  };

  const navigate = useNavigate();
  const { _access, _isSuperadmin } = useSelector((store) => store.auth);
  useEffect(() => {
    if (!_access.includes(auth) && !_isSuperadmin) navigate("/");

    fetcher(
      "/fetchDeposits",
      { status: menu, auto: true, keyword: keyword },
      page,
      setPage,
      setDeposits
    );
  }, [page, deposits]);

  return (
    <>
      <div className="p-2 rounded shadow-sm bg-white mx-2">
        <div className="p-2 bg-white rounded mb-3">
          <div className="mb-1">Manage Automatic Deposits</div>
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
                placeholder="enter txnid,utr,amount"
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
        {deposits.length > 0 && (
          <div className="">
            {deposits.map((deposit) => (
              <AutoDepositItem key={deposit._id} deposit={deposit} />
            ))}
          </div>
        )}

        {deposits.length < 1 && (
          <div className="text-center py-2">no deposits found</div>
        )}
      </div>
    </>
  );
};
