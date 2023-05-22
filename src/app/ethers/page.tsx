"use client";

import { ethers } from "ethers";

import { EthereumProvider } from "@walletconnect/ethereum-provider";

export default function Ethers() {
  const handleDebug = async () => {
    const p = await EthereumProvider.init({
      projectId: "12c48c2a9521b1447d902c9e06ddfe79", // REQUIRED your projectId
      chains: [1, 44, 46], // REQUIRED chain ids
      showQrModal: true, // REQUIRED set to "true" to use @web3modal/standalone,
      // methods, // OPTIONAL ethereum methods
      // events, // OPTIONAL ethereum events
      rpcMap: {
        "1": "https://eth-mainnet.g.alchemy.com/v2/1fYUXWGBTu0naj6Stf7Sh77VAO-J5j4v",
        "44": "https://crab-rpc.darwinia.network",
        "46": "https://rpc.darwinia.network",
      }, // OPTIONAL rpc urls for each chain
      metadata: {
        name: "Jay Debug",
        description: "JayJay1024 Debug",
        url: "https://www.google.com/",
        icons: [],
      }, // OPTIONAL metadata of your app
      // qrModalOptions // OPTIONAL - `undefined` by default, see https://docs.walletconnect.com/2.0/web3modal/options
    });

    p.on("display_uri", (uri: string) => {
      console.log("uri", uri);
    });

    console.log("before enable", p.accounts, p.chainId, p.connected, p.connecting, p.namespace);
    // const dd = await p.enable();
    const dd = await p.connect();
    console.log("result", dd);
    console.log("after enable", p.accounts, p.chainId, p.connected, p.connecting, p.namespace);

    if (p.connected) {
      const provider = new ethers.providers.Web3Provider(p);
      const network = await provider.getNetwork();
      const height = await provider.getBlockNumber();
      console.log(network.chainId, network.name, height);
    } else {
      console.log("not connect");
    }
  };

  const handleMetamask = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const network = await provider.getNetwork();
    const height = await provider.getBlockNumber();
    console.log(network.chainId, network.name, height);
  };

  return (
    <>
      <main className="h-screen flex justify-center p-8 gap-2">
        <button onClick={handleDebug} className="border rounded border-slate-500 px-2 w-fit h-fit">
          Debug
        </button>
        <button onClick={handleMetamask} className="border rounded border-slate-500 px-2 w-fit h-fit">
          Metamask
        </button>
      </main>
    </>
  );
}
