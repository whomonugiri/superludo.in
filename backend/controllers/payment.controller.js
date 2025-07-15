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
    ////console.log(req.body);
    let amount = req.body.amount;
    let method = req.body.method;
    let upiId = req.body.upiId;
    let bankName = req.body.bankName;
    let bankAccountNo = req.body.bankAccountNo;
    let bankIfscCode = req.body.bankIfscCode;

    if (!req.user.kyc) {
      return res.json({
        success: false,
        message: "complete_kyc",
      });
    }

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
      status: { $in: ["completed", "pending"] },
      userId: req.userId,
    }).sort({ createdAt: -1 }); // Get the latest withdrawal transaction

    if (ptxn) {
      const sixHoursAgo = new Date(Date.now() - 30 * 60 * 1000); // Calculate 6 hours ago

      if (ptxn.createdAt < sixHoursAgo) {
        // //console.log("Last withdrawal request was submitted more than 6 hours ago.");
        // Allow new withdrawal
      } else {
        return res.json({
          success: false,
          message: "withdraw_time_limit",
        });
        // //console.log("Last withdrawal request was submitted less than 6 hours ago.");
        // Reject or delay new withdrawal request
      }
    } else {
      // //console.log("No previous withdrawal requests found.");
      // Allow withdrawal since there's no history
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

    const url = config.PAYTM_PAYMENT_VERIFICATION_URL;
    const result = await axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const tx = result.data.response;
    ////console.log(tx);
    const pr = {};
    if (tx.STATUS == "TXN_SUCCESS") {
      const txnst = await Transaction.updateOne(
        { userId: req.userId, txnId: data.txnid, status: "pending" }, // Filter by user ID
        {
          $set: {
            status: "completed",
            amount: pr.amount,
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
