import { useEffect, useState } from "react";
import { fetcher } from "../../../utils/api.manager";
import { TransactionListItem } from "./TransactionListItem";
import { DashButton } from "./DashButton";

export const UserTransaction = ({ user }) => {
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [menu, setMenu] = useState("all");
  const [transactions, setTransactions] = useState([]);
  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    setTransactions([]);
  };

  const handleMenu = (menu) => {
    setMenu(menu);
    setPage(1);
    setTransactions([]);
  };
  useEffect(() => {
    fetcher(
      "/fetchUserTransactions",
      { userId: user._id, txnCtg: menu, keyword: keyword },
      page,
      setPage,
      setTransactions
    );
  }, [page, transactions]);

  return (
    <>
      <div className="p-2 rounded shadow-sm bg-white mx-2">
        <div className="p-2 bg-white rounded mb-3">
          <div className="d-flex gap-1 flex-wrap">
            <DashButton current={menu} action={handleMenu} text="all" />
            <DashButton current={menu} action={handleMenu} text="deposit" />
            <DashButton current={menu} action={handleMenu} text="withdrawal" />
            <DashButton current={menu} action={handleMenu} text="bet" />
            <DashButton current={menu} action={handleMenu} text="reward" />
            <DashButton current={menu} action={handleMenu} text="referral" />
            <DashButton current={menu} action={handleMenu} text="bonus" />
          </div>
          <form onSubmit={handleSearch}>
            <div className="d-flex gap-2 mt-2">
              <input
                type="text"
                className="form-control"
                placeholder="enter txn id "
                onChange={(e) => setKeyword(e.target.value)}
              />
              <button className="btn btn-outline-primary mb-0" type="submit">
                FIND
              </button>
            </div>
          </form>
        </div>
        {transactions.length > 0 && (
          <div>
            {transactions.map((txn) => (
              <TransactionListItem key={txn._id} txn={txn} />
            ))}
          </div>
        )}

        {transactions.length < 1 && (
          <div className="text-center py-2">no transactions found</div>
        )}
        <div></div>
      </div>
    </>
  );
};
