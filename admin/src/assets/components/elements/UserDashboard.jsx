import { Link } from "react-router-dom";
import { maskMobile } from "../../../utils/api.manager";
import { UDI } from "./UDI";

export const UserDashboard = ({ user }) => {
  return (
    <>
      <div className="p-2 rounded shadow-sm bg-white mx-2">
        <div className="d-flex flex-wrap ">
          <UDI
            title="Total Played Matches"
            value={user.stat.totalPlayedMatches}
          />
          <UDI title="Total Won Matches" value={user.stat.totalWonMatches} />
          <UDI title="Total Lost Matches" value={user.stat.totalLostMatches} />
          <UDI
            title="Total Deposit"
            value={"₹" + Number(user.stat.totalDeposit).toFixed(2)}
            count={user.stat.totalDepositCount}
          />
          <UDI
            title="Total Withdrawal"
            value={"₹" + Number(user.stat.totalWithdrawal).toFixed(2)}
            count={user.stat.totalWithdrawalCount}
          />
          <UDI
            title="Total Winnings"
            value={"₹" + Number(user.stat.totalWinnings).toFixed(2)}
          />
          <UDI
            title="Total Referral Earnings"
            value={"₹" + Number(user.stat.totalReferralEarnings).toFixed(2)}
            count={user.stat.totalReferralCount}
          />

          <UDI
            title="Referral Code"
            value={user.referralCode}
            count={user.stat.totalRef}
          />

          <UDI
            title="Referred By"
            value={
              user.refBy ? (
                <Link to={"/user/" + user.refBy._id}>
                  {user.refBy.fullName +
                    "(" +
                    maskMobile(user.refBy.mobileNumber) +
                    ")"}
                </Link>
              ) : (
                "none"
              )
            }
          />
        </div>
      </div>

      <div className="p-3 rounded shadow-sm bg-white m-2 mt-3">
        <div className="fw-bold">Withdraw Payment Details</div>

        <div className="d-flex flex-wrap gap-3 mt-2">
          {user.bankAccountNo && user.bankIfscCode && user.bankName && (
            <div className="small p-3 border rounded">
              <div className="fw-bold small text-info">Bank Details</div>
              <div>
                <b>Account Holder Name :</b> {user.bankName}
              </div>
              <div>
                <b>Account Number :</b> {user.bankAccountNo}
              </div>
              <div>
                <b>IFSC Code :</b> {user.bankIfscCode}
              </div>
            </div>
          )}

          {!user.bankAccountNo && !user.bankIfscCode && !user.bankName && (
            <div className="small p-3 border rounded">
              Bank Details Not Updated
            </div>
          )}

          {user.upiId && (
            <div className="small  p-3 border rounded">
              <div className="fw-bold small text-info">UPI Details</div>
              <div>
                <b>UPI Id :</b> paytop@ptyes
              </div>
            </div>
          )}

          {!user.upiId && (
            <div className="small p-3 border rounded">
              UPI details Not Updated
            </div>
          )}
        </div>
      </div>
    </>
  );
};
