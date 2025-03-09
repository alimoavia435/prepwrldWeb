import { initializeConnector } from "@web3-react/core";
import { WalletConnect as WalletConnectV2 } from "@web3-react/walletconnect-v2";

export const [walletConnectV2, hooks] = initializeConnector(
  (actions) =>
    new WalletConnectV2({
      actions,
      options: {
        projectId: "202a3d538b088d735b99722b0cea4910",
        chains: [11155111],
        optionalChains: [11155111],
        showQrModal: true,
      },
      timeout: 10000,
      onError: (err) => {
        console.log("erron in connector::::", err);
      },
    })
);
