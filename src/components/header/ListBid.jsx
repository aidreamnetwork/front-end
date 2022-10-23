import React from "react";

import useADNCall from "../../useContract/useADNCall";
import useANDCallArray from "../../useContract/useADNCallArray";
import BidReadOnly from "../bids/BidReadOnly";

export default function ListBid({ from, to }) {
  var resultIds = [];
  for (var i = from; i <= to; i++) {
    resultIds.push(i);
  }
  return (
    <div className="bids section__padding">
      <div className="bids-container">
        <div className="bids-container-card">
          {resultIds?.map((resultId, index) => (
            <BidReadOnly key={index} resultId={resultId} />
          ))}
        </div>
      </div>
    </div>
  );
}
