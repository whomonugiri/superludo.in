import {
  Container,
  Button,
  darkColors,
  lightColors,
} from "react-floating-action-button";
import { HiMiniChatBubbleLeftRight } from "react-icons/hi2";
import { GrChat } from "react-icons/gr";
import { NavLink } from "react-router";
import { useSelector } from "react-redux";

export const FloatButton = (props) => {
  const { unreadMessage } = useSelector((store) => store.user);
  return (
    <>
      {" "}
      <NavLink to="/chat" className={`floater`}>
        <Container
          className={
            unreadMessage > 0 &&
            "animate__ animate__animated animate__headShake animate__infinite"
          }
        >
          <Button
            onClick={props.action}
            styles={{
              backgroundColor: darkColors.red,
              color: lightColors.white,
            }}
          >
            <GrChat className="fs-2" />
            {unreadMessage > 0 && (
              <div
                className="d-flex align-items-center justify-content-center"
                style={{
                  backgroundColor: "black",
                  width: "22px",
                  height: "22px",
                  position: "absolute",
                  borderRadius: "50%",
                  marginTop: "-35px",
                  right: "-2px",
                }}
              >
                {unreadMessage}
              </div>
            )}
          </Button>
        </Container>
      </NavLink>
    </>
  );
};
