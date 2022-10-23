import React from "react";
import { useParams } from "react-router-dom";
import "./profile.scss";
import profile_banner from "../../assets/profile_banner.png";
import profile_pic from "../../assets/profile.jpg";
import Bids from "../../components/bids/Bids";

import BidsWrapper from "./BidsWrapper";
import TasksWrapper from "./TasksWrapper";

const Profile = ({ isMiner }) => {
  let { id } = useParams();

  return (
    <div className="profile section__padding">
      <div className="profile-top">
        <div className="profile-banner">
          <img src={profile_banner} alt="banner" />
        </div>
        <div className="profile-pic">
          <img src={profile_pic} alt="profile" />
          <h3>{id}</h3>
        </div>
      </div>
      <div className="profile-bottom">
       {isMiner?<BidsWrapper miner={id}/>:<TasksWrapper creator={id}/>}
      </div>
    </div>
  );
};

export default Profile;
