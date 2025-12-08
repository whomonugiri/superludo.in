import { useEffect, useState } from "react";
import { fetcher } from "../../../utils/api.manager";
import { DashButton } from "../elements/DashButton";
import { UserManualMatchesItem } from "../elements/UserManualMatchesItem";
import { WithdrawItem } from "../elements/WithdrawItem";
import { DepositItem } from "../elements/DepositItem";
import { InfoItem } from "../elements/InfoItem";
import { GameItem } from "../elements/GameItem";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const ManageGames = () => {
  const [page, setPage] = useState(1);
  const [games, setGames] = useState([]);

  const navigate = useNavigate();
  const { _access, _isSuperadmin } = useSelector((store) => store.auth);
  useEffect(() => {
    if (!_isSuperadmin) navigate("/");
    fetcher("/fetchGames", {}, page, setPage, setGames);
  }, [page, games]);

  return (
    <>
      <div className="">
        {games.length > 0 && (
          <div className="">
            {games.map((game) => (
              <GameItem key={game._id} game={game} />
            ))}
          </div>
        )}

        {games.length < 1 && (
          <div className="text-center py-2">no games found</div>
        )}
      </div>
    </>
  );
};
