import React from "react";
import "./bids.scss";
import { AiFillHeart, AiOutlineHeart, AiOutlineCrown } from "react-icons/ai";
import item1 from "../../assets/item1.png";
import { Link } from "react-router-dom";
import { useContractWrite, useWaitForTransaction } from "wagmi";
import usePick from "../../useContract/usePick";
import { useNavigate } from "react-router-dom";

const Bid = ({
  resultId,
  img,
  miner,
  time,
  isPicked,
  pickable,
  endtime,
  taskId,
}) => {
  const navigate = useNavigate();
  let {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePick({ taskId, resultId });
  const { data, error, isError, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess(data) {
      console.log("Success", data);
    },
  });

  return (
    <div className="card-column">
      <div className={isPicked ? "bids-card gradient-border" : "bids-card"}>
        {isPicked ? (
          <div className="bids-card-winner">
            {" "}
            <span>Creator Picked</span>
            <AiOutlineCrown />{" "}
          </div>
        ) : null}
        <div className="bids-card-top">
          {img ? (
            <img src={img} className="img" />
          ) : (
            <div className="none-img">No Miner</div>
          )}
          <Link to={`/miner/${miner}`}>
            <p className="bids-title">
              <span>Miner: </span> <span>{miner ?? "No Miner"}</span>
            </p>
          </Link>
        </div>
        <div className="bids-card-bottom">
          <div>
            <p>
              <span>Time: </span>
              <span>{time ?? "No miner"}</span>
            </p>
          </div>
          {pickable ? (
            miner ? (
              <button disabled={!write || isLoading} onClick={() => write?.()}>
                {isLoading ? "Choosing ..." : "Choose"}
              </button>
            ) : endtime ? (
              <button> {endtime}</button>
            ) : null
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Bid;
