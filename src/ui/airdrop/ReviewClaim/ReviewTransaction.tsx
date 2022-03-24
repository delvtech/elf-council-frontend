import { Provider } from "@ethersproject/providers";
import { Signer } from "ethers";
import { parseEther } from "ethers/lib/utils";
import React, { ReactElement, useCallback, useRef, useState } from "react";
import toast from "react-hot-toast";
import { isValidAddress } from "src/base/isValidAddress";
import { ETHERSCAN_TRANSACTION_DOMAIN } from "src/elf-etherscan/domain";
import { useMerkleInfo } from "src/elf/merkle/useMerkleInfo";
import { AirdropAmountCard } from "src/ui/airdrop/AirdropAmountCard/AirdropAmountCard";
import { StepCard } from "src/ui/airdrop/StepCard/StepCard";
import { useClaimAndDepositAirdrop } from "src/ui/airdrop/useClaimAndDepositAirdrop";
import ExternalLink from "src/ui/base/ExternalLink/ExternalLink";
import H1 from "src/ui/base/H1/H1";
import { Spinner } from "src/ui/base/Spinner/Spinner";
import { t, jt } from "ttag";

interface ReviewTransactionProps {
  account: string | null | undefined;
  provider?: Provider;
  delegateAddress: string;
  signer: Signer | undefined;
  onPrevStep: () => void;
  onNextStep: () => void;
}

export function ReviewTransaction({
  account,
  provider,
  delegateAddress,
  signer,
  onPrevStep,
  onNextStep,
}: ReviewTransactionProps): ReactElement {
  const toastIdRef = useRef<string>();

  const { data: merkleInfo } = useMerkleInfo(account);
  const [isTransactionPending, setIsTransactionPending] = useState(false);

  const { mutate: claimAndDeposit } = useClaimAndDepositAirdrop(signer, {
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

      const message = (
        <div>{jt`Confirming transaction... ${etherscanLink}`}</div>
      );

      toastIdRef.current = toast.loading(message);
      setIsTransactionPending(true);
    },
    onTransactionMined: () => {
      toast.success(t`Transaction successfully confirmed`, {
        id: toastIdRef.current,
      });
      setIsTransactionPending(false);
      onNextStep();
    },
  });
  const handleClaimClick = useCallback(() => {
    if (account && merkleInfo) {
      claimAndDeposit([
        parseEther("1"),
        // use the full claimable balance when not in development
        // parseEther(claimableBalance),
        delegateAddress,
        parseEther(merkleInfo.leaf.value),
        merkleInfo.proof,
        account,
      ]);
    }
  }, [account, claimAndDeposit, delegateAddress, merkleInfo]);

  return (
    <StepCard
      onNextStep={handleClaimClick}
      nextStepDisabled={
        isTransactionPending || !isValidAddress(delegateAddress)
      }
      nextStepLabel={
        isTransactionPending ? <Spinner /> : t`Confirm transaction`
      }
      onPrevStep={onPrevStep}
    >
      <div className="flex flex-col">
        <H1 className="mt-8 mb-10 text-center">{t`Review Transaction`}</H1>
        <div className="mb-10 flex w-full flex-col justify-center space-y-10 px-12 md:flex-row md:space-x-10 md:space-y-0">
          <AirdropAmountCard
            account={account}
            delegateAddress={delegateAddress}
            provider={provider}
          />
        </div>
      </div>
    </StepCard>
  );
}
