import React from "react";
import Bids from "../../components/bids/Bids";

import useADNCall from "../../useContract/useADNCall";
import useANDCallArray from "../../useContract/useADNCallArray";

export default function BidsWrapper({miner}) {
  const { data: totalMinerResultCount } = useADNCall("totalMinerResultCount", [
    miner,
  ]);
  const { data: resultIds } = useANDCallArray(
    "MinerToResults",
    miner,
    0,
    totalMinerResultCount?.toNumber() - 1
  );
  const resultIdsToNumber = resultIds.map(resultId=>resultId.toNumber());
  return <Bids resultIds={resultIdsToNumber} />;
}
