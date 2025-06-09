import { useEffect, useRef, useState } from "react";
import { singleFetcher } from "../../../utils/api.manager";
import { CommissionItem } from "../elements/CommissionItem";
import { DashButton } from "../elements/DashButton";
import { ManualCommission } from "../elements/ManualCommission";
import { OnlineCommission } from "../elements/OnlineCommission";
import { SpeedCommission } from "../elements/SpeedCommission";

export const ManageCommission = () => {
  const [menu, setMenu] = useState("Manual Matches Commissions");
  const handleMenu = (menu) => {
    setMenu(menu);
  };
  return (
    <>
      <div className="d-flex gap-1 flex-wrap mb-3">
        <DashButton
          current={menu}
          action={handleMenu}
          text="Manual Matches Commissions"
        />

        <DashButton
          current={menu}
          action={handleMenu}
          text="Online Matches Commissions"
        />

        <DashButton
          current={menu}
          action={handleMenu}
          text="SpeedLudo Matches Commissions"
        />
      </div>

      {menu == "Manual Matches Commissions" && <ManualCommission />}
      {menu == "Online Matches Commissions" && <OnlineCommission />}
      {menu == "SpeedLudo Matches Commissions" && <SpeedCommission />}
    </>
  );
};
