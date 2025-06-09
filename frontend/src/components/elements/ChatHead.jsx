import { IoArrowBackCircle } from "react-icons/io5";

export const ChatHead = ({ status }) => {
  return (
    <>
      <nav className="navbar sticky-top bg-body-tertiary p-0">
        <div
          style={{ backgroundColor: "#0b1014" }}
          className=" p-2 d-flex justify-content-between align-items-center w-100"
        >
          <div className="d-flex gap-2 align-items-center">
            <img
              src="assets/avatars/admin.png"
              className="rounded-circle border"
              height="45px"
            />

            <div>
              <div className="fw-bold text-white">Admin Support</div>
              <div className=" text-white small d-flex align-items-center gap-2">
                {status}
              </div>
            </div>
          </div>
          <div>
            <button
              onClick={() => history.back()}
              className="text-white p-0 m-0 bg-transparent border-0"
              style={{ fontSize: "30px" }}
            >
              <IoArrowBackCircle />
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};
