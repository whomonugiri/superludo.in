import { useEffect, useRef, useState } from "react";
import { ChatHead } from "./ChatHead";
import { ChatInput } from "./ChatInput";
import { chatfetcher } from "../../../utils/api.manager";
import { Message } from "./Message";
import { io } from "socket.io-client";
import { HOST } from "../../../utils/constants";

import moment from "moment";
import { RotatingLines, ThreeDots } from "react-loader-spinner";
export const formatChatDate = (timestamp) => {
  const messageDate = moment(timestamp);
  const today = moment().startOf("day");
  const yesterday = moment().subtract(1, "day").startOf("day");

  if (messageDate.isSame(today, "day")) {
    return "Today";
  } else if (messageDate.isSame(yesterday, "day")) {
    return "Yesterday";
  } else if (messageDate.isSame(moment(), "year")) {
    return messageDate.format("MMM D"); // e.g., Jan 30
  } else {
    return messageDate.format("MMM D, YYYY"); // e.g., Jan 30, 2025
  }
};

export const formatMessageTime = (timestamp) => {
  return moment(timestamp).format("h:mm A"); // e.g., 10:30 AM
};

export const Chating = ({ user }) => {
  const [page, setPage] = useState(1);
  const [messages, setMessages] = useState([]);
  const chatscreen = useRef(null);
  const [socket, setSocket] = useState(null);
  const [status, setStatus] = useState("Offline");
  const [loadDone, setLoadDone] = useState(false);

  const myRef = useRef();
  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  let lastDate = null;

  const loadComplete = () => {
    setLoadDone(true);
    setTimeout(scrollToBottom, 0);
  };
  useEffect(() => {
    chatfetcher(user._id, page, setPage, setMessages, loadComplete);
  }, [page]);

  useEffect(() => {
    const newSocket = io(HOST, {
      query: {
        mobileNumber: user.mobileNumber,
        isAdmin: true,
      },
    });

    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("User Chat connected");

      newSocket.emit("getuserstatus", user.mobileNumber);
    });

    newSocket.on("userstatus", (status) => {
      console.log("userstatus : ", status);
      setStatus(status);
    });

    newSocket.on("newMsg", (msg) => {
      setMessages((oldData) => [...oldData, ...msg]);
      scrollToBottom();
      setTimeout(scrollToBottom, 0);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <>
      <ChatHead user={user} status={status} />
      <div
        ref={chatContainerRef}
        className=" overflow-auto d-flex flex-column"
        style={{
          backgroundImage: "url('/assets/overlay.png')",
          height: "60vh",
        }}
      >
        {!loadDone && (
          <div className="d-flex justify-content-center align-items-center h-100">
            <RotatingLines
              visible={true}
              height="96"
              width="96"
              color="grey"
              strokeWidth="5"
              animationDuration="0.75"
              ariaLabel="rotating-lines-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        )}

        {loadDone &&
          messages.length > 0 &&
          messages.map((msg, index) => {
            const messageDate = formatChatDate(msg.createdAt);
            const showDate = messageDate !== lastDate;
            lastDate = messageDate;
            return (
              <div key={index}>
                {showDate && (
                  <div className="date-divider text-center text-white fw-bold">
                    {messageDate}
                  </div>
                )}{" "}
                <Message msg={msg} user={user} />
              </div>
            );
          })}
        <div ref={chatscreen} className="py-4 mb-1"></div>
      </div>
      <ChatInput user={user} />
    </>
  );
};
