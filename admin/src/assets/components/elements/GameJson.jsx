import { useEffect, useState } from "react";
import { singleFetcher } from "../../../utils/api.manager";

export const GameJson = ({ _id, gameId, gameJson }) => {
  const [json, setJson] = useState("{}");

  const [working, setWorking] = useState(false);
  const updateJson = (data) => {
    setWorking(false);
    setJson(JSON.stringify(data, null, 4));
  };
  const fetchGameJson = () => {
    setWorking(true);
    singleFetcher(
      "/fetchGameJson",
      { _id: _id, gameId: gameId },
      updateJson,
      () => setWorking(false)
    );
  };
  useEffect(() => {
    updateJson(gameJson);
  }, []);
  return (
    <>
      <div>
        <button
          onClick={fetchGameJson}
          className={`btn btn-sm btn-danger w-100 m-0 ${
            working ? "disabled" : ""
          }`}
        >
          FETCH MATCH API DATA
        </button>
      </div>
      <pre
        style={{ backgroundColor: "rgb(214, 248, 219)" }}
        className="border rounded p-3 mt-2 text-primary"
      >
        {json}
      </pre>
    </>
  );
};
