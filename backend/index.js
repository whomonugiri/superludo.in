import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import adminRoute from "./routes/admin.route.js";
import multer from "multer";
import sharp from "sharp";
import mime from "mime-types";
import fs from "fs";
import { Server } from "socket.io";

import rateLimit from "express-rate-limit";
import helmet from "helmet";
import mongosanitize from "express-mongo-sanitize";
import morgan from "morgan";
import xss from "xss";
import { createServer } from "http";
import { socketManager } from "./controllers/socket.controller.js";
import { sendStat } from "./controllers/admin/account.controller.js";
import { cleanOtp, cleanPayemnts } from "./controllers/config.controller.js";
import { OnlineGame } from "./models/onlinegame.js";
import {
  fakeMatches,
  getFakeRunningMatches,
  newMatchId,
} from "./controllers/match.controller.js";
import { SpeedLudo } from "./models/speedludo.js";
dotenv.config({});
const PORT = process.env.PORT || 3000;

const app = express();
const server = createServer(app);
app.use(cors());
app.use(mongosanitize());
// app.use(xss);
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "public")));

//middleware
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use(morgan("dev"));

const limiter = rateLimit({
  max: 5000,
  windowMs: 5 * 60 * 1000,
  message:
    "due to some unusual activity on your ip address, you are blocked for 5 minutes, please come after 5 minutes.",
});

export const uploadDir = path.join(__dirname, "public/uploads/screenshots");
export const uploadChatData = path.join(__dirname, "public/uploads/chats");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const corsOptions = {
  // origin: ["https://superludo.in", "https://admin.superludo.in"],
  origin: "*",
  credentials: true,
  methods: ["POST", "GET", "OPTIONS"],
};
export const io = new Server(server, { cors: corsOptions });
app.use(cors(corsOptions));

app.use("/api/v1/user", limiter, userRoute);
app.use("/api/v1/admin", limiter, adminRoute);

// app.get("/newmatch", async (req, res) => {
//   await OnlineGame.create({
//     type: "online",
//     matchId: await newMatchId(),
//     entryFee: 100,
//     prize: 190,
//     roomCode: "032596512",
//   });

//   res.send("its working");
// });

io.on("connection", (socket) => {
  socketManager(io, socket);
});

server.listen(PORT, () => {
  connectDB();
  console.log(`server is running at ${PORT}`);
  setInterval(sendStat, 1000);
  setInterval(cleanOtp, 30 * 60 * 1000);
  setInterval(cleanPayemnts, 20 * 60 * 1000);
  getFakeRunningMatches();
  setInterval(getFakeRunningMatches, 1000 * 60 * 5);
});
