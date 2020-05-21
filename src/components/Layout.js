import React from "react";
import LeftPane from "./LeftPane";
import RightPane from "./RightPane";

const Layout = () => {
  return (
    <div
      className="container flex flex-grow m-auto justify-around bg-gray-100 flex-row h-full"
      style={{ position: "absolute" }}
    >
      <LeftPane />
      <RightPane />
    </div>
  );
};

export default Layout;
