import { OnlineGame2 } from "../../backend/models/onlinegame2.js";
import User from "../../backend/models/user.model.js";
import jwt from "jsonwebtoken";
import { rooms } from "../game/datastore.js";

import { Transaction } from "../../backend/models/transaction.models.js";

import Log from "../../backend/models/log.model.js";
import { Config } from "../../backend/models/config.model.js";

export const _config = async () => {
  const config = await Config.find().lean();
  const _setting = config[0];

  _setting.DEMO = false;
  _setting.DEMO_MSG =
    "you are not allowed, to perform this operation. contact the developer at +917669006847 on whatsapp";
  return _setting;
};

export const refBonusManager = async (winnerId, match) => {
  try {
    const config = await _config();
    const winner = await User.findOne({ _id: winnerId });
    if (!winner) return;

    if (!winner.referBy) return;

    const level1_ref = await User.findOne({ referralCode: winner.referBy });
    if (!level1_ref) return;

    if (config.REFERRAL_LEVEL1 > 0) {
      const txnid_l1 = await newTxnId();
      const amount_l1 = match.entryFee * config.REFERRAL_LEVEL1;
      const newTxn_l1 = {
        txnId: txnid_l1,
        userId: level1_ref._id,
        amount: amount_l1.toFixed(2),
        cash: 0,
        reward: 0,
        bonus: amount_l1.toFixed(2),
        remark: "Referral Bonus / L1",
        status: "completed",
        txnType: "credit",
        txnCtg: "referral",
        matchId: match._id,
      };

      await Transaction.create(newTxn_l1);
      await User.updateOne(
        { _id: level1_ref._id },
        {
          $inc: {
            "balance.bonus": newTxn_l1.bonus,
            "stats.totalReferralEarnings": newTxn_l1.bonus,
          },
        }
      );

      await _log({
        matchId: match._id,
        message:
          level1_ref.fullName +
          " (" +
          level1_ref.mobileNumber +
          ") got level 1 referral bonus of ₹" +
          amount_l1.toFixed(2),
      });
    }

    if (!level1_ref.referBy) return;

    const level2_ref = await User.findOne({ referralCode: level1_ref.referBy });
    if (!level1_ref) return;

    if (config.REFERRAL_LEVEL2 > 0) {
      const txnid_l2 = await newTxnId();
      const amount_l2 = match.entryFee * config.REFERRAL_LEVEL2;
      const newTxn_l2 = {
        txnId: txnid_l2,
        userId: level2_ref._id,
        amount: amount_l2.toFixed(2),
        cash: 0,
        reward: 0,
        bonus: amount_l2.toFixed(2),
        remark: "Referral Bonus / L2",
        status: "completed",
        txnType: "credit",
        txnCtg: "referral",
        matchId: match._id,
      };

      await Transaction.create(newTxn_l2);
      await User.updateOne(
        { _id: level2_ref._id },
        {
          $inc: {
            "balance.bonus": newTxn_l2.bonus,
            "stats.totalReferralEarnings": newTxn_l2.bonus,
          },
        }
      );
      await _log({
        matchId: match._id,
        message:
          level2_ref.fullName +
          " (" +
          level2_ref.mobileNumber +
          ") get level 2 referral bonus of ₹" +
          amount_l2.toFixed(2),
      });
    }
  } catch (error) {
    ////console.log("createMatch", error);
    return res.json({
      success: false,
      message: error.response ? error.response.data.message : error.message,
    });
  }
};
export const _log = async (log) => {
  await Log.create(log);
};

import crypto from "crypto";
export const newTxnId = async () => {
  const random = crypto.randomBytes(6).toString("hex").toUpperCase(); // 12 chars
  return `TXN${Date.now()}${random}`;
};

export const fetchGameData = async ({ gameUid, token, deviceId }) => {
  try {
    const decode = await jwt.verify(token, "qwer");
    let user = null;
    if (decode) {
      user = await User.findOne({
        _id: decode.userId,
        deviceId: deviceId,
      });
    } else {
      return { success: false };
    }

    if (!user) {
      return { success: false };
    }

    const game = await OnlineGame2.findOne({
      _id: gameUid,
      status: "running",
      "blue.userId": { $exists: true },
      "green.userId": { $exists: true },
      $or: [{ "blue.userId": user._id }, { "green.userId": user._id }],
    }).lean();

    if (game) {
      if (game.blue.userId) {
        game.blue.user = await User.findOne({ _id: game.blue.userId }).lean();
      }
      if (game.green.userId) {
        game.green.user = await User.findOne({ _id: game.green.userId }).lean();
      }
      return {
        success: true,
        game: game,
      };
    } else {
      return {
        success: false,
        message: "invalid game id",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.response ? error.response.data.message : error.message,
    };
  }
};

export const updateGameData = async ({ gameUid, data }) => {
  try {
    const game = await OnlineGame2.findOne({ _id: gameUid }).lean();

    if (game && game.status == "running") {
      await OnlineGame2.updateOne(
        {
          _id: game._id,
        }, // Filter by user ID
        {
          $set: {
            status: "completed",
            apiData: data.roomData,
            "blue.result": data.win == "blue" ? "winner" : "looser",
            "green.result": data.win == "green" ? "winner" : "looser",
            "winner.color": data.win,
            completedAt: Date.now(),
          },
        } // Update the fullName field
      );

      const bet = await Transaction.findOne({
        matchId: game._id,
        userId: game[data.win].userId,
        txnCtg: "bet",
        txnType: "debit",
      });

      // #######################
      const txnid = await newTxnId();
      const NewTxn = {
        txnId: txnid,
        userId: game[data.win].userId,
        amount: game.prize,
        cash: 0,
        reward: game.prize,
        bonus: 0,
        remark: "Match Won",
        status: "completed",
        txnType: "credit",
        txnCtg: "reward",
        matchId: game._id,
      };

      await Transaction.create(NewTxn);

      const h = await User.findOne({ _id: game[data.win].userId });
      await User.updateOne(
        { _id: h._id },
        {
          $inc: {
            "balance.reward": NewTxn.reward,
            "balance.cash": NewTxn.cash,
            "balance.bonus": NewTxn.bonus,
            "stats.totalPlayed": 1,
            "stats.totalWon": 1,
            "stats.totalWinned": NewTxn.reward,
          },
        }
      );
      await User.updateOne(
        { _id: game[data.lose].userId },
        {
          $inc: {
            "stats.totalPlayed": 1,
            "stats.totalLost": 1,
          },
        }
      );
      await _log({
        matchId: game._id,
        message:
          h.fullName +
          " (" +
          h.mobileNumber +
          ") is winner & get reward of ₹" +
          game.prize,
      });

      await refBonusManager(game[data.win].userId, game);
      // #######################

      setTimeout(() => {
        delete rooms[game.roomCode];
      }, 1000 * 60 * 5);
    }
  } catch (error) {
    return {
      success: false,
      message: error.response ? error.response.data.message : error.message,
    };
  }
};

export const cancelGame = async ({ gameUid, data }) => {
  try {
    const game = await OnlineGame2.findOne({ _id: gameUid }).lean();

    if (game && game.status == "running") {
      await OnlineGame2.updateOne(
        {
          _id: game._id,
        }, // Filter by user ID
        {
          $set: {
            status: "cancelled",
            apiData: data,
            completedAt: Date.now(),
          },
        } // Update the fullName field
      );

      // 1. Get all transactions for this match
      const allTxns = await Transaction.find({ matchId: game._id });

      // 2. Reverse balance updates based on transaction type/category
      const bulkOps = [];

      for (const tx of allTxns) {
        let incObj = { cash: 0, reward: 0, bonus: 0 };

        if (tx.txnType === "debit" && tx.txnCtg === "bet") {
          // reverse bet debit -> add money back
          incObj.cash = tx.cash;
          incObj.reward = tx.reward;
          incObj.bonus = tx.bonus;
        }

        if (tx.txnType === "credit" && tx.txnCtg === "reward") {
          // reverse reward credit -> subtract money
          incObj.cash = -tx.cash;
          incObj.reward = -tx.reward;
          incObj.bonus = -tx.bonus;
        }

        if (tx.txnType === "credit" && tx.txnCtg === "referral") {
          // reverse referral credit -> subtract money
          incObj.cash = -tx.cash;
          incObj.reward = -tx.reward;
          incObj.bonus = -tx.bonus;
        }

        bulkOps.push({
          updateOne: {
            filter: { _id: tx.userId },
            update: {
              $inc: {
                "balance.cash": incObj.cash,
                "balance.reward": incObj.reward,
                "balance.bonus": incObj.bonus,
              },
            },
          },
        });
      }

      // 3. Execute all updates at once
      if (bulkOps.length > 0) {
        await User.bulkWrite(bulkOps);
      }

      // 4. Clear transactions
      await Transaction.deleteMany({ matchId: game._id });

      await _log({
        matchId: game._id,
        message:
          "opponent not ready to play , so match cancelled and all transaction related to this match are removed",
      });

      setTimeout(() => {
        delete rooms[game.roomCode];
      }, 1000 * 60 * 5);
    }
  } catch (error) {
    return {
      success: false,
      message: error.response ? error.response.data.message : error.message,
    };
  }
};
