import React from "react";
import { Routes, Route } from "react-router-dom";
import Logo from "./components/Logo";
import { Users } from "./Routes/Users";
import UserInfo from "./Routes/UserInfo";
function App() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-l from-indigo-950 from-10% via-sky-800 via-40% to-indigo-950 to-90% ...">
        <div className="container text-gray-400 py-3">
          <Logo></Logo>
          <Routes>
            <Route path="/" element={<Users />}></Route>
            <Route path="/:name" element={<UserInfo />}></Route>
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
