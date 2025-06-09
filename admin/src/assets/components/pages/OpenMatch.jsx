import { useEffect, useState } from "react";
import { singleFetcher } from "../../../utils/api.manager";
import { useNavigate, useParams } from "react-router-dom";
import { MatchInfo } from "../elements/MatchInfo";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { useSelector } from "react-redux";

export const OpenMatch = () => {
  const navigate = useNavigate();
  const { matchId } = useParams();
  const handleFailure = () => {
    navigate("/manage-matches");
  };
  const [match, setMatch] = useState(null);

  const fetchMatch = () => {
    setMatch(null);
    singleFetcher("/fetchMatch", { _id: matchId }, setMatch, handleFailure);
  };

  const resetMatch = () => {
    setMatch(null);
    singleFetcher(
      "/fetchMatch",
      { _id: matchId, reset: true },
      setMatch,
      handleFailure
    );
  };
  const { _access, _isSuperadmin } = useSelector((store) => store.auth);

  useEffect(() => {
    if (!_access.includes("MANAGE MATCH") && !_isSuperadmin) navigate("/");

    singleFetcher("/fetchMatch", { _id: matchId }, setMatch, handleFailure);
  }, []);

  return (
    <>
      <div className="d-flex px-2 mt-3 align-items-center justify-content-between">
        <div className="fw-bold">Match Information</div>
        <button
          onClick={() => history.back()}
          className="btn btn-sm py-1 btn-outline-dark "
        >
          <FaRegArrowAltCircleLeft /> Go Back
        </button>
      </div>
      {match && (
        <MatchInfo match={match} refresh={fetchMatch} reset={resetMatch} />
      )}
    </>
  );
};
