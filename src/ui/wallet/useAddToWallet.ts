import { useWeb3React } from "@web3-react/core";
import { useCallback, useState } from "react";

// https://eips.ethereum.org/EIPS/eip-747

interface TokenOptions {
  // The hexadecimal Ethereum address of the token contract
  address: string;

  // A ticker symbol or shorthand, up to 5 alphanumerical characters
  symbol: string;

  // The number of asset decimals
  decimals?: number;

  // A string url of the token logo
  image?: string;
}

export default function useAddToWallet(): {
  addToken: (options: TokenOptions) => void;
  success: boolean;
  error?: any;
} {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<any>();
  const { library } = useWeb3React();

  const addToken = useCallback(
    (options: TokenOptions) => {
      if (!library) {
        setError(new Error("Wallet not connected."));
      } else {
        library.provider
          .request({
            method: "wallet_watchAsset",
            params: {
              // Initially only supports ERC20, but eventually more!
              type: "ERC20",
              options,
            },
          })
          .then((wasAdded: any) => {
            if (wasAdded) {
              setSuccess(true);
            } else {
              throw new Error("Unable to addToken token to wallet.");
            }
          })
          .catch((err: any) => {
            setError(typeof err === "string" ? new Error(err) : err);
          });
      }
    },
    [library],
  );

  return {
    addToken,
    success,
    error,
  };
}
