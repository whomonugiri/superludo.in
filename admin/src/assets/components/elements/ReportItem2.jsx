export const ReportItem2 = ({ title, value, cash, reward, bonus, users }) => {
  return (
    <>
      {" "}
      <div className="col-12 col-md-12 pt-1">
        <div
          className={`alert text-center ${
            value > 0 ? "alert-info text-white" : "alert-danger text-white"
          }`}
        >
          <div>
            <b>ALL USERS TOTAL WALLET INFORMATION</b>
          </div>
          <div className="d-flex gap-2 flex-wrap justify-content-center my-3">
            <button className="btn btn-warning p-1 px-3 m-0">
              Total Users : <span className="text-dark"> {users}</span>
            </button>
            <button className="btn btn-primary p-1 px-3 m-0">
              Main Wallet : <span className="text-dark">₹ {value}</span>
            </button>
            <button className="btn btn-dark p-1 px-3 m-0">
              Cash Wallet : <span className="text-white">₹ {cash}</span>
            </button>
            <button className="btn btn-dark p-1 px-3 m-0">
              Reward Wallet : <span className="">₹ {reward}</span>
            </button>
            <button className="btn btn-dark p-1 px-3 m-0">
              Bonus Wallet : <span className="">₹ {bonus}</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
