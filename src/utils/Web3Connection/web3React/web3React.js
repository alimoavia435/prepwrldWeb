import { walletConnectV2 } from "../connectors/walletConnectV2";
import {metaMask} from "../connectors/metaMask"
import { Web3Provider } from "@ethersproject/providers";

const ConnectorNames = {
    Injected: "injected",
    WalletConnect: "walletconnect",
}

export const connectorsByName = {
    [ConnectorNames.Injected]: (typeof window !== 'undefined' && window.ethereum?.isMetaMask) &&  metaMask,
    [ConnectorNames.WalletConnect]: walletConnectV2
}

export const getLibraryForSign = (provider) => {
    const library = new Web3Provider(provider);
    return library
}

export const getLibrary = (provider) => {
    return provider
}