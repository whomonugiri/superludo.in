import { fetchChatList } from "./admin/account.controller.js";

export const onlineusers = {};
export var adminOnChat = false;

export const isMobileOnline = (mobileNumber) => {
  //console.log(onlineusers);
  return Object.values(onlineusers).includes(mobileNumber);
};

export const socketManager = (io, socket) => {
  //on connection
  if (socket.handshake.query.mobileNumber) {
    socket.join(socket.handshake.query.mobileNumber);
    let mobileNumber = socket.handshake.query.mobileNumber;

    if (!socket.handshake.query.isAdmin) {
      onlineusers[socket.id] = mobileNumber;
      io.to(mobileNumber).emit("userstatus", "Online");
    } else {
      adminOnChat = true;
      io.to(mobileNumber).emit("adminstatus", "Online");
    }

    //console.log("a user connected " + socket.handshake.query.mobileNumber);
  }

  if (socket.handshake.query.adminRoom) {
    socket.join(socket.handshake.query.adminRoom);
    //console.log("a admin connected ");
    socket.on("getlist", async () => {
      const list = await fetchChatList();
      io.to("admin").emit("updatechatlist", list);
    });
  }

  socket.on("getuserstatus", (mobileNumber) => {
    if (isMobileOnline(mobileNumber)) {
      io.to(mobileNumber).emit("userstatus", "Online");
    } else {
      io.to(mobileNumber).emit("userstatus", "Offline");
    }
  });

  socket.on("getadminstatus", (mobileNumber) => {
    if (adminOnChat) {
      io.to(mobileNumber).emit("adminstatus", "Online");
    } else {
      io.to(mobileNumber).emit("adminstatus", "Offline");
    }
  });

  //on disconnection
  socket.on("disconnect", () => {
    //console.log(" user disconnected");
    if (onlineusers[socket.id]) {
      io.to(onlineusers[socket.id]).emit("userstatus", "Offline");
      delete onlineusers[socket.id];
    } else {
      adminOnChat = false;
      for (let sid in onlineusers) {
        io.to(onlineusers[sid]).emit("adminstatus", "Offline");
      }
    }
  });
};
