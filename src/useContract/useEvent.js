import {
  useContractEvent,
} from "wagmi";
import abi from "./ADN_Connector.abi.json";

import { ADN_Connector } from "../config";

function useEvent(name, listener) {
  useContractEvent({
    address: ADN_Connector,
    abi: abi,
    eventName: name,
    listener
  });
}

export default useEvent;
