import React from "react";

import useADNCall from "../../useContract/useADNCall";
import useANDCallArray from "../../useContract/useADNCallArray";
import useADNFTCall from "../../useContract/useADNFTCall";
import BidNFTCard from "../bids/BidNFTCard";
import BidReadOnly from "../bids/BidReadOnly";

export default function ListBidNFT({ number }) {
  const { data: total } = useADNFTCall("totalSupply");
  var tokenIds = [];
  let to = total?.toNumber()-1;
  let from = to - number;
  if (from < 0) from = 0;
  for (var i = to; i >= from; i--) {
    tokenIds.push(i);
  }
  console.log("Token ids", tokenIds)
  return (
    <div className="bids section__padding">
      <div className="bids-container">
        <div className="bids-container-card">
          {tokenIds?.map((tokenId, index) => (
            <BidNFTCard key={index} tokenId={tokenId} />
          ))}
        </div>
      </div>
    </div>
  );
}
