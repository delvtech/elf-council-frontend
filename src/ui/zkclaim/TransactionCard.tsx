import React, { ReactElement } from "react";
import { Signer } from "ethers";
import Card, { CardVariant } from "src/ui/base/Card/Card";
import { ElementIcon, IconSize } from "src/ui/base/ElementIcon/ElementIcon";
import Button from "src/ui/base/Button/Button";
import { ButtonVariant } from "src/ui/base/Button/styles";
import { getFeaturedDelegate } from "src/elf/delegate/isFeaturedDelegate";
import { formatWalletAddress } from "src/formatWalletAddress";
import { WalletJazzicon } from "src/ui/wallet/WalletJazzicon";
import { commify } from "ethers/lib/utils";
import { t } from "ttag";

interface TransactionCardProps {
  className?: string;
  account: string;
  signer: Signer;
  delegateAddress: string;
  onBackClick?: () => void;
  onComplete?: () => void;
}

// PLACEHOLDER
const ELFI_TOKEN_AMOUNT = "10000.0";

export default function TransactionCard({
  className,
  account,
  signer,
  delegateAddress,
  onBackClick,
  onComplete,
}: TransactionCardProps): ReactElement {
  const delegateLabel =
    getFeaturedDelegate(delegateAddress)?.name ||
    formatWalletAddress(delegateAddress);

  const handleConfirm = () => {
    onComplete?.();
  };
  return (
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
          {onBackClick && (
            <Button
              className="px-12"
              variant={ButtonVariant.WHITE}
              onClick={onBackClick}
            >
              {t`Back`}
            </Button>
          )}
          <Button
            className="px-12"
            variant={ButtonVariant.GRADIENT}
            onClick={handleConfirm}
          >
            {t`Confirm transaction`}
          </Button>
        </div>
      </div>
    </Card>
  );
}
