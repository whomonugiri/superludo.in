import { useEffect, useState } from "react";
import { ChatterList } from "../elements/ChatterList";

import { io } from "socket.io-client";
import { HOST } from "../../../utils/constants";
import { Chating } from "../elements/Chating";
import { useNavigate, useParams } from "react-router-dom";
import { IoMdChatbubbles } from "react-icons/io";
import { fetcher, singleFetcher } from "../../../utils/api.manager";
import { useSelector } from "react-redux";
// var socket = null;
export const ChatSupport = () => {
  const auth = "CHAT SUPPORT";
  const [page, setPage] = useState(1);
  const [list, setList] = useState([]);
  const [socket, setSocket] = useState(null);
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  const { _access, _isSuperadmin } = useSelector((store) => store.auth);
  useEffect(() => {
    if (!_access.includes(auth) && !_isSuperadmin) navigate("/");
    singleFetcher("/fetchUserList", {}, setList, () => {});
    const newSocket = io(HOST, {
      query: {
        adminRoom: "admin",
      },
    });

    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Socket connected");
      newSocket.emit("getlist");

      if (userId) {
        singleFetcher("/fetchUser", { _id: userId }, setUser, () => {});
      }
    });

    newSocket.on("updatechatlist", (list) => {
      setList(list);
    });

    return () => {
      newSocket.disconnect();
      setUser(null);
    };
  }, [userId]);

  return (
    <>
      <div className="d-flex">
        <div className="col-4 bg-white border">
          {list.length > 0 && <ChatterList list={list} />}
          {list.length < 1 && (
            <div className="text-center my-4">no messages found</div>
          )}
        </div>

        {user && (
          <div className="col-8 position-relative bg-white border">
            <Chating user={user} />
          </div>
        )}

        {!user && (
          <div
            className="col-8 text-center position-relative bg-info text-white "
            style={{ fontSize: "15rem" }}
          >
            <IoMdChatbubbles />
          </div>
        )}
      </div>
    </>
  );
};
