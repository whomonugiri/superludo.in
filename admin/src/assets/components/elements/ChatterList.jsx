import { useEffect, useState } from "react";
import { fetcher } from "../../../utils/api.manager";
import { CLItem } from "./CLItem";

const socket = null;
export const ChatterList = ({ list }) => {
  return (
    <>
      <div className="bg-white overflow-auto" style={{ height: "78vh" }}>
        {list.map((msg) => (
          <CLItem key={msg._id} msg={msg} />
        ))}
      </div>
    </>
  );
};
