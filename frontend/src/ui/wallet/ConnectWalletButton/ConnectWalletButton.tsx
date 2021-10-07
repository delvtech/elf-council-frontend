import classNames from "classnames";
import React, { ReactElement, useCallback, useState } from "react";
import Button from "src/ui/base/Button/Button";
import { ButtonVariant } from "src/ui/base/Button/styles";
import { ConnectWalletDialog } from "src/ui/wallet/ConnectWalletDialog/ConnectWalletDialog";
import { WalletJazzicon } from "src/ui/wallet/WalletJazzicon/WalletJazzicon";
import tw from "src/elf-tailwindcss-classnames";
import { formatWalletAddress } from "src/formatWalletAddress";
import { t } from "ttag";

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
          <Button
            round
            variant={ButtonVariant.OUTLINE_BLUE}
            onClick={onOpenWalletDialog}
          >{t`Connect Wallet`}</Button>
        </div>
      ) : (
        <div>
          <Button
            round
            variant={ButtonVariant.MINIMAL}
            onClick={onOpenWalletDialog}
          >
            <WalletJazzicon
              size={28}
              account={account}
              className={tw("mr-4")}
            />
            {formatWalletAddress(account)}
          </Button>
        </div>
      )}
      <ConnectWalletDialog
        isOpen={isWalletDialogOpen}
        onClose={onCloseWalletDialog}
      />
    </div>
  );
}
