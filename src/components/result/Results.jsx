import React from "react";
import "./results.css";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import results1 from "../../assets/bids1.png";

import { Link } from "react-router-dom";

const listResultDemo = [
  {img: results1, miner: "0x30948309", time: "1s ago" },
  {img: results1, miner: "0x30948309", time: "1s ago" },
  {img: results1, miner: "0x30948309", time: "1s ago" },
  {img: results1, miner: "0x30948309", time: "1s ago" },
]
const Results = ({ listResult = listResultDemo }) => {
  return (
    <div className="results section__padding">
      <div className="results-container">
        <div className="results-container-text">
          <h1>Result From Miners</h1>
        </div>
        <div className="results-container-card">
          {listResult.map((result, index) => (
            <div className="card-column" key={index}>
              <div className="results-card">
                <div className="results-card-top">
                  <img src={result.img} alt="" />
                  <Link to={`/miner/${result.miner}`}>
                    <p className="results-title">{result.miner}</p>
                  </Link>
                </div>
                <div className="results-card-bottom">
                  <p>
                    <span>Time: </span> {result.time} 
                  </p>
                  <p>
                    {" "}
                    <AiFillHeart /> 92
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Results;
