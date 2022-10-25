import { useState, useEffect } from "react";
import "./bids.scss";
import { AiFillHeart, AiOutlineHeart, AiOutlineCrown } from "react-icons/ai";
import item1 from "../../assets/item1.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import getResultFullData from "../../useContract/getResultFullData";
import { getIPFSLink } from "../../utils";
import useANDCall from "../../useContract/useADNCall";
import { ADNNFT, BLOCK_EXPLORER } from "../../config";

const BidNFTCard = ({ tokenId }) => {
  const [isPicked, setIsPicked] = useState();
  const [img, setImg] = useState();

  const {
    data: resultIdBig,
    isError: isErrorNFT,
    isLoading: isLoadingNFT,
  } = useANDCall("NFTToResult", [tokenId]);
  const [resultId, setresultId] = useState(resultIdBig?.toNumber());
  const { data, isError, isLoading } = getResultFullData(resultId);
  console.log(data);
  useEffect(() => {
    if(resultIdBig){
      setresultId(resultIdBig?.toNumber());
    }
    if (data) {
      setIsPicked(data.taskData.resultPicked.toNumber() == resultId);
      setImg(getIPFSLink(data.resultData.result));
    }
  }, [data, resultId, resultIdBig]);
  return (
    <div className="card-column">
      {isLoading || isError || isLoadingNFT || isErrorNFT ? (
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
                <span>Prompt:</span>
                <span> "{data?.taskData?.prompt}"</span>
              </div>
            </div>
            <a href={`${BLOCK_EXPLORER}nft/${ADNNFT}/${data?.tokenId?.toNumber()}`} target="_blank">
              <p className="bids-title">
                <span>Token ID: </span> <span>{data?.tokenId?.toNumber()}</span>
              </p>
            </a>
          </div>
          <div className="bids-card-bottom">
            <div>
              <Link to={`/task/${data?.taskId?.toNumber()}`}>
                <p>
                  <span>Task Id: </span>{" "}
                  <span>{data?.taskId?.toNumber()} - </span>
                  <span>Result Id: </span> <span>{resultId}</span>
                </p>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BidNFTCard;
