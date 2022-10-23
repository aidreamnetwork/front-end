import React from "react";

import useADNCall from "../../useContract/useADNCall";
import useANDCallArray from "../../useContract/useADNCallArray";
import BidReadOnly from "../bids/BidReadOnly";

export default function ListBid({ number }) {
  const { data: total  } = useADNCall("resultCount");
  var resultIds = [];
  let to = total?.toNumber();
  let from = to - number;
  for (var i = to; i > from; i--) {
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
