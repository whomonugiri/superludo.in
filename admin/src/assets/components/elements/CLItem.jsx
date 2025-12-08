import { Truncate } from "@re-dev/react-truncate";
import { MdVerified } from "react-icons/md";
import { Link } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";
export const CLItem = ({ msg }) => {
  return (
    <>
      <Link to={`/chat-support/${msg.user._id}`}>
        <div
          className={`p-2 border-bottom w-100 d-flex gap-1 ${
            !msg.isAdmin && !msg.isRead ? "bg-primary text-white" : ""
          }`}
        >
          <img
            src={`/assets/avatars/${msg.user.profilePic}`}
            height="50px"
            className="rounded"
          />
          <div className=" w-100" style={{ lineHeight: "17px" }}>
            <div className="small fw-bold text-dark d-flex justify-content-between">
              <div>
                {msg.user.fullName}{" "}
                {msg.user.kyc ? (
                  <MdVerified className="text-success" title="KYC Completed" />
                ) : (
                  ""
                )}
              </div>
              <span className="rounded border px-1 bg-white text-primary xs-small">
                {msg.count}
              </span>
            </div>
            <div className="small w-100">
              <Truncate
                lines={1}
                className="w-100 col-12"
                ellipsis={<span>...</span>}
              >
                {msg.text}
              </Truncate>
            </div>
            <div className="xs-small w-100" style={{ opacity: 0.75 }}>
              <ReactTimeAgo date={new Date(msg.createdAt)} locale="en-IN" />
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};
