import React, { ReactElement, useCallback, useState } from "react";
import { Signer } from "ethers";
import Card, { CardVariant } from "src/ui/base/Card/Card";
import { ElementIcon, IconSize } from "src/ui/base/ElementIcon/ElementIcon";
import { Tag } from "src/ui/base/Tag/Tag";
import { Intent } from "src/ui/base/Intent";
import { CheckCircleIcon } from "@heroicons/react/solid";
import Button from "src/ui/base/Button/Button";
import { ButtonVariant } from "src/ui/base/Button/styles";
import { getFeaturedDelegate } from "src/elf/delegate/isFeaturedDelegate";
import { formatWalletAddress } from "src/formatWalletAddress";
import { WalletJazzicon } from "src/ui/wallet/WalletJazzicon";
import { ConnectWalletDialog } from "src/ui/wallet/ConnectWalletDialog";
import { commify } from "ethers/lib/utils";
import { t } from "ttag";

interface TransactionCardProps {
  className?: string;
  account?: string;
  signer?: Signer;
  delegateAddress: string;
  onPreviousStep?: () => void;
  onSuccess?: () => void;
  onNextStep?: () => void;
}

// PLACEHOLDER
const ELFI_TOKEN_AMOUNT = "10000.0";

export default function TransactionCard({
  className,
  account,
  signer,
  delegateAddress,
  onPreviousStep,
  onSuccess,
  onNextStep,
}: TransactionCardProps): ReactElement {
  const [isWalletDialogOpen, setWalletDialogOpen] = useState(false);
  const onCloseWalletDialog = useCallback(() => setWalletDialogOpen(false), []);
  const [success, setSuccess] = useState(false);
  const delegateLabel =
    getFeaturedDelegate(delegateAddress)?.name ||
    formatWalletAddress(delegateAddress);

  const handleConfirm = () => {
    // handle transaction
    setSuccess(true);
    onSuccess?.();
  };
  return (
    <>
      <ConnectWalletDialog
        isOpen={isWalletDialogOpen}
        onClose={onCloseWalletDialog}
      />
      <Card className={className} variant={CardVariant.BLUE}>
        <div className="flex flex-col gap-2 p-2 text-white sm:px-6 sm:py-4">
          <div className="mb-12 text-center text-white sm:items-center sm:px-10 sm:text-center md:px-32">
            <h1 className="mb-10 text-3xl font-semibold">{t`Review Transaction`}</h1>
            <div className="flex min-w-full flex-col gap-10 rounded-lg bg-white px-14 pt-8 pb-10 text-center shadow-[0_0_52px_rgba(143,216,231,.7)]">
              <div>
                <p className="mb-1 text-lg font-bold text-principalRoyalBlue text-opacity-60">
                  {t`Claimable voting power`}
                </p>
                <div className="flex items-center justify-center gap-3">
                  <ElementIcon className="bg-paleLily" size={IconSize.MEDIUM} />
                  <p className="text-3xl font-semibold text-principalRoyalBlue">
                    {t`${commify(ELFI_TOKEN_AMOUNT)} ELFI`}
                  </p>
                </div>
              </div>

              <div>
                <p className="mb-1 text-lg font-bold text-principalRoyalBlue text-opacity-60">
                  {t`will be delegated to`}
                </p>
                <div className="flex items-center justify-center gap-3">
                  <WalletJazzicon
                    className="flex justify-center"
                    account={delegateAddress}
                    size={24}
                  />
                  <p className="text-3xl font-semibold text-principalRoyalBlue">
                    {delegateLabel}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between">
            {onPreviousStep && (
              <Button
                className="px-12"
                variant={ButtonVariant.WHITE}
                onClick={onPreviousStep}
              >
                {t`Back`}
              </Button>
            )}
            {success ? (
              <>
                <Tag intent={Intent.SUCCESS}>
                  <CheckCircleIcon height={24} className="mr-2" />
                  <span className="font-bold">{t`Success!`}</span>
                </Tag>
                {onNextStep && (
                  <Button
                    className="px-12"
                    variant={ButtonVariant.GRADIENT}
                    onClick={onNextStep}
                  >
                    {t`Next`}
                  </Button>
                )}
              </>
            ) : account ? (
              <Button
                className="px-12"
                variant={ButtonVariant.GRADIENT}
                onClick={handleConfirm}
              >
                {t`Confirm transaction`}
              </Button>
            ) : (
              <Button
                className="px-12"
                variant={ButtonVariant.GRADIENT}
                onClick={() => setWalletDialogOpen(true)}
              >
                {t`Connect Wallet`}
              </Button>
            )}
          </div>
        </div>
      </Card>
    </>
  );
}
