import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Tabs from "../components/Tabs";
import Events from "../components/Events";
import UsersContainer from "../components/UsersContainer";
import Repo from "../components/Repo";

const UserInfo = () => {
  const [user, setUser] = useState(null);
  const [type, setType] = useState("repos");
  const [infos, setInfos] = useState([]);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const BaseURL = "https://api.github.com/users";

  const getUserInfo = async () => {
    try {
      const res = await fetch(BaseURL + pathname);
      const data = await res.json();
      setUser(data);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  const getUrls = async () => {
    try {
      const res = await fetch(BaseURL + pathname + `/${type}`);
      const data = await res.json();
      setInfos(data);
    } catch (error) {
      console.error("Error fetching user URLs:", error);
    }
  };

  useEffect(() => {
    getUserInfo();
    getUrls();
  }, [pathname, type]);

  return (
    <div className="py-5">
      <button
        onClick={() => navigate("/")}
        className="px-5 py-1 font-medium mx-1 my-4 bg-black rounded text-gray-200"
      >
        Back
      </button>
      {user && (
        <div className="flex justify-center md:flex-row md:px-0 px-4 flex-col gap-10">
          <img
            src={user.avatar_url}
            alt={`${user.login}'s avatar`}
            className="w-[350px] rounded-lg md:mx-0 mx-auto"
          />
          <div className="text-lg px-3 leading-10">
            <h1 className="text-3xl pb-4 text-black font-extrabold">
              {user?.name}
            </h1>
            <h1>
              <span className="text-black">Login Name</span> : {user?.login}
            </h1>
            <h1>
              <span className="text-black">followers</span> : {user?.followers}
            </h1>
            <h1>
              <span className="text-black">following</span> : {user?.following}
            </h1>
            <h1>
              <span className="text-black">Public_Repositories</span> :{" "}
              {user?.public_repos}
            </h1>
            <h1>
              <span className="text-black">Join</span> :{" "}
              {new Date(user?.created_at).toLocaleDateString()}
            </h1>
            <a
              href={user?.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-200 font-semibold rounded cursor-pointer px-4 py-1 bg-sky-950 my-3 tracking-wide"
            >
              Visit
            </a>
          </div>
        </div>
      )}
      <div className="flex border-b border-green-600 pb-4 gap-6 mt-[10%] mb-6 justify-center md:text-xl">
        <Tabs type={type} setType={setType} />
      </div>
      {type === "repos" && (
        <div className="grid md:grid-cols-2 grid-cols-1 gap-7 w-10/12 mx-auto">
          {infos && <Repo repos={infos} />}
        </div>
      )}
      {type === "received_events" && (
        <div className="grid md:grid-cols-2 grid-cols-1 gap-7 w-10/12 mx-auto">
          {infos && <Events events={infos} />}
        </div>
      )}
      {type === "followers" && (
        <div>
          <UsersContainer users={infos} />
        </div>
      )}
    </div>
  );
};

export default UserInfo;
