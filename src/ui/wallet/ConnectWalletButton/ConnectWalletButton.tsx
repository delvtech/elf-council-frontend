import classNames from "classnames";
import React, { Fragment, ReactElement, useCallback, useState } from "react";
import Button from "src/ui/base/Button/Button";
import { ButtonVariant } from "src/ui/base/Button/styles";
import { ConnectWalletDialog } from "src/ui/wallet/ConnectWalletDialog/ConnectWalletDialog";
import { WalletJazzicon } from "src/ui/wallet/WalletJazzicon/WalletJazzicon";
import tw from "src/elf-tailwindcss-classnames";
import { formatWalletAddress } from "src/formatWalletAddress";
import { t } from "ttag";

interface WalletProfileButtonProps {
  account: string | null | undefined;
  walletConnectionActive: boolean | undefined;
  className?: string;
}

export function WalletProfileButton(
  props: WalletProfileButtonProps
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
        <ConnectWalletButton />
      ) : (
        <div>
          <Button variant={ButtonVariant.MINIMAL} onClick={onOpenWalletDialog}>
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

export function ConnectWalletButton({
  label = t`Connect Wallet`,
  variant = ButtonVariant.OUTLINE_BLUE,
}: {
  label?: string;
  variant?: ButtonVariant;
}): ReactElement {
  const [isWalletDialogOpen, setWalletDialogOpen] = useState(false);
  const onCloseWalletDialog = useCallback(() => setWalletDialogOpen(false), []);
  const onOpenWalletDialog = useCallback(() => setWalletDialogOpen(true), []);

  return (
    <Fragment>
      <Button variant={variant} onClick={onOpenWalletDialog}>
        {label}
      </Button>
      <ConnectWalletDialog
        isOpen={isWalletDialogOpen}
        onClose={onCloseWalletDialog}
      />
    </Fragment>
  );
}
