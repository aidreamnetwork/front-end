import "klaykit/styles.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
  Cypress,
  Baobab
} from "klaykit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import App  from "./App";

const { chains, provider } = configureChains(
  [Cypress, Baobab],
  [jsonRpcProvider({ rpc: (chain) => ({ http: chain.rpcUrls.default }) })]
);

const { connectors } = getDefaultWallets({
  appName: "Ai Dream Network Gateway",
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
});


export default function AppWrapper() {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <App />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
