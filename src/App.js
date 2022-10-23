import "./App.css";
import { Navbar, Footer } from "./components";
import { Home, Profile, Item, Create, Login, Register } from "./pages";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import "klaykit/styles.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
  Cypress,
  Baobab,
  midnightTheme,
} from "klaykit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import Prompt from "./pages/prompt/Prompt";
import TaskPage from "./pages/task/Task";
import Results from "./components/result/Results";

const { chains, provider } = configureChains(
  [Cypress, Baobab],
  [jsonRpcProvider({ rpc: (chain) => ({ http: chain.rpcUrls.default }) })]
);

const { connectors } = getDefaultWallets({
  appName: "AI Dream Network",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

function App() {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        chains={chains}
        appInfo={{
          appName: 'AI Dream Network',
          learnMoreUrl: 'https://docs.aidream.network',
        }}
        theme={midnightTheme({
          accentColor: "#ec008c",
          accentColorForeground: "white",
          fontStack: "system",
          overlayBlur: "small",
        })}
      >
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path=":item/:id" element={<Item />} />
            <Route path="/create" element={<Create />} />
            <Route path="/prompt" element={<Prompt />} />
            <Route path="/miner/:id" element={<Profile isMiner={true} />} />
            <Route path="/creator/:id" element={<Profile />} />
            <Route path="/task/:id" element={<TaskPage />} />
            <Route path="/result/:id" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
          <Footer />
          <ToastContainer theme="dark" />
        </div>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
