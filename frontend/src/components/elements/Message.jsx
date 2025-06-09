import { useSelector } from "react-redux";
import { HOST } from "../../utils/constants";
import { chatTime, formatMessageTime } from "../pages/Chat";
import { IoCheckmarkDone, IoCheckmarkDoneSharp } from "react-icons/io5";
import { motion } from "motion/react";
import { useState } from "react";
import ReactAudioPlayer from "react-audio-player";

export const Message = ({ msg, action }) => {
  if (!msg.image && !msg.text && !msg.audio) return;

  const { mobileNumber } = useSelector((store) => store.auth);
  return (
    <>
      {/* <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}> */}
      <div
        className={`d-flex px-2 ${
          msg.isAdmin ? "align-items-start" : "align-items-end"
        } flex-column mb-3`}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          style={{
            maxWidth: "85%",
            backgroundColor: msg.isAdmin ? "white" : "#d8fdd2",
            borderRadius: msg.isAdmin
              ? "20px 20px 20px 0px"
              : "20px 20px 0px 20px",
          }}
          className={`p-1  border text-white shadow-sm `}
        >
          {msg.audio && (
            <div className="position-relative mb-2 d-flex align-items-center gap-2">
              {/* <audio  className=""></audio> */}
              <ReactAudioPlayer
                controls
                src={`${HOST}/uploads/chats/ADMIN_${mobileNumber}/${msg.audio}`}
              />
            </div>
          )}

          {msg.image && (
            <div>
              <img
                src={`${HOST}/uploads/chats/ADMIN_${mobileNumber}/${msg.image}`}
                width="200px"
                className="rounded rounded-4"
                onClick={() =>
                  action(
                    `${HOST}/uploads/chats/ADMIN_${mobileNumber}/${msg.image}`
                  )
                }
              />
            </div>
          )}
          <div
            className={`text-wrap ${
              msg.isAdmin ? "text-start" : "text-start"
            } small text-dark px-2 py-1`}
          >
            {msg.text}
          </div>
        </motion.div>
        <div className="x-small text-dark opacity-75 mx-3">
          {formatMessageTime(msg.createdAt)}{" "}
          {!msg.isAdmin && (
            <span
              className={`${
                msg.isRead ? "text-primary" : "text-secondary"
              } fs-6`}
            >
              <IoCheckmarkDoneSharp />
            </span>
          )}
        </div>
      </div>
      {/* </motion.div> */}
    </>
  );
};
