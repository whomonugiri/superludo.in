import jwt from "jsonwebtoken";
import { Admin } from "../models/admin.model.js";

const auth = async (req, res, next) => {
  try {
    const token = req.body._token;
    const deviceId = req.body._deviceId;

    if (!token || !deviceId) {
      return res.json({
        success: false,
        message: "you are not authorized, to perform that action",
      });
    }

    const decode = await jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decode) {
      return res.json({
        status: false,
        message: "you are not authorized, to perform that action",
      });
    }

    req.adminId = decode.adminId;
    const admin = await Admin.findOne({
      _id: req.adminId,
      deviceId: deviceId,
    });

    if (admin) {
      if (admin.status != "active") {
        return res.json({
          status: false,
          message: "you are account is not active",
        });
      }

      req.admin = admin;
      next();
    } else {
      return res.json({
        status: false,
        message: "you are not authorized, to perform that action",
        data: decode,
      });
    }
  } catch (error) {
    // console.log(error);
    return res.json({
      success: false,
      message: error.response ? error.response.data.message : error.message,
    });
  }
};

export default auth;
