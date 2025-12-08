import { useState } from "react";
import { Log } from "../elements/Log";
import { useEffect } from "react";
import { fetcher } from "../../../utils/api.manager";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export function filterDateFormat(date) {
  const dd = String(date.getDate()).padStart(2, "0"); // Ensure 2-digit day
  const mm = String(date.getMonth() + 1).padStart(2, "0"); // Ensure 2-digit month (Month is zero-based)
  const yyyy = date.getFullYear();

  return `${yyyy}-${mm}-${dd}`;
}

export const AdminLogs = () => {
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [datas, setDatas] = useState([]);
  const [startDate, setStartDate] = useState(filterDateFormat(new Date()));
  const [endDate, setEndDate] = useState(filterDateFormat(new Date()));

  const selectionRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    setDatas([]);
  };
  const navigate = useNavigate();
  const { _access, _isSuperadmin } = useSelector((store) => store.auth);
  useEffect(() => {
    if (!_isSuperadmin) navigate("/");
    fetcher(
      "/fetchLogs",
      {
        startDate: startDate,
        endDate: endDate,
        keyword: keyword,
      },
      page,
      setPage,
      setDatas
    );
  }, [page, datas]);

  return (
    <>
      <div className="p-2 rounded shadow-sm bg-white mx-2">
        <div className="p-2 bg-white rounded mb-3">
          <div className="mb-1 d-flex justify-content-between flex-column">
            <div className="fw-bold text-primary">Admin Logs</div>
            <div className="d-flex gap-2">
              <div className="w-100">
                <div className="fw-bold small">From</div>
                <div>
                  <input
                    type="date"
                    onChange={(e) => setStartDate(e.target.value)}
                    className="form-control form-control-sm"
                    value={startDate}
                  />
                </div>
              </div>

              <div className="w-100">
                <div className="fw-bold small">To</div>
                <div>
                  <input
                    value={endDate}
                    type="date"
                    onChange={(e) => setEndDate(e.target.value)}
                    className="form-control form-control-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSearch}>
            <div className="d-flex gap-2 mt-2">
              <input
                type="text"
                className="form-control"
                placeholder="enter something to search"
                onChange={(e) => setKeyword(e.target.value)}
              />
              <button className="btn btn-outline-primary mb-0" type="submit">
                FIND
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="px-2 mt-3">
        {datas.length > 0 &&
          datas.map((data) => <Log key={data._id} log={data} />)}

        {datas.length < 1 && (
          <div className="text-center my-3">no logs found</div>
        )}
      </div>
    </>
  );
};
