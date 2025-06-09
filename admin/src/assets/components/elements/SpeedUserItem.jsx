import { MdVerified } from "react-icons/md";

export const SpeedUserItem = ({ player, user, score = false }) => {
  return (
    <>
      {player.userId && user && (
        <div className="d-flex flex-column align-items-center justify-content-center  gap-2 border px-2 py-1 rounded">
          <img
            src={`/assets/avatars/${user.profilePic}`}
            height="40px"
            width="40px"
            className="rounded border"
          />

          <div style={{ lineHeight: "18px" }}>
            <div className="fw-bold small text-dark d-flex  align-items-center gap-1">
              <span>{user.fullName}</span>{" "}
              {user.kyc ? (
                <MdVerified className="text-success" title="KYC Completed" />
              ) : (
                ""
              )}
            </div>
            <div className="text-center">
              {" "}
              {player.result == "winner" ? (
                <span className="bg-success text-white xs-small fw-bold px-1 rounded p-0">
                  Winner {player.position}
                </span>
              ) : (
                ""
              )}
              {player.result == "looser" ? (
                <span className="bg-danger text-white xs-small fw-bold px-1 rounded p-0">
                  Looser {player.position}
                </span>
              ) : (
                ""
              )}
              {score && (
                <div>
                  <span className="bg-primary text-white xs-small fw-bold p-1 px-2 rounded p-0">
                    Score {player.point}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
