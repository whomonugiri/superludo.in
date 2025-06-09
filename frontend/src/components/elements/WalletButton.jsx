import { FaWallet } from "react-icons/fa6";
import { Link } from "react-router";

export const WalletButton = (props) => {
  return (
    <>
      <Link to="/wallet" className="text-decoration-none text-dark">
        <div className="d-flex border rounded rounded-3 border-dark p-1 px-2 align-items-center gap-2">
          <FaWallet className="text-success" />

          <div className="small fw-bold">₹{props.balance || 0} </div>
        </div>
      </Link>
    </>
  );
};
