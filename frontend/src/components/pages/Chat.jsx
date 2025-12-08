import { FiSend } from "react-icons/fi";

import { IoArrowBackCircle, IoCloseSharp } from "react-icons/io5";
import { motion } from "motion/react";
import { FaLock } from "react-icons/fa";
import Button1 from "../elements/Button1";
import { io } from "socket.io-client";
import { useEffect, useRef, useState } from "react";
import { API_FETCH_MESSAGES, API_HOST, HOST } from "../../utils/constants";
import axios from "axios";
import { ChatInput } from "../elements/ChatInput";
import { Message } from "../elements/Message";
import { ChatHead } from "../elements/ChatHead";
import { useSelector } from "react-redux";
import moment from "moment";
import toastr from "toastr";

var skip = 0;
export const chatTime = (date) => {
  return new Date(date).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

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
export const Chat = () => {
  const [selectedImage, setSelectedImage] = useState();
  const [status, setStatus] = useState("Offline");
  let lastDate = null;
  const chatscreen = useRef(null);
  const [socket, setSocket] = useState(null);

  const myRef = useRef();
  const chatContainerRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [loadmore, setLoadmore] = useState(true);
  const { isAuth, mobileNumber } = useSelector((store) => store.auth);

  const fetchMessages = async () => {
    if (!loadmore) return;

    if (!chatContainerRef.current) return;

    const chatBox = chatContainerRef.current;
    const scrollHeightBefore = chatBox.scrollHeight;
    const scrollTopBefore = chatBox.scrollTop;
    ////console.log(scrollHeightBefore, scrollTopBefore);

    try {
      const headers = {
        "Content-Type": "application/json",
        _t: localStorage.getItem("_tk"),
        _di: localStorage.getItem("_di"),
      };
      const res = await axios.post(
        API_HOST + API_FETCH_MESSAGES,
        {
          skip: skip,
          ...headers,
        },
        { headers }
      );

      ////console.log(res.data);

      if (res.data.success) {
        if (res.data.messages.length > 0) {
          setMessages((oldMessages) => [...res.data.messages, ...oldMessages]);
          if (skip < 1) {
            chatscreen.current?.scrollIntoView({ behavior: "smooth" });
          }

          skip += res.data.messages.length;
          setTimeout(() => {
            chatBox.scrollTop =
              chatBox.scrollHeight - scrollHeightBefore + scrollTopBefore;
          }, 0);
        } else {
          setLoadmore(false);
        }
      } else {
        toastr.error(res.data.message);
      }

      ////console.log(txns);
    } catch (error) {
      ////console.log(error);
      toastr.error(error.response ? error.response.data : error.message);
    }
  };
  useEffect(() => {
    if (!isAuth) navigate("/login");
    skip = 0;
    const newSocket = io(HOST, {
      query: {
        mobileNumber: mobileNumber,
      },
    });

    newSocket.on("connect", () => {
      console.log("User Chat connected");
      newSocket.emit("getadminstatus", mobileNumber);
    });

    newSocket.on("adminstatus", (status) => {
      console.log("adminstatus : ", status);
      setStatus(status);
    });

    newSocket.on("newMsg", (msg) => {
      setMessages((oldMessages) => [...oldMessages, ...msg]);
      setTimeout(() => {
        //console.log(chatscreen);
        chatscreen.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    });

    fetchMessages();
    setTimeout(() => {
      chatscreen.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);

    return () => {
      newSocket.disconnect();
    };
  }, []);
  return (
    <>
      {selectedImage && (
        <motion.div>
          <div
            className="d-flex align-items-center position-fixed"
            style={{
              height: "100vh",
              width: "100%",
              backgroundColor: "black",
              zIndex: "+999",
            }}
          >
            <div
              className="display-5 text-end position-fixed bg-black text-white top-0 w-100"
              onClick={() => {
                setSelectedImage("");
              }}
            >
              <IoCloseSharp />{" "}
            </div>
            <img src={selectedImage} className="w-100" />
          </div>
        </motion.div>
      )}
      {
        <motion.div
          className=""
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          style={{ backgroundAttachment: "fixed", height: "90vh" }}
        >
          {!selectedImage && <ChatHead status={status} />}

          <div
            ref={chatContainerRef}
            className=" position-fixed w-100 overflow-auto mt-5 pt-4"
            style={{ height: "90vh" }}
            onScroll={(e) => {
              if (!chatContainerRef.current || !loadmore) return;
              //console.log(chatContainerRef.current.scrollTop);
              if (chatContainerRef.current.scrollTop === 0) {
                fetchMessages();
              }
            }}
          >
            <div ref={myRef}></div>
            {messages.length < 1 && (
              <div className="text-center py-5">
                <div className="opacity-75">no messages</div>
              </div>
            )}
            {messages &&
              messages.map((msg, index) => {
                const messageDate = formatChatDate(msg.createdAt);
                const showDate = messageDate !== lastDate;
                lastDate = messageDate;
                return (
                  <div key={index}>
                    {showDate && (
                      <div className="date-divider text-center">
                        {messageDate}
                      </div>
                    )}{" "}
                    <Message action={setSelectedImage} msg={msg} />
                  </div>
                );
              })}
            <div ref={chatscreen} className="py-5 my-5"></div>
          </div>

          {!selectedImage && <ChatInput />}
        </motion.div>
      }
    </>
  );
};
