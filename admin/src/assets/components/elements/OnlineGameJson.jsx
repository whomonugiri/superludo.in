import { useEffect, useState } from "react";
import { singleFetcher, transformGameData } from "../../../utils/api.manager";

export const OnlineGameJson = ({ _id, gameId, gameJson }) => {
  const [json, setJson] = useState("{}");

  const [working, setWorking] = useState(false);
  const updateJson = (data) => {
    data = transformGameData(data);
    setWorking(false);
    setJson(JSON.stringify(data, null, 4));
  };

  useEffect(() => {
    updateJson(gameJson);
  }, []);
  return (
    <>
      <pre
        style={{ backgroundColor: "rgb(214, 248, 219)" }}
        className="border rounded p-3 mt-2 text-primary"
      >
        {json}
      </pre>
    </>
  );
};
