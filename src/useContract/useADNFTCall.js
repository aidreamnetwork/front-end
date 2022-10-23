import { useContractRead } from "wagmi";
import ADNFT from "./ADNFT";


function useADNFTCall(funcName, params) {
  let dataArgs = {
    ...ADNFT,
    functionName: funcName,
    args: params,
  };

  const { data, isError, isLoading } = useContractRead(dataArgs);

  return { data, isError, isLoading };
}

export default useADNFTCall;
