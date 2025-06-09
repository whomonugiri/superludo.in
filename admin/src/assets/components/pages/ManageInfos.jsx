import { useEffect, useState } from "react";
import { fetcher } from "../../../utils/api.manager";
import { DashButton } from "../elements/DashButton";
import { UserManualMatchesItem } from "../elements/UserManualMatchesItem";
import { WithdrawItem } from "../elements/WithdrawItem";
import { DepositItem } from "../elements/DepositItem";
import { InfoItem } from "../elements/InfoItem";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const ManageInfos = () => {
  const [page, setPage] = useState(1);
  const [infos, setInfos] = useState([]);

  const navigate = useNavigate();
  const { _access, _isSuperadmin } = useSelector((store) => store.auth);
  useEffect(() => {
    if (!_isSuperadmin) navigate("/");
    fetcher("/fetchInfos", {}, page, setPage, setInfos);
  }, [page, infos]);

  return (
    <>
      <div className="">
        {infos.length > 0 && (
          <div className="">
            {infos.map((info) => (
              <InfoItem key={info._id} info={info} />
            ))}
          </div>
        )}

        {infos.length < 1 && (
          <div className="text-center py-2">no information messages found</div>
        )}
      </div>
    </>
  );
};
