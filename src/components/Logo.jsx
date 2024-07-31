import React from "react";

const Logo = () => {
  return (
    <div className="flex pb-2 justify-center items-center border-b border-green-600">
      <a href="/">
        <img
          src="https://img.icons8.com/?size=100&id=LoL4bFzqmAa0&format=png&color=000000"
          className="w-24 rounded-full"
        />
      </a>
      <h1 className="text-4xl text-white font-extrabold px-2 ">
        GitHub Profile Viewer
      </h1>
    </div>
  );
};

export default Logo;
