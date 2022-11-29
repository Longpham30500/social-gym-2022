import React, { useEffect } from "react";
import Status from "../components/home/Status";
import Posts from "../components/home/Post";
import { useSelector } from "react-redux";
import LoadIcon from '../images/loading.gif'
import axios from "axios";

const Home = () => {
  const { homePosts } = useSelector(state => state)

  return (
    <div className="home row mx-0">
      <div className="col-md-12">
        <Status />

        {
          homePosts.loading
          ? <img src={LoadIcon} alt="loading" className="d-block mx-auto" />
          : homePosts.result === 0 
            ? <h2 className="text-center">No Post</h2>
            :<Posts />
        }
      </div>
      
      <div className="col-md-4"></div>
    </div>
  );
};

export default Home;
