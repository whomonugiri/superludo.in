import { useEffect, useState } from "react";
import { fetcher, singleFetcher } from "../../../utils/api.manager";
import { AdminListItem } from "./AdminListItem";
import { Link } from "react-router-dom";

export const Tournaments = () => {
  const [matches, setMatches] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    singleFetcher("/fetchTournaments", {}, setMatches);
  }, []);
  return (
    <>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Entry Fee</td>
              <td>Users Joined</td>
              <td>Prize Pool</td>
              <td>Total Entries</td>
              <td>Total Bets</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {matches.length > 0 &&
              matches.map((match, index) => (
                <tr key={match._id}>
                  <td>{index + 1}</td>
                  <td>{match.name}</td>
                  <td>₹ {match.entryFee}</td>
                  <td>
                    {match.totalJoined}/{match.totalAllowedEntries}
                  </td>
                  <td> ₹ {match.prizePool}</td>
                  <td> {match.totalEntries}</td>

                  <td> ₹ {match.totalEntries * match.entryFee}</td>
                  <td>
                    <Link
                      to={`/open-tournament/${match._id}`}
                      className="btn btn-primary btn-sm"
                    >
                      Open Tournament
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {matches.length < 1 && (
          <div className="text-center">no tournament found</div>
        )}
      </div>
    </>
  );
};
