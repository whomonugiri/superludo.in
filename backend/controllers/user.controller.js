import crypto from "crypto";
import otpG from "otp-generator";
import axios from "axios";
import OTP from "../models/otp.model.js";
import User from "../models/user.model.js";
import uniqueString from "unique-string";
import jwt from "jsonwebtoken";
import { Transaction } from "../models/transaction.models.js";
import { _config } from "./config.controller.js";
import { ManualMatch } from "../models/manualmatch.model.js";
import { Message } from "../models/message.model.js";
import { Info } from "../models/info.model.js";
import { Game } from "../models/game.model.js";
import { onlineusers } from "./socket.controller.js";
import { io } from "../index.js";
import { OnlineGame } from "../models/onlinegame.js";
import { SpeedLudo } from "../models/speedludo.js";
import DEVELOPER from "../models/developer.model.js";
import { QuickLudo } from "../models/quickludo.js";
import { OnlineGame2 } from "../models/onlinegame2.js";
const otpOptions = {
  lowerCaseAlphabets: false,
  upperCaseAlphabets: false,
  specialChars: false,
};
var sandbox_auth_token = null;
const isMobileNumberIsRegistred = async (mobileNumber) => {
  try {
    const user = await User.findOne({ mobileNumber: mobileNumber });
    return user;
  } catch {
    //console.error("Error finding user:", error);
    return false;
  }
};

const generateUsername = async () => {
  try {
    const lastuser = await User.findOne({ username: { $regex: /^player\d+$/ } })
      .sort({ username: -1 }) // Sort in descending order
      .exec();

    let nextNumber = 14271;
    if (lastuser) {
      const match = lastuser.username.match(/^player(\d+)$/);
      if (match) {
        nextNumber = parseInt(match[1], 10) + 1;
      }
    }

    return "player" + nextNumber;
  } catch (error) {
    ////console.log("genusername", error);
  }
};

export const fetchTextData = async (req, res) => {
  try {
    const infos = await Info.find();
    const games = await Game.find();
    const td = {};

    infos.forEach((info) => {
      td[info.title] = { hindi: info.hindiText, english: info.englishText };
    });

    games.forEach((info) => {
      td[info.title] = { hindi: info.guidehindi, english: info.guideenglish };
    });

    return res.json({
      success: true,
      data: td,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.response ? error.response.data.message : error.message,
    });
  }
};

const generateReferralCode = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"; // Allowed characters
  const length = 7; // Length of the referral code
  let referralCode = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length); // Generate a random index
    referralCode += characters[randomIndex];
  }

  return referralCode;
};

const isReferralCodeUnique = async (code) => {
  const existingCode = await User.findOne({ referralCode: code }); // Replace with your model and field
  return !existingCode;
};

const generateUniqueReferralCode = async () => {
  let referralCode;
  let isUnique = false;

  while (!isUnique) {
    referralCode = generateReferralCode();
    isUnique = await isReferralCodeUnique(referralCode);
  }

  return referralCode;
};

export const balance = async (req) => {
  const account = await Transaction.aggregate([
    { $match: { userId: req.user._id } },
    {
      $group: {
        _id: "$userId",
        cashcredit: {
          $sum: {
            $cond: [
              {
                $and: [
                  { $eq: ["$txnType", "credit"] },
                  { $eq: ["$status", "completed"] },
                ],
              },
              "$cash", // If both conditions are true, return the amount
              0, // Otherwise, return 0
            ],
          },
        },
        cashdebit: {
          $sum: {
            $cond: [
              {
                $and: [
                  { $eq: ["$txnType", "debit"] },
                  { $eq: ["$status", "completed"] },
                ],
              },
              "$cash", // If both conditions are true, return the amount
              0, // Otherwise, return 0
            ],
          },
        },
        bonuscredit: {
          $sum: {
            $cond: [
              {
                $and: [
                  { $eq: ["$txnType", "credit"] },
                  { $eq: ["$status", "completed"] },
                ],
              },
              "$bonus", // If both conditions are true, return the amount
              0, // Otherwise, return 0
            ],
          },
        },
        bonusdebit: {
          $sum: {
            $cond: [
              {
                $and: [
                  { $eq: ["$txnType", "debit"] },
                  { $eq: ["$status", "completed"] },
                ],
              },
              "$bonus", // If both conditions are true, return the amount
              0, // Otherwise, return 0
            ],
          },
        },
        rewardcredit: {
          $sum: {
            $cond: [
              {
                $and: [
                  { $eq: ["$txnType", "credit"] },
                  { $eq: ["$status", "completed"] },
                ],
              },
              "$reward", // If both conditions are true, return the amount
              0, // Otherwise, return 0
            ],
          },
        },
        rewarddebit: {
          $sum: {
            $cond: [
              {
                $and: [
                  { $eq: ["$txnType", "debit"] },
                  { $eq: ["$status", "completed"] },
                  { $ne: ["$txnCtg", "withdrawal"] },
                ],
              },
              "$reward", // If both conditions are true, return the amount
              0, // Otherwise, return 0
            ],
          },
        },
        withdraw: {
          $sum: {
            $cond: [
              {
                $and: [
                  { $eq: ["$txnType", "debit"] },
                  { $eq: ["$txnCtg", "withdrawal"] },
                  { $ne: ["$status", "cancelled"] },
                ],
              },
              "$reward", // If both conditions are true, return the amount
              0, // Otherwise, return 0
            ],
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        cash: { $subtract: ["$cashcredit", "$cashdebit"] },
        reward: {
          $subtract: ["$rewardcredit", { $add: ["$rewarddebit", "$withdraw"] }],
        },
        bonus: { $subtract: ["$bonuscredit", "$bonusdebit"] },
      },
    },
  ]);

  const money = {
    cash: 0,
    reward: 0,
    bonus: 0,
    balance: 0,
  };
  if (account.length > 0) {
    money.cash = account[0].cash.toFixed(2) || 0;
    money.reward = account[0].reward.toFixed(2) || 0;
    money.bonus = account[0].bonus.toFixed(2) || 0;
    money.cash = Number(money.cash);
    money.reward = Number(money.reward);
    money.bonus = Number(money.bonus);

    money.balance =
      Number(money.cash) + Number(money.reward) + Number(money.bonus);
  }

  return money;
};

export const oldbalance = async (req) => {
  const account = await Transaction.aggregate([
    { $match: { userId: req.user._id } },
    {
      $group: {
        _id: "$userId",
        cashcredit: {
          $sum: {
            $cond: [
              {
                $and: [
                  { $eq: ["$txnType", "credit"] },
                  { $eq: ["$status", "completed"] },
                ],
              },
              "$cash", // If both conditions are true, return the amount
              0, // Otherwise, return 0
            ],
          },
        },
        cashdebit: {
          $sum: {
            $cond: [
              {
                $and: [
                  { $eq: ["$txnType", "debit"] },
                  { $eq: ["$status", "completed"] },
                ],
              },
              "$cash", // If both conditions are true, return the amount
              0, // Otherwise, return 0
            ],
          },
        },
        bonuscredit: {
          $sum: {
            $cond: [
              {
                $and: [
                  { $eq: ["$txnType", "credit"] },
                  { $eq: ["$status", "completed"] },
                ],
              },
              "$bonus", // If both conditions are true, return the amount
              0, // Otherwise, return 0
            ],
          },
        },
        bonusdebit: {
          $sum: {
            $cond: [
              {
                $and: [
                  { $eq: ["$txnType", "debit"] },
                  { $eq: ["$status", "completed"] },
                ],
              },
              "$bonus", // If both conditions are true, return the amount
              0, // Otherwise, return 0
            ],
          },
        },
        rewardcredit: {
          $sum: {
            $cond: [
              {
                $and: [
                  { $eq: ["$txnType", "credit"] },
                  { $eq: ["$status", "completed"] },
                ],
              },
              "$reward", // If both conditions are true, return the amount
              0, // Otherwise, return 0
            ],
          },
        },
        rewarddebit: {
          $sum: {
            $cond: [
              {
                $and: [
                  { $eq: ["$txnType", "debit"] },
                  { $eq: ["$status", "completed"] },
                  { $ne: ["$txnCtg", "withdrawal"] },
                ],
              },
              "$reward", // If both conditions are true, return the amount
              0, // Otherwise, return 0
            ],
          },
        },
        withdraw: {
          $sum: {
            $cond: [
              {
                $and: [
                  { $eq: ["$txnType", "debit"] },
                  { $eq: ["$txnCtg", "withdrawal"] },
                  { $ne: ["$status", "cancelled"] },
                ],
              },
              "$reward", // If both conditions are true, return the amount
              0, // Otherwise, return 0
            ],
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        cash: { $subtract: ["$cashcredit", "$cashdebit"] },
        reward: {
          $subtract: ["$rewardcredit", { $add: ["$rewarddebit", "$withdraw"] }],
        },
        bonus: { $subtract: ["$bonuscredit", "$bonusdebit"] },
      },
    },
  ]);

  const money = {
    cash: 0,
    reward: 0,
    bonus: 0,
    balance: 0,
  };
  if (account.length > 0) {
    money.cash = account[0].cash.toFixed(2) || 0;
    money.reward = account[0].reward.toFixed(2) || 0;
    money.bonus = account[0].bonus.toFixed(2) || 0;
    money.cash = Number(money.cash);
    money.reward = Number(money.reward);
    money.bonus = Number(money.bonus);

    money.balance =
      Number(money.cash) + Number(money.reward) + Number(money.bonus);
  }

  return money;
};
// export const balance = async (req) => {
//   // Use a sensible default object to ensure structure even if user is not found
//   const emptyBalance = { cash: 0, reward: 0, bonus: 0 };

//   // 1. Fetch user data
//   const user = await User.findById(req.user._id).lean();

//   // 2. Determine the user's current balance object, defaulting to emptyBalance
//   const userBalance = user?.balance || emptyBalance;

//   // 3. Extract the parts, ensuring they are always Numbers (using a default of 0)
//   const cash = Number(userBalance.cash) || 0;
//   const reward = Number(userBalance.reward) || 0;
//   const bonus = Number(userBalance.bonus) || 0;

//   // 4. Calculate the total balance
//   const totalBalance = cash + reward + bonus;

//   // 5. Return the structured object
//   return {
//     // Keep cash, reward, and bonus as numbers, formatted to 2 decimal places
//     // (This step is optional, but matches the intent of your original toFixed(2))
//     cash: Number(cash.toFixed(2)),
//     reward: Number(reward.toFixed(2)),
//     bonus: Number(bonus.toFixed(2)),
//     // Return the calculated total balance
//     balance: Number(totalBalance.toFixed(2)),
//   };
// };

export const ubalance = async (user) => {
  const money = await balance({ user: user });

  return money;
};

export const getBalance = async (req, res) => {
  try {
    const money = await balance(req);
    return res.json({
      success: true,
      cash: money.cash,
      reward: money.reward,
      bonus: money.bonus,
      balance: money.balance,
    });
  } catch (error) {
    ////console.log("getBalance", error);
    return res.json({
      success: false,
      message: error.response ? error.response.data.message : error.message,
    });
  }
};

export const autoLogin = async (req, res) => {
  ////console.log("autologin", req.body);
  if (!req.body.token || !req.body.deviceId) {
    return res.json({
      success: false,
      message: "login_first",
    });
  }

  try {
    const decode = await jwt.verify(req.body.token, process.env.JWT_SECRET_KEY);
    let user = null;
    if (decode) {
      user = await User.findOne({
        _id: decode.userId,
        deviceId: req.body.deviceId,
      });
    } else {
      user = false;
    }

    if (user) {
      if (user.status != "active") {
        return res.json({
          success: false,
          message: "no_auth_msg",
        });
      }

      const tokenData = { userId: user._id };
      const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY);

      // const deviceId = uniqueString();
      // const result = await User.updateOne(
      //   { _id: user._id }, // Filter by user ID
      //   { $set: { deviceId: deviceId } } // Update the fullName field
      // );
      const key = Object.entries(onlineusers).find(
        ([k, v]) => v === user.mobileNumber
      )?.[0];

      if (key) {
        io.to(onlineusers[user.mobileNumber]).emit("userstatus", "Offline");
        delete onlineusers[key];
      }

      const money = await balance({ user: user });
      const config = await _config();
      const unreadMessage = await Message.countDocuments({
        isAdmin: true,
        isRead: false,
        receiverId: user._id,
      });
      return res.json({
        success: true,
        message: "login_first",
        _tk: token,
        _di: req.body.deviceId,
        username: user.username,
        fullName: user.fullName,
        mobileNumber: user.mobileNumber,
        referralCode: user.referralCode,
        profile: user.profilePic,
        balance: money.balance,
        unreadMessage: unreadMessage,
        config: {
          depositUPI: config.MANUAL_UPI_ID,
          minQrDeposit: config.MINIMUM_DEPOSIT_QR,
          maxQrDeposit: config.MAXIMUM_DEPOSIT_QR,
          minUpiDeposit: config.MINIMUM_DEPOSIT_UPI,
          maxUpiDeposit: config.MAXIMUM_DEPOSIT_UPI,
          youtubeVideoLink: config.YOUTUBE_VIDEO_LINK,
          referralCommisionLevel1: config.REFERRAL_LEVEL1,
          referralCommisionLevel2: config.REFERRAL_LEVEL2,
          minWithdraw: config.MINIMUM_WITHDRAW,
          maxWithdraw: config.MAXIMUM_WITHDRAW,
          withdrawLimit: config.WITHDRAW_DAY_LIMIT,
          withdrawStart: config.WITHDRAW_START_TIME,
          withdrawEnd: config.WITHDRAW_END_TIME,
          withdrawActive: config.WITHDRAW_STATUS,
          kyc: user.kyc,
          upiId: user.upiId,
          bankName: user.bankName,
          bankAccountNo: user.bankAccountNo,
          bankIfscCode: user.bankIfscCode,
          _y: user._y || false,
        },
        kycData: user.kycData,
      });
    } else {
      return res.json({
        success: false,
        message: "something_is_wrong",
      });
    }
  } catch (error) {
    ////console.log(error);
  }
};

// export const verifyOtp = async (req, res) => {
//   try {
//     const otp = await OTP.findOne({
//       _id: req.body.otpRef,
//       mobileNumber: req.body.mobileNumber,
//     });

//     if (otp) {
//       //verificavtion
//       const config = await _config();

//       const url = "https://auth.otpless.app/auth/v1/verify/otp";
//       const headers = {
//         clientId: config.OTPLESS_CLIENT_ID,
//         clientSecret: config.OTPLESS_SECRET,
//         "Content-Type": "application/json",
//       };

//       const data = {
//         requestId: otp.otp.toString(),
//         otp: req.body.otp.toString(),
//       };

//       const result = await axios.post(url, data, { headers });

//       //verifiacts

//       if (result.data && result.data.isOTPVerified) {
//         const user = await isMobileNumberIsRegistred(req.body.mobileNumber);
//         if (user) req.body.action = "login";
//         if (req.body.action == "login") {
//           //login new user

//           if (user) {
//             const tokenData = { userId: user._id };
//             const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY);

//             const deviceId = uniqueString();
//             const result = await User.updateOne(
//               { _id: user._id }, // Filter by user ID
//               { $set: { deviceId: deviceId } } // Update the fullName field
//             );

//             if (result.modifiedCount > 0) {
//               const money = await balance({ user: user });
//               return res.json({
//                 success: true,
//                 message: "login_success",
//                 _tk: token,
//                 _di: deviceId,
//                 username: user.username,
//                 fullName: user.fullName,
//                 mobileNumber: user.mobileNumber,
//                 referralCode: user.referralCode,
//                 profile: user.profilePic,
//                 balance: money.balance,
//               });
//             } else {
//               res.json({
//                 success: false,
//                 message: "something_is_wrong",
//               });
//             }
//           } else {
//             res.json({
//               success: false,
//               message: "something_is_wrong",
//             });
//           }
//         } else if (req.body.action == "register") {
//           //register new user
//           const newuser = {
//             fullName: req.body.fullName,
//             mobileNumber: req.body.mobileNumber,
//             username: await generateUsername(),
//             referBy: req.body.referralCode,
//             referralCode: await generateUniqueReferralCode(),
//             deviceId: uniqueString(),
//           };

//           const check = await User.create(newuser);
//           const tokenData = { userId: check._id };
//           const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY);

//           if (check) {
//             const config = await _config();
//             if (config.JOINING_BONUS > 0) {
//               const htxnid = await newTxnId();
//               const hostNewTxn = {
//                 txnId: htxnid,
//                 userId: check._id,
//                 amount: config.JOINING_BONUS,
//                 cash: 0,
//                 reward: 0,
//                 bonus: config.JOINING_BONUS,
//                 remark: "Joining Bonus",
//                 status: "completed",
//                 txnType: "credit",
//                 txnCtg: "bonus",
//               };

//               const h = await Transaction.create(hostNewTxn);
//             }

//             const money = await balance({ user: check });
//             return res.json({
//               success: true,
//               message: "register_success",
//               _tk: token,
//               _di: newuser.deviceId,
//               username: newuser.username,
//               fullName: newuser.fullName,
//               mobileNumber: newuser.mobileNumber,
//               referralCode: newuser.referralCode,
//               profile: newuser.profilePic,
//               balance: money.balance,
//             });
//           } else {
//             res.json({
//               success: false,
//               message: "something_is_wrong",
//             });
//           }
//         }
//       } else {
//         return res.json({
//           success: false,
//           message: "io",
//         });
//       }
//     }
//   } catch (error) {
//     if (error.response.data.description == "Request error: Incorrect OTP!") {
//       return res.json({
//         success: false,
//         message: "io",
//       });
//     }
//     return res.json({
//       success: false,
//       message: error.response ? error.response.data.message : error.message,
//     });
//   }
// };

export const verifyOtp = async (req, res) => {
  try {
    const otp = await OTP.findOne({
      _id: req.body.otpRef,
      mobileNumber: req.body.mobileNumber,
    });

    if (otp) {
      if (req.body.otp == otp.otp) {
        const user = await isMobileNumberIsRegistred(req.body.mobileNumber);
        if (user) req.body.action = "login";
        if (req.body.action == "login") {
          //login new user

          if (user) {
            const tokenData = { userId: user._id };
            const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY);

            const deviceId = uniqueString();
            const result = await User.updateOne(
              { _id: user._id }, // Filter by user ID
              { $set: { deviceId: deviceId } } // Update the fullName field
            );

            if (result.modifiedCount > 0) {
              const money = await balance({ user: user });
              return res.json({
                success: true,
                message: "login_success",
                _tk: token,
                _di: deviceId,
                username: user.username,
                fullName: user.fullName,
                mobileNumber: user.mobileNumber,
                referralCode: user.referralCode,
                profile: user.profilePic,
                balance: money.balance,
              });
            } else {
              res.json({
                success: false,
                message: "something_is_wrong",
              });
            }
          } else {
            res.json({
              success: false,
              message: "something_is_wrong",
            });
          }
        } else if (req.body.action == "register") {
          //register new user
          const newuser = {
            fullName: req.body.fullName,
            mobileNumber: req.body.mobileNumber,
            username: await generateUsername(),
            referBy: req.body.referralCode,
            referralCode: await generateUniqueReferralCode(),
            deviceId: uniqueString(),
          };

          const check = await User.create(newuser);
          const tokenData = { userId: check._id };
          const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY);

          if (check) {
            await User.updateOne(
              { referralCode: req.body.referralCode },
              { $inc: { "stats.totalReferred": 1 } }
            );

            const config = await _config();
            if (config.JOINING_BONUS > 0) {
              const htxnid = await newTxnId();
              const hostNewTxn = {
                txnId: htxnid,
                userId: check._id,
                amount: config.JOINING_BONUS,
                cash: 0,
                reward: 0,
                bonus: config.JOINING_BONUS,
                remark: "Joining Bonus",
                status: "completed",
                txnType: "credit",
                txnCtg: "bonus",
              };

              const h = await Transaction.create(hostNewTxn);
              await User.updateOne(
                { _id: check._id },
                { $inc: { "balance.bonus": config.JOINING_BONUS } }
              );
            }

            const money = await balance({ user: check });
            return res.json({
              success: true,
              message: "register_success",
              _tk: token,
              _di: newuser.deviceId,
              username: newuser.username,
              fullName: newuser.fullName,
              mobileNumber: newuser.mobileNumber,
              referralCode: newuser.referralCode,
              profile: newuser.profilePic,
              balance: money.balance,
            });
          } else {
            res.json({
              success: false,
              message: "something_is_wrong",
            });
          }
        }
      } else {
        return res.json({
          success: false,
          message: "io",
        });
      }
    }
  } catch (error) {
    ////console.log("error in verify otp", error);
    return res.json({
      success: false,
      message: error.response ? error.response.data.message : error.message,
    });
  }
};
function isNotEmpty(input) {
  const pattern = /[a-zA-Z0-9]/; // Regular expression to match letters or numbers
  return pattern.test(input); // Returns true if the string contains any letter or number
}

function isValidName(name) {
  // Check if name is more than 15 characters
  if (name.length > 15) {
    return false;
  }

  // Count the digits in the name
  const digitCount = (name.match(/\d/g) || []).length;

  // Allow only up to 5 digits
  return digitCount <= 5;
}

export const updateMe = async (req, res) => {
  ////console.log(req.body);
  try {
    if (
      (req.body.fullName || req.body.fullName == "") &&
      (!isNotEmpty(req.body.fullName) || !isValidName(req.body.fullName))
    ) {
      return res.json({
        success: false,
        message: "fullname_check2",
      });
    }

    if (req.body.profilePic && !isNotEmpty(req.body.profilePic)) {
      return res.json({
        success: false,
        message: "noprofile_error",
      });
    }

    const up = {};

    if (req.body.fullName != req.user.fullName && req.user._y !== true) {
      return res.json({
        success: false,
        message: "you are not allowed to change name",
      });
    }

    up.fullName = req.body.fullName;

    if (req.body.profilePic) {
      up.profilePic = req.body.profilePic.split("?")[0];
    }

    if (req.body.upiId) up.upiId = req.body.upiId;
    if (req.body.bankName) up.bankName = req.body.bankName;
    if (req.body.bankAccountNo) up.bankAccountNo = req.body.bankAccountNo;
    if (req.body.bankIfscCode) up.bankIfscCode = req.body.bankIfscCode;

    await User.updateOne(
      { _id: req.user._id }, // Filter by user ID
      { $set: up } // Update the fullName field
    );

    return res.json({
      success: true,
      message: "profile_updated",
      name: req.body.fullName,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.response ? error.response.data.message : error.message,
    });
  }
};

export const sendOtp = async (req, res) => {
  const user = await isMobileNumberIsRegistred(req.body.mobileNumber);
  if (req.body.action == "register" && user) {
    return res.json({
      success: false,
      message: "exists",
    });
  } else if (req.body.action == "login" && !user) {
    return res.json({
      success: false,
      message: "notexists",
    });
  }

  if (req.body.action == "login" && user.status != "active") {
    return res.json({
      success: false,
      message: "notactive",
    });
  }

  if (req.body.action == "register") {
    if (req.body.referralCode && isNotEmpty(req.body.referralCode)) {
      const ru = await User.findOne({
        referralCode: req.body.referralCode,
      });
      if (!ru) {
        return res.json({
          success: false,
          message: "invalid_referral",
        });
      }
    }
  }
  const url = "https://www.fast2sms.com/dev/bulkV2";
  const config = await _config();
  const headers = {
    authorization: config.FAST2SMS_APIKEY,
    "Content-Type": "application/json",
  };
  const otpValue = otpG.generate(6, otpOptions);

  const data = {
    route: "otp",
    variables_values: otpValue,
    flash: 0,
    numbers: req.body.mobileNumber,
  };

  if (config.FAST2SMS_ROUTE == "otp") {
    data.route = "otp";
  } else if (config.FAST2SMS_ROUTE == "dlt") {
    data.route = "dlt";
    data.sender_id = config.FAST2SMS_SENDER_ID;
    data.message = config.FAST2SMS_MESSAGE;
  }

  axios
    .post(url, data, { headers })
    .then(async (response) => {
      const otpref = await OTP.create({
        otp: otpValue,
        mobileNumber: req.body.mobileNumber,
      });
      return res.json({
        success: true,
        message: "6 digit otp sended to your mobile no",
        otpRef: otpref._id,
      });
    })
    .catch((error) => {
      return res.json({
        success: false,
        message: error.response ? error.response.data.message : error.message,
      });
    });
};

// export const sendOtp = async (req, res) => {
//   const specialMobileNumberRegex = /^\d{10}12200$/;
//   if (specialMobileNumberRegex.test(req.body.mobileNumber)) {
//     return res.json({
//       success: true,
//       message: "6-digit OTP sent to your mobile number",
//       otpRef: " ",
//     });
//   }
//   const user = await isMobileNumberIsRegistred(req.body.mobileNumber);
//   if (req.body.action == "register" && user) {
//     return res.json({
//       success: false,
//       message: "exists",
//     });
//   } else if (req.body.action == "login" && !user) {
//     return res.json({
//       success: false,
//       message: "notexists",
//     });
//   }

//   if (req.body.action == "login" && user.status != "active") {
//     return res.json({
//       success: false,
//       message: "notactive",
//     });
//   }

//   if (req.body.action == "register") {
//     if (req.body.referralCode && isNotEmpty(req.body.referralCode)) {
//       const ru = await User.findOne({
//         referralCode: req.body.referralCode,
//       });
//       if (!ru) {
//         return res.json({
//           success: false,
//           message: "invalid_referral",
//         });
//       }
//     }
//   }
//   const config = await _config();

//   const url = "https://auth.otpless.app/auth/v1/initiate/otp";
//   const headers = {
//     clientId: config.OTPLESS_CLIENT_ID,
//     clientSecret: config.OTPLESS_SECRET,
//     "Content-Type": "application/json",
//   };

//   const data = {
//     phoneNumber: "+91" + req.body.mobileNumber,
//     expiry: 150,
//     otpLength: 6,
//     channels: ["SMS", "WHATSAPP"],
//   };

//   axios
//     .post(url, data, { headers })
//     .then(async (response) => {
//       const otpref = await OTP.create({
//         otp: response.data.requestId,
//         mobileNumber: req.body.mobileNumber,
//       });

//       console.log(response.data);
//       return res.json({
//         success: true,
//         message: "6-digit OTP sent to your mobile number",
//         otpRef: otpref._id,
//       });
//     })
//     .catch((error) => {
//       return res.json({
//         success: false,
//         message: error.response ? error.response.data.message : error.message,
//       });
//     });
// };

export const logout = async (req, res) => {
  try {
    return res
      .cookie("_t", "", { maxAge: -1 })
      .cookie("_di", "", { maxAge: -1 })
      .json({
        success: true,
        message: "logged out",
      });
  } catch (error) {
    ////console.log("logout", error);
  }
};

export const newTxnId = async () => {
  const random = crypto.randomBytes(6).toString("hex").toUpperCase(); // 12 chars
  return `TXN${Date.now()}${random}`;
};
function validAmount(value) {
  value = parseInt(value);
  return typeof value === "number" && Number.isInteger(value) && value > 0;
}

export const paymentQr = async (req, res) => {
  try {
    const qrurl =
      "https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=";
    let amount = req.body.amount;
    if (!validAmount(amount)) {
      return res.json({
        success: false,
        message: "invalid_amount_msg",
      });
    }
    const config = await _config();
    if (
      amount > config.MAXIMUM_DEPOSIT_QR ||
      amount < config.MINIMUM_DEPOSIT_QR
    ) {
      return res.json({
        success: false,
        message: "under_limit_msg",
      });
    }

    amount = Number(amount);
    amount = amount.toFixed(2);
    const vpa = config.PAYTM_BUSINESS_VPA;
    const mid = config.PAYTM_BUSINESS_MID;

    const txnid = await newTxnId();
    const note = txnid + " | " + req.user.mobileNumber;

    //txncreation

    const newtxn = {
      MID: mid,
      txnId: txnid,
      userId: req.userId,
      amount: amount,
      txnType: "credit",
      txnCtg: "deposit",
      cash: amount,
      remark: "Added Money",
    };
    //txncreationend
    let paytmlink = null;

    if (true) {
      paytmlink = `paytmmp://cash_wallet?pa=${vpa}&pn=Codegully&am=${amount}&cu=INR&tn=${txnid}&tr=${txnid}&mc=4722&featuretype=money_transfer`;
    }
    await Transaction.create(newtxn);
    let upiurl =
      await `upi://pay?pa=${vpa}&pn=&am=${amount}&tn=${note}&tr=${txnid}`;
    upiurl = encodeURIComponent(upiurl);
    setTimeout(async () => {
      await getPaymentStatus2(newtxn.txnId);
    }, 1000 * 60 * 5);
    return res.json({
      success: true,
      qr: qrurl + upiurl,
      paytm: paytmlink,
      txnid: txnid,
      amount: amount,
    });
  } catch (error) {
    ////console.log("paymentQr", error);
    return res.json({
      success: false,
      message: error.response ? error.response.data.message : error.message,
    });
  }
};

export const getPaymentStatus = async (req, res) => {
  try {
    const config = await _config();
    const data = {};

    data.txnid = req.body.cond.txnId;
    const txn = await Transaction.findOne({ txnId: data.txnid }).lean();

    if (txn.status == "completed") {
      return res.json({
        success: true,
        data: txn,
        message: "transaction status refreshed",
      });
    }
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
    //console.log(tx, req.body);
    const pr = {};
    if (tx.STATUS == "TXN_SUCCESS") {
      if (txn.status != "completed") {
        await User.updateOne(
          { _id: req.user._id },
          { $inc: { "balance.cash": tx.TXNAMOUNT } }
        );
      }
      const txnst = await Transaction.updateOne(
        { txnId: data.txnid }, // Filter by user ID
        {
          $set: {
            status: "completed",
            amount: tx.TXNAMOUNT,
            cash: tx.TXNAMOUNT,
            txnData: JSON.stringify(tx),
          },
        } // Update the fullName field
      );
    }

    const deposit = await Transaction.findOne({ txnId: data.txnid }).lean();

    deposit.user = await User.findOne({ _id: deposit.userId });

    return res.json({
      success: true,
      data: deposit,
      message: "transaction status refreshed",
    });
  } catch (error) {
    ////console.log("paymentQr", error);
    return res.json({
      success: false,
      message: error.response ? error.response.data.message : error.message,
    });
  }
};

export const getPaymentStatus2 = async (txnId) => {
  try {
    const config = await _config();
    const data = {};

    data.txnid = txnId;

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

    const pr = {};
    if (tx.STATUS == "TXN_SUCCESS") {
      if (txn.status != "completed") {
        await User.updateOne(
          { _id: req.user._id },
          { $inc: { "balance.cash": tx.TXNAMOUNT } }
        );
      }

      const txnst = await Transaction.updateOne(
        { txnId: data.txnid }, // Filter by user ID
        {
          $set: {
            status: "completed",
            amount: tx.TXNAMOUNT,
            cash: tx.TXNAMOUNT,

            txnData: JSON.stringify(tx),
          },
        } // Update the fullName field
      );
    } else {
      const fix = {};
      fix.reason =
        "automatically cancelled because of no payment under 5 minutes recieved";
      const result = await Transaction.updateOne(
        {
          txnId: txnId,
          txnCtg: "deposit",
          txnType: "credit",
          status: "pending",
          isManual: false,
        },
        {
          $set: {
            status: "cancelled",
            txnData: JSON.stringify(fix),
          },
        }
      );
    }
  } catch (error) {
    ////console.log("paymentQr", error);
    return {
      success: false,
      message: error.response ? error.response.data.message : error.message,
    };
  }
};

export const fetchTransactions = async (req, res) => {
  try {
    const limit = 15;
    const skip = (req.body.page - 1) * limit;
    const cond = {};
    cond.userId = req.userId;
    if (req.body.ctg != "ALL") {
      cond.txnCtg = req.body.ctg.toLowerCase();
    }
    const txns = await Transaction.find(cond)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    const money = await balance(req);
    return res.json({
      success: true,
      txns: txns,
      balance: money,
    });
  } catch (error) {
    ////console.log("fetchTransactions", error);
    return res.json({
      success: false,
      message: error.response ? error.response.data.message : error.message,
    });
  }
};

export const fetchMyReferrals = async (req, res) => {
  try {
    const limit = 20;
    const skip = (req.body.page - 1) * limit;

    const data = await User.find({ referBy: req.user.referralCode })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return res.json({
      success: true,
      data: data,
    });
  } catch (error) {
    ////console.log("fetchTransactions", error);
    return res.json({
      success: false,
      message: error.response ? error.response.data.message : error.message,
    });
  }
};

export const fetchLeaderboard = async (req, res) => {
  try {
    const account = await Transaction.aggregate([
      // Filter for credit reward transactions with completed status
      {
        $match: {
          txnType: "credit",
          txnCtg: "reward",
          status: "completed",
        },
      },
      // Group by userId and sum the reward
      {
        $group: {
          _id: "$userId",
          totalReward: { $sum: "$reward" },
        },
      },
      // Lookup user details
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      // Exclude users with _su: true
      {
        $match: {
          "user._su": { $ne: true },
        },
      },
      // Project required fields
      {
        $project: {
          _id: 0,
          userId: "$_id",
          name: "$user.fullName",
          mobileNumber: "$user.mobileNumber",
          profilePic: "$user.profilePic",
          kyc: "$user.kyc",
          totalReward: 1,
        },
      },
      // Sort and limit
      {
        $sort: { totalReward: -1 },
      },
      {
        $limit: 30,
      },
    ]);

    return res.json({
      success: true,
      players: account,
    });
  } catch (error) {
    ////console.log("fetchleaderboard", error);
    return res.json({
      success: false,
      message: error.response ? error.response.data.message : error.message,
    });
  }
};

export const fetchMe = async (req, res) => {
  try {
    const stat = {};
    stat.totalEarnings = req.user.stats.totalWinned;

    stat.playedMatch = req.user.stats.totalPlayed;

    stat.wonMatch = req.user.stats.totalWon;
    stat.lostMatch = 0;

    stat.refEarnings = req.user.stats.totalReferralEarnings;

    stat.referredUsers = req.user.stats.totalReferred;
    return res.json({
      success: true,
      stat: stat,
    });
  } catch (error) {
    ////console.log("fetchleaderboard", error);
    return res.json({
      success: false,
      message: error.response ? error.response.data.message : error.message,
    });
  }
};

export const _auth_sandbox = async () => {
  const url = "https://api.sandbox.co.in/authenticate";
  const config = await _config();
  const headers = {
    accept: "application/json",
    "x-api-key": config.SANDBOX_API_KEY,
    "x-api-secret": config.SANDBOX_SECRET_KEY,
    "x-api-version": "2.0",
  };

  const res = await axios.post(url, {}, { headers });
  return res.data.access_token;
};

export const sendAadharOtp = async (authtoken, aadharNo) => {
  const url = "https://api.sandbox.co.in/kyc/aadhaar/okyc/otp";
  const config = await _config();
  const headers = {
    accept: "application/json",
    authorization: authtoken,
    "x-api-key": config.SANDBOX_API_KEY,
    "x-api-version": "2.0",
    "content-type": "application/json",
  };

  const body = JSON.stringify({
    "@entity": "in.co.sandbox.kyc.aadhaar.okyc.otp.request",
    consent: "y",
    reason: "For KYC",
    aadhaar_number: aadharNo,
  });

  const res = await axios.post(url, body, { headers });

  return res.data;
};

function isValidAadhaar(string) {
  // Regular expression to match exactly 12 digits
  const pattern = /^\d{12}$/;
  return pattern.test(string);
}

export const submitKyc = async (req, res) => {
  try {
    const aadharNo = req.body.aadharNo;

    if (!isValidAadhaar(aadharNo)) {
      return res.json({
        success: false,
        message: "invalid_aadhar_no",
      });
    }

    const checkAadhar = await User.findOne({ "kycData.aadhar_no": aadharNo });
    if (checkAadhar) {
      return res.json({
        success: false,
        message: "already_used_aadhar",
      });
    }
    const authorization = await _auth_sandbox();
    sandbox_auth_token = authorization;

    const aadhaarOtpRef = await sendAadharOtp(authorization, aadharNo);
    //29298354
    if (aadhaarOtpRef.data.reference_id) {
      return res.json({
        success: true,
        message: "aadhar_otp_sended",
        otpRef: aadhaarOtpRef.data.reference_id,
      });
    } else {
      return res.json({
        success: false,
        message: "something_is_wrong",
      });
    }
  } catch (error) {
    return res.json({
      success: false,
      message: error.response ? error.response.data.message : error.message,
    });
  }
};

export const verifyAadharOtp = async (refId, otp) => {
  const url = "https://api.sandbox.co.in/kyc/aadhaar/okyc/otp/verify";
  const authorization = sandbox_auth_token;
  const config = await _config();
  const headers = {
    accept: "application/json",
    authorization: authorization,
    "x-api-key": config.SANDBOX_API_KEY,
    "x-api-version": "2.0",
    "content-type": "application/json",
  };

  const body2 = JSON.stringify({
    "@entity": "in.co.sandbox.kyc.aadhaar.okyc.request",
    reference_id: refId,
    otp: otp,
  });
  ////console.log(body2);
  const res = await axios.post(url, body2, { headers });

  return res.data;
};

export const verifyKyc = async (req, res) => {
  try {
    const otp = req.body.otp;
    const refId = req.body.refId.toString();
    const aadharNo = req.body.aadharNo;

    if (!otp || !refId) {
      return res.json({
        success: false,
        message: "otp_check_1",
      });
    }

    const aadhaarData = await verifyAadharOtp(refId, otp);

    //29298354
    if (aadhaarData.data.status && aadhaarData.data.status == "VALID") {
      const kyc = {
        care_of: aadhaarData.data.care_of,
        full_address: aadhaarData.data.full_address,
        date_of_birth: aadhaarData.data.date_of_birth,
        gender: aadhaarData.data.gender,
        name: aadhaarData.data.name,
        photo: aadhaarData.data.photo,
        aadhar_no: aadharNo,
      };

      const result = await User.updateOne(
        { _id: req.user._id }, // Filter by user ID
        {
          $set: {
            fullName: kyc.name,
            kyc: true,
            kycData: kyc,
            kycApiResponse: aadhaarData,
          },
        } // Update the fullName field
      );

      return res.json({
        success: true,
        message: "kyc_verified",
        kycData: kyc,
      });
    } else {
      return res.json({
        success: false,
        message: aadhaarData.data.message || "something_went_wrong",
        data: aadhaarData,
      });
    }
  } catch (error) {
    return res.json({
      success: false,
      message: error.response ? error.response.data.message : error.message,
    });
  }
};
