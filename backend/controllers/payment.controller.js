import axios from "axios";
import { Transaction } from "../models/transaction.models.js";
import { balance, newTxnId } from "./user.controller.js";
import { _config } from "./config.controller.js";
import { isAnyMatchRunningOrOpen } from "./match.controller.js";
function validOrderId(str) {
  const pattern = /^[a-zA-Z0-9]+$/; // Matches only alphanumeric characters without spaces
  return pattern.test(str);
}

export const submitPayment = async (req, res) => {
  try {
    let amount = req.body.amount;
    let orderId = req.body.orderId;

    if (!validOrderId(orderId)) {
      return res.json({
        success: false,
        message: "invalid_orderutr_msg",
      });
    }

    if (!validAmount(amount)) {
      return res.json({
        success: false,
        message: "invalid_amount_msg",
      });
    }

    const otxn = await Transaction.findOne({ txnData: orderId });
    if (otxn) {
      return res.json({
        success: false,
        message: "order_id_alread_used",
      });
    }

    const config = await _config();
    if (
      amount > config.MAXIMUM_DEPOSIT_UPI ||
      amount < config.MINIMUM_DEPOSIT_UPI
    ) {
      return res.json({
        success: false,
        message: "under_limit_msg",
      });
    }

    amount = Number(amount);
    amount = amount.toFixed(2);
    const txnid = await newTxnId();

    const newtxn = {
      txnId: txnid,
      userId: req.userId,
      amount: amount,
      txnType: "credit",
      txnCtg: "deposit",
      cash: amount,
      remark: "Added Money",
      isManual: true,
      txnData: orderId,
    };
    //txncreationend
    const txn = await Transaction.create(newtxn);
    if (txn) {
      return res.json({
        success: true,
        message: "deposit_submit_msg",
      });
    } else {
      return res.json({
        success: false,
        message: "something_is_wrong",
      });
    }
  } catch (error) {
    ////console.log("submitpayment", error);
    // ////console.log(error.response ? error.response.data.message : error.message);
    return res.json({
      success: false,
      message: error.response ? error.response.data.message : error.message,
    });
  }
};

export const validupi = (upi) => {
  const pattern = /^[a-zA-Z0-9._]+@[a-zA-Z]+$/;
  return pattern.test(upi);
};
export const submitWithdrawReq = async (req, res) => {
  try {
    // return res.json({
    //     success: false,
    //     message: "Withdraw is closed, for Today. due to technical issue. Please try again Tomorrow.",
    //   });

    ////console.log(req.body);
    let amount = req.body.amount;
    let method = req.body.method;
    let upiId = req.body.upiId;
    let bankName = req.body.bankName;
    let bankAccountNo = req.body.bankAccountNo;
    let bankIfscCode = req.body.bankIfscCode;

    // if (!req.user.kyc) {
    //   return res.json({
    //     success: false,
    //     message: "complete_kyc",
    //   });
    // }

    if (!validAmount(amount)) {
      return res.json({
        success: false,
        message: "invalid_amount_msg",
      });
    }

    if (method && method == "BANK") {
      if (
        !req.body.bankAccountNo ||
        !req.body.bankIfscCode ||
        !req.body.bankName
      ) {
        return res.json({
          success: false,
          message: "update_bank",
        });
      }
    } else if (method && method == "UPI") {
      if (!req.body.upiId) {
        return res.json({
          success: false,
          message: "update_upi",
        });
      }
    }

    if (!method) {
      return res.json({
        success: false,
        message: "invalid_method",
      });
    }

    // return res.json({
    //   success: false,
    //   message: "testing",
    //   body: method,
    //   bankcond: !req.user.bankAccountNo,
    // });

    const config = await _config();

    if (!config.WITHDRAW_STATUS) {
      return res.json({
        success: false,
        message: "WITHDRAW IS CLOSED TODAY",
      });
    }

    const lastWithdraw = await Transaction.findOne({
      txnCtg: "withdrawal",
      status: { $in: ["completed"] },
      userId: req.userId,
    }).sort({ createdAt: -1 }); // Get the latest withdrawal transaction

    if (lastWithdraw) {
      // ✅ Get current time in IST as a real Date object

      // ✅ 3 hours ago in IST
      const threeHoursAgo = new Date(Date.now() - 8 * 60 * 60 * 1000);

      // ✅ Check if last withdrawal was within last 3 hours
      if (lastWithdraw.createdAt > threeHoursAgo) {
        const nextAllowed = new Date(
          lastWithdraw.createdAt.getTime() + 8 * 60 * 60 * 1000
        );

        return res.json({
          success: false,
          message: `You can only withdraw 1 time in 8 hours, you can place your withdraw request after ${nextAllowed.toLocaleTimeString(
            "en-IN",
            {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
              timeZone: "Asia/Kolkata",
            }
          )}`,
        });
      }
    }

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0); // Set to 12:00 AM

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999); // Set to 11:59:59 PM
    const otxn = await Transaction.find({
      txnCtg: "withdrawal",
      userId: req.userId,
      status: { $in: ["completed", "pending"] },
      createdAt: { $gte: startOfDay, $lte: endOfDay },
    }).sort({ createdAt: -1 });

    if (otxn.length >= config.WITHDRAW_DAY_LIMIT) {
      return res.json({
        success: false,
        message: "withdraw_max_limit",
      });
    }

    const ptxn = await Transaction.findOne({
      txnCtg: "withdrawal",
      status: { $in: ["pending"] },
      userId: req.userId,
    }).sort({ createdAt: -1 }); // Get the latest withdrawal transaction

    const now = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
    });
    const istDate = new Date(now);

    // Convert "HH:MM" to minutes
    function timeToMinutes(timeStr) {
      const [h, m] = timeStr.split(":").map(Number);
      return h * 60 + m;
    }

    const startMinutes = timeToMinutes(config.WITHDRAW_START_TIME); // e.g. 13:00 -> 780
    const endMinutes = timeToMinutes(config.WITHDRAW_END_TIME); // e.g. 16:00 -> 960

    const currentMinutes = istDate.getHours() * 60 + istDate.getMinutes();

    // Check if within allowed window
    if (currentMinutes < startMinutes || currentMinutes >= endMinutes) {
      return res.json({
        success: false,
        message: `Withdraw Time is ${config.WITHDRAW_START_TIME} to ${config.WITHDRAW_END_TIME}`,
      });
    }

    if (ptxn) {
      // (Optional) You can still keep your previous 6-hour check if needed
      // Otherwise just allow withdrawal since time condition already passed
      return res.json({
        success: false,
        message:
          "you already requested a withdrawal, please wait until it completed", // Example message if you want only one withdrawal per day
      });
    } else {
      // Allow withdrawal
      // Your withdrawal logic here
    }

    const userBalance = await balance(req);

    if (userBalance.reward < amount) {
      return res.json({
        success: false,
        message: "less_withdraw_money",
      });
    }

    if (amount > config.MAXIMUM_WITHDRAW || amount < config.MINIMUM_WITHDRAW) {
      return res.json({
        success: false,
        message: "under_limit_msg",
      });
    }

    const pm = await isAnyMatchRunningOrOpen(req);
    if (pm) {
      return res.json({
        success: false,
        message: "please cancel or complete all waiting or open matches",
      });
    }

    amount = Number(amount);
    amount = amount.toFixed(2);
    const txnid = await newTxnId();

    const methoddetails = {};
    if (method == "BANK") {
      methoddetails.bankAccountNo = req.body.bankAccountNo;
      methoddetails.bankIfscCode = req.body.bankIfscCode;
      methoddetails.bankName = req.body.bankName;
    } else if (method == "UPI") {
      methoddetails.upiId = req.body.upiId;
    }

    const newtxn = {
      txnId: txnid,
      userId: req.userId,
      amount: amount,
      txnType: "debit",
      txnCtg: "withdrawal",
      reward: amount,
      method: method,
      methodData: methoddetails,
      remark: "Money Withdrawal",
    };
    //txncreationend
    const txn = await Transaction.create(newtxn);

    if (txn) {
      return res.json({
        success: true,
        message: "withdraw_submit_msg",
        money: await balance(req),
      });
    } else {
      return res.json({
        success: false,
        message: "something_is_wrong",
      });
    }
  } catch (error) {
    ////console.log("submitpayment", error);
    // ////console.log(error.response ? error.response.data.message : error.message);
    return res.json({
      success: false,
      message: error.response ? error.response.data.message : error.message,
    });
  }
};

export const cancelPayment = async (req, res) => {
  try {
    let txnid = req.body.txnId;

    if (!validOrderId(txnid)) {
      return res.json({
        success: false,
        message: "invalid_orderutr_msg",
      });
    }

    const fix = {};
    fix.reason = "cancelled by user";
    //txncreationend
    const txnst = await Transaction.updateOne(
      { userId: req.userId, txnId: txnid, status: "pending" }, // Filter by user ID
      {
        $set: {
          status: "cancelled",
          txnData: JSON.stringify(fix),
        },
      } // Update the fullName field
    );

    if (txnst.modifiedCount > 0) {
      const pr = {};
      pr.success = true;
      pr.message = "deposit_cancel_msg";
      pr.money = await balance(req);
      return res.json(pr);
    } else {
      return res.json({
        success: false,
        message: "something_is_wrong",
      });
    }
  } catch (error) {
    ////console.log("submitpayment", error);
    // ////console.log(error.response ? error.response.data.message : error.message);
    return res.json({
      success: false,
      message: error.response ? error.response.data.message : error.message,
    });
  }
};

export function validAmount(value) {
  value = parseInt(value);
  return typeof value === "number" && Number.isInteger(value) && value > 0;
}

export const paymentQrStatus = async (req, res) => {
  try {
    const config = await _config();
    const data = {};
    data.txnid = req.body.txnid;

    const txn = await Transaction.findOne({ txnId: data.txnid }).lean();
    data.merchantid = txn.MID || config.PAYTM_BUSINESS_MID;

    const url = "https://meraotp.in/api/getPaymentStatus";

    data.apiKey = config.MERAOTP_APIKEY;
    data.txnId = data.txnid;
    data.paytmMID = data.merchantid;

    const result = await axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const tx = result.data.data;
    ////console.log(tx);
    const pr = {};
    if (tx.STATUS == "TXN_SUCCESS") {
      const txnst = await Transaction.updateOne(
        { userId: req.userId, txnId: data.txnid, status: "pending" }, // Filter by user ID
        {
          $set: {
            status: "completed",
            amount: tx.TXNAMOUNT,
            cash: tx.TXNAMOUNT,
            txnData: JSON.stringify(tx),
          },
        } // Update the fullName field
      );

      if (txnst.modifiedCount > 0) {
        pr.success = true;
        pr.message = "payment_success_msg";
        pr.money = await balance(req);
      }
    } else {
      pr.success = false;
    }
    return res.json(pr);
  } catch (error) {
    ////console.log("paymentQrStatus", error);
    // ////console.log(error.response ? error.response.data.message : error.message);
    return res.json({
      success: false,
      message: error.response ? error.response.data.message : error.message,
    });
  }
};
