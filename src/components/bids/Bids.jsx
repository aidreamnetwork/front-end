import React from "react";
import "./bids.scss";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import bids1 from "../../assets/bids1.png";
import bids2 from "../../assets/bids2.png";
import bids3 from "../../assets/bids3.png";
import bids4 from "../../assets/bids4.png";
import bids5 from "../../assets/bids5.png";
import bids6 from "../../assets/bids6.png";
import bids7 from "../../assets/bids7.png";
import bids8 from "../../assets/bids8.png";
import { Link } from "react-router-dom";
import BidReadOnly from "./BidReadOnly";

const Bids = ({ resultIds }) => {
  return (
    <div className="bids section__padding">
      <div className="bids-container">
        <div className="bids-container-text">
          <h1>List result by miner</h1>
        </div>
        <div className="bids-container-card">
          {resultIds?.map((resultId, index) => (
            <BidReadOnly key={index} resultId={resultId} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Bids;
