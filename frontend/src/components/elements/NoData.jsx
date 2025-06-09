import { CgDebug } from "react-icons/cg";

export const NoData = (props) => {
  return (
    <>
      <div
        className="d-flex gap-2  align-items-center justify-content-center fs-5 my-5 opacity-75"
        style={{ height: "" }}
      >
        <CgDebug />
        {props.text}
      </div>
    </>
  );
};
