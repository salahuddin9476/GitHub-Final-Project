import React, { useEffect, useRef, useState } from "react";
import UsersContainer from "../components/UsersContainer";
import Loading from "../components/Loading";

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const user = useRef("");

  const BaseURL = "https://api.github.com/users";

  const fetchAllUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(BaseURL);
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching all users:", error);
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const findUser = async () => {
    setLoading(true);
    setError(null);
    try {
      if (user.current.value !== "") {
        const res = await fetch(BaseURL + "/" + user.current.value);
        if (res.status === 404) {
          throw new Error("User not found");
        }
        const data = await res.json();
        setUsers([data]);
        user.current.value = "";
      } else {
        fetchAllUsers();
      }
    } catch (error) {
      console.error("Error finding user:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div>
      <div className="flex justify-center items-center h-11 my-5">
        <input
          type="text"
          placeholder="Search GitHub UserID here.."
          className="h-full md:w-1/3 w-2/3 text-black px-2 font-semibold outline-none border rounded-md"
          ref={user}
        />
        <button
          onClick={findUser}
          className="bg-sky-950 font-semibold px-4 h-full border rounded-md"
        >
          Search
        </button>
      </div>
      {loading ? (
        <Loading />
      ) : error ? (
        <div className="text-red-500 font-semibold text-center">{error}</div>
      ) : (
        <UsersContainer users={users} />
      )}
    </div>
  );
};

export default Users;
