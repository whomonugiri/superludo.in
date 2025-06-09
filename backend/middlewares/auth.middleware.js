import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const auth = async (req, res, next) => {
  try {
    const token = req.headers["_t"] || req.body._t;
    const deviceId = req.headers["_di"] || req.body._di;

    if (!token || !deviceId) {
      return res.json({
        success: false,
        message: "no_auth_message",
      });
    }

    const decode = await jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decode) {
      return res.json({
        status: false,
        message: "no_auth_message",
      });
    }

    req.userId = decode.userId;
    const user = await User.findById(req.userId);

    if (user) {
      if (user.status != "active") {
        return res.json({
          status: false,
          message: "no_auth_message",
        });
      }
      req.deviceId = deviceId;
      req.user = user;
      next();
    } else {
      return res.json({
        status: false,
        message: "no_auth_message",
      });
    }
  } catch (error) {
    // console.log(error);
    return res.json({
      status: false,
      message: "no_auth_message",
    });
  }
};

export default auth;
