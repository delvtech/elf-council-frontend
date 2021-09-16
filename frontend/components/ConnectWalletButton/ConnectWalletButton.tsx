import { ReactElement, useCallback, useState } from "react";

import classNames from "classnames";
import tw from "elf-tailwindcss-classnames";
import { ChainId } from "elf/ethereum";
import { t } from "ttag";

import { ConnectWalletDialog } from "efi-ui/wallets/ConnectWalletDialog/ConnectWalletDialog";
import { WalletJazzicon } from "efi-ui/wallets/WalletJazzicon/WalletJazzicon";
import { formatWalletAddress } from "efi/wallets/formatWalletAddress";

interface ConnectWalletButtonProps {
  account: string | null | undefined;
  walletConnectionActive: boolean | undefined;
  chainId: number | undefined;
  className?: string;
}

const ChainColor: Record<number, string> = {
  [ChainId.GOERLI]: tw("text-blue-400"),
  [ChainId.MAINNET]: tw("text-green-400"),
  [ChainId.LOCAL]: tw("text-white"),
};
export function ConnectWalletButton(
  props: ConnectWalletButtonProps
): ReactElement {
  const { account, chainId, walletConnectionActive, className } = props;
  const [isWalletDialogOpen, setWalletDialogOpen] = useState(false);
  const onCloseWalletDialog = useCallback(() => setWalletDialogOpen(false), []);
  const onOpenWalletDialog = useCallback(() => setWalletDialogOpen(true), []);

  return (
    <div
      className={classNames(className, tw("flex", "space-x-8", "items-center"))}
    >
      {!account ? (
        <div>
          <button onClick={onOpenWalletDialog}>
            <span className={tw("text-center")}>{t`Connect Wallet`}</span>
          </button>
        </div>
      ) : (
        <div>
          <button onClick={onOpenWalletDialog}>
            <WalletJazzicon size={28} account={account} />
            {formatWalletAddress(account)}
          </button>
        </div>
      )}
      <ConnectWalletDialog
        isOpen={isWalletDialogOpen}
        onClose={onCloseWalletDialog}
      />
    </div>
  );
}
