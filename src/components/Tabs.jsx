import React from "react";

const Tabs = ({ type, setType }) => {
  return (
    <>
      <button
        className={`${type === "repos" && "text-black"}`}
        onClick={() => setType("repos")}
      >
        Repositories
      </button>
      <button
        className={`${type === "received_events" && "text-black"}`}
        onClick={() => setType("received_events")}
      >
        Activity
      </button>
      <button
        className={`${type === "followers" && "text-black"}`}
        onClick={() => setType("followers")}
      >
        Followers
      </button>
    </>
  );
};

export default Tabs;
