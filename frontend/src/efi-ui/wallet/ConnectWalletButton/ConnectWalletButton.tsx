import { t } from "ttag";
import classNames from "classnames";
import tw from "src/elf-tailwindcss-classnames";
import React, { ReactElement, useCallback, useState } from "react";
import { WalletJazzicon } from "src/efi-ui/wallet/WalletJazzicon/WalletJazzicon";
import { formatWalletAddress } from "src/formatWalletAddress";
import { ConnectWalletDialog } from "src/efi-ui/wallet/ConnectWalletDialog/ConnectWalletDialog";
import Button from "src/efi-ui/base/Button/Button";

interface ConnectWalletButtonProps {
  account: string | null | undefined;
  walletConnectionActive: boolean | undefined;
  chainId: number | undefined;
  className?: string;
}

// const ChainColor: Record<number, string> = {
//   [ChainId.GOERLI]: tw("text-blue-400"),
//   [ChainId.MAINNET]: tw("text-green-400"),
//   [ChainId.LOCAL]: tw("text-white"),
// };

export function ConnectWalletButton(
  props: ConnectWalletButtonProps
): ReactElement {
  const { account, className } = props;
  const [isWalletDialogOpen, setWalletDialogOpen] = useState(false);
  const onCloseWalletDialog = useCallback(() => setWalletDialogOpen(false), []);
  const onOpenWalletDialog = useCallback(() => setWalletDialogOpen(true), []);

  return (
    <div
      className={classNames(className, tw("flex", "space-x-8", "items-center"))}
    >
      {!account ? (
        <div>
          <Button onClick={onOpenWalletDialog}>{t`Connect Wallet`}</Button>
        </div>
      ) : (
        <div>
          <button className={tw("text-blue-400")} onClick={onOpenWalletDialog}>
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
