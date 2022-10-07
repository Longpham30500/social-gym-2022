import React from "react";
import Status from "../components/home/Status";
import Post from "../components/home/Post";

const Home = () => {
  return (
    <div className="home row mx-0">
      <div className="col-md-8">
        <Status />
        <Post />
      </div>
      
      <div className="col-md-4"></div>
    </div>
  );
};

export default Home;
