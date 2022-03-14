import { useEffect } from "react";
import { usePrevious } from "react-use";
import { useWeb3React } from "@web3-react/core";

/**
 * Invokes a callback when the user connects their wallet.
 * @param callback The function to run when the wallet is connected
 */
export default function useOnConnected(callback: () => void): void {
  const { active } = useWeb3React();
  const previousActive = usePrevious(active);
  useEffect(() => {
    if (!previousActive && active) {
      callback();
    }
  }, [previousActive, active, callback]);
}
