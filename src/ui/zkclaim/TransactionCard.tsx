import React, { ReactElement, useCallback, useRef, useState } from "react";
import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import toast from "react-hot-toast";
import Card, { CardVariant } from "src/ui/base/Card/Card";
import {
  ElementIconCircle,
  IconSize,
} from "src/ui/base/ElementIconCircle/ElementIconCircle";
import { Tag } from "src/ui/base/Tag/Tag";
import { Intent } from "src/ui/base/Intent";
import { CheckCircleIcon } from "@heroicons/react/solid";
import Button from "src/ui/base/Button/Button";
import { ButtonVariant } from "src/ui/base/Button/styles";
import { getFeaturedDelegate } from "src/elf/delegate/isFeaturedDelegate";
import { WalletJazzicon } from "src/ui/wallet/WalletJazzicon";
import { ConnectWalletDialog } from "src/ui/wallet/ConnectWalletDialog";
import { commify } from "ethers/lib/utils";
import { jt, t } from "ttag";
import { useFormattedWalletAddress } from "src/ui/ethereum/useFormattedWalletAddress";
import ExternalLink from "src/ui/base/ExternalLink/ExternalLink";
import { ETHERSCAN_TRANSACTION_DOMAIN } from "src/elf-etherscan/domain";
import { useClaimAndDelegate } from "./useClaimAndDelegate";
import { isValidAddress } from "src/base/isValidAddress";
import { Spinner } from "src/ui/base/Spinner/Spinner";
import { pedersenHash, toHex } from "zkp-merkle-airdrop-lib";
import useClaimableAmount from "./useClaimableAmount";
import { PrivateAirdrop } from "@elementfi/elf-council-typechain";

interface TransactionCardProps {
  className?: string;
  account: string | null | undefined;
  provider: Provider | undefined;
  signer: Signer | undefined;
  isReady: boolean;
  contract: PrivateAirdrop | undefined;
  generateProof: () => Promise<string> | undefined;
  nullifier: string | undefined;
  delegateAddress: string;
  onPreviousStep?: () => void;
  onSuccess?: () => void;
  onNextStep?: () => void;
}

export default function TransactionCard({
  className,
  account,
  provider,
  signer,
  isReady,
  contract,
  generateProof,
  nullifier,
  delegateAddress,
  onPreviousStep,
  onSuccess,
  onNextStep,
}: TransactionCardProps): ReactElement {
  const [isWalletDialogOpen, setWalletDialogOpen] = useState(false);
  const onCloseWalletDialog = useCallback(() => setWalletDialogOpen(false), []);
  const claimableAmount = useClaimableAmount(contract);
  const formattedAddress = useFormattedWalletAddress(delegateAddress, provider);
  const delegateLabel =
    getFeaturedDelegate(delegateAddress)?.name || formattedAddress;
  const [isTransactionPending, setIsTransactionPending] = useState(false);
  const [success, setSuccess] = useState(false);
  const toastIdRef = useRef<string>();
  const { mutate: claimAndDelegate } = useClaimAndDelegate(signer, contract, {
    onError: (e) => {
      toast.error(e.message, { id: toastIdRef.current });
    },
    onTransactionSubmitted: (tx) => {
      const etherscanLink = (
        <ExternalLink
          href={`${ETHERSCAN_TRANSACTION_DOMAIN}/${tx.hash}`}
          text={t`View on etherscan`}
          className="text-principalRoyalBlue"
        />
      );

      toastIdRef.current = toast.loading(
        <div>{jt`Confirming transaction... ${etherscanLink}`}</div>,
      );
    },
    onTransactionMined: () => {
      toast.success(t`Transaction successfully confirmed`, {
        id: toastIdRef.current,
      });
      setIsTransactionPending(false);
      setSuccess(true);
      onSuccess?.();
    },
  });

  const handleConfirm = async () => {
    setIsTransactionPending(true);
    try {
      const proof = await generateProof();
      if (proof) {
        claimAndDelegate([
          proof,
          toHex(pedersenHash(BigInt(nullifier as string))),
          delegateAddress,
        ]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <ConnectWalletDialog
        isOpen={isWalletDialogOpen}
        onClose={onCloseWalletDialog}
      />
      <Card className={className} variant={CardVariant.BLUE}>
        <div className="flex flex-col gap-2 p-2 text-white sm:px-6 sm:py-4">
          <div className="mb-8 text-center text-white sm:items-center sm:px-10 sm:text-center md:px-32">
            <h1 className="mb-10 text-3xl font-semibold">{t`Review Transaction`}</h1>
            <div className="flex min-w-full flex-col gap-10 rounded-lg bg-white px-14 pt-8 pb-10 text-center shadow-[0_0_52px_rgba(143,216,231,.7)]">
              <div>
                <p className="mb-1 text-lg font-bold text-principalRoyalBlue text-opacity-60">
                  {t`Claimable voting power`}
                </p>
                <div className="flex items-center justify-center gap-3">
                  <ElementIconCircle
                    className="bg-paleLily"
                    size={IconSize.MEDIUM}
                  />
                  <p className="text-3xl font-semibold text-principalRoyalBlue">
                    {t`${commify(claimableAmount)} ELFI`}
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

          <p className="mb-2 w-0 min-w-full text-sm italic text-white/80">{t`Note: this transaction requires a ZK proof generated from your key and secret. Generating the proof could take up to 5 minutes before the transaction is initiated.`}</p>
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
                disabled={
                  !isReady ||
                  !isValidAddress(delegateAddress) ||
                  isTransactionPending
                }
              >
                {!isReady || isTransactionPending ? (
                  <Spinner />
                ) : (
                  t`Confirm transaction`
                )}
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
