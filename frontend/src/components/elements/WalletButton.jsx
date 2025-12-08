import { FaWallet } from "react-icons/fa6";
import { IoMdWallet } from "react-icons/io";
import { RiCopperCoinFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { Link } from "react-router";

export const WalletButton = (props) => {
  const { _y } = useSelector((store) => store.auth);
  return (
    <>
      <Link
        to={false ? "" : "/wallet"}
        className="text-decoration-none text-dark"
      >
        <div className="d-flex border rounded rounded-3  p-1 px-2 align-items-center gap-2 bg-danger text-white">
          <IoMdWallet className="" />

          <div className="small fw-bold">{props.balance || 0} </div>
        </div>
      </Link>
    </>
  );
};
