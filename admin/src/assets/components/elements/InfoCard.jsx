import { IoMdInformationCircleOutline } from "react-icons/io";

export const InfoCard = (props) => {
  return (
    <>
      <div className="col-lg-6 col-md-6 col-12">
        <div className="card">
          <span className="mask bg-dark opacity-10 border-radius-lg"></span>
          <div className="card-body p-3 position-relative">
            <div className="row">
              <div className="col-8 text-start">
                <div className="d-flex align-items-center  justify-content-center icon icon-shape bg-white shadow text-center border-radius-2xl">
                  <span className="text-dark text-gradient text-lg opacity-10">
                    {props.icon}
                  </span>
                </div>
                <h5 className="text-white font-weight-bolder mb-0 mt-3">
                  {props.value}
                </h5>
                <span className="text-white text-sm">{props.title}</span>
              </div>
              <div className="col-4">
                <div className="dropdown text-end mb-6">
                  <a
                    href="#"
                    className="cursor-pointer text-white"
                    id="dropdownUsers1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <IoMdInformationCircleOutline />
                  </a>
                  <ul
                    className="dropdown-menu px-2 py-3"
                    aria-labelledby="dropdownUsers1"
                  >
                    <li>
                      <a className="dropdown-item border-radius-md">
                        <div>Automatic</div>
                      </a>
                    </li>
                  </ul>
                </div>
                <p className="text-white text-sm text-end font-weight-bolder mt-auto mb-0">
                  {props.value2}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
