import { IoArrowBackCircle } from "react-icons/io5";

import { MdVerified } from "react-icons/md";
import { IoIosCall } from "react-icons/io";
import { Link } from "react-router-dom";

export const ChatHead = ({ user, status }) => {
  return (
    <>
      <nav className="navbar bg-body-tertiary p-0">
        <div
          style={{ backgroundColor: "#0b1014" }}
          className=" p-2 d-flex justify-content-between align-items-center w-100"
        >
          <div className="d-flex gap-2 align-items-center">
            <img
              src={`/assets/avatars/${user.profilePic}`}
              className="rounded-circle border"
              height="45px"
            />

            <div>
              <Link to={"/user/" + user._id}>
                <div className="fw-bold text-white d-flex align-items-center gap-1">
                  {user.fullName}{" "}
                  {user.kyc ? (
                    <MdVerified
                      className="text-success"
                      title="KYC Completed"
                    />
                  ) : (
                    ""
                  )}
                </div>
              </Link>
              <div className=" text-white small d-flex align-items-center gap-2">
                {status}
              </div>
            </div>
          </div>
          <div>
            <div className="small text-white"></div>
            <div></div>
          </div>
        </div>
      </nav>
    </>
  );
};
