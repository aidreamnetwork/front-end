import { useState, useEffect } from "react";
import "./bids.scss";
import { AiFillHeart, AiOutlineHeart, AiOutlineCrown } from "react-icons/ai";
import item1 from "../../assets/item1.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import getResultFullData from "../../useContract/getResultFullData";
import { getIPFSLink } from "../../utils";

const BidReadOnly = ({ resultId }) => {
  console.log(resultId);
  const { data, isError, isLoading } = getResultFullData(resultId);
  console.log(data);
  const [isPicked, setIsPicked] = useState();
  const [img, setImg] = useState();
  useEffect(() => {
    if (data) {
      setIsPicked(data.taskData.resultPicked.toNumber() == resultId);
      setImg(getIPFSLink(data.resultData.result));
    }
  }, [data]);
  return (
    <div className="card-column">
      {isLoading || isError ? (
        <div className="bids-card">
          <div className="bids-card-top">
            <div className="none-img">Loading...</div>
            <Link>
              <p className="bids-title">
                {" "}
                <span>Miner: </span> <span>Loading...</span>
              </p>
            </Link>
          </div>
          <div className="bids-card-bottom">
            <div>
              <p>
                <span>Time: Loadding </span>
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className={isPicked ? "bids-card gradient-border" : "bids-card"}>
          {isPicked ? (
            <div className="bids-card-winner">
              <span>Creator Picked</span>
              <AiOutlineCrown />{" "}
            </div>
          ) : null}

          <div className="bids-card-top">
            <div className="img">
              <img src={img} className="img" />

              <div className="img-prompt">
                <span>Prompt:</span><span> "{data?.taskData?.prompt}"</span>
              </div>
            </div>
            <Link to={`/task/${data?.taskId?.toNumber()}`}>
              <p className="bids-title">
                <span>ID: </span> <span>{resultId}</span>
              </p>
              <p className="bids-title">
              <span>TaskId: </span> <span>{data?.taskId?.toNumber()}</span>
              <span>NFT: </span> <span>[{data?.tokenId?.toNumber()}]</span>
              </p>
            </Link>
          </div>
          <div className="bids-card-bottom">
            <div>
              <p>
                <span>Time: </span>
                <span>
                  {new Date(
                    data?.resultData?.resolveTime?.toNumber() * 1000
                  ).toLocaleString()}
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BidReadOnly;
