import { CheckCircleIcon } from "@heroicons/react/solid";
import { Signer } from "ethers";
import { parseEther } from "ethers/lib/utils";
import React, { ReactElement, useCallback, useEffect, useState } from "react";
import { isValidAddress } from "src/base/isValidAddress";
import { delegates } from "src/elf-council-delegates/delegates";
import { useMerkleInfo } from "src/elf/merkle/useMerkleInfo";
import { AirdropAmountCard } from "src/ui/airdrop/AirdropAmountCard/AirdropAmountCard";
import { StepCard } from "src/ui/airdrop/StepCard/StepCard";
import { useClaimAndDepositAirdrop } from "src/ui/airdrop/useClaimAndDepositAirdrop";
import H1 from "src/ui/base/H1";
import { Spinner } from "src/ui/base/Spinner/Spinner";
import { Tag, Intent } from "src/ui/base/Tag/Tag";
import { t } from "ttag";

interface ReviewClaimProps {
  account: string | null | undefined;
  delegateAddress: string;
  signer: Signer | undefined;
  onPrevStep: () => void;
  onNextStep: () => void;
}

export function ReviewClaim({
  account,
  delegateAddress,
  signer,
  onPrevStep,
  onNextStep,
}: ReviewClaimProps): ReactElement {
  const { data: merkleInfo } = useMerkleInfo(account);
  const [isTransactionPending, setIsTransactionPending] = useState(false);

  const [selectedDelegateIndex, setSelectedDelegateIndex] = useState<
    number | undefined
  >();
  useEffect(() => {
    if (selectedDelegateIndex === undefined) {
      return;
    }
    if (delegates[selectedDelegateIndex].address !== delegateAddress) {
      setSelectedDelegateIndex(undefined);
    }
  }, [delegateAddress, selectedDelegateIndex]);

  // const claimableBalance = useUnclaimedAirdrop(account, merkleInfo);
  const { mutate: claimAndDeposit } = useClaimAndDepositAirdrop(signer, {
    onTransactionSubmitted: () => {
      setIsTransactionPending(true);
    },
    onTransactionMined: () => {
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
      nextStepLabel={isTransactionPending ? <Spinner /> : t`Deposit airdrop`}
      onPrevStep={onPrevStep}
    >
      <div className="flex flex-col">
        <H1 className="mt-8 mb-4 text-center">{t`Review Transaction`}</H1>
        <div className="flex flex-col items-center justify-center w-full mb-10 text-base font-bold text-center">
          <p>{t`Your ELFI tokens will be deposited into the
        voting vault.`}</p>
          <p>{t`You can withdraw them at any time.`}</p>
        </div>
        <div className="flex flex-col justify-center w-full px-12 mb-10 space-y-10 md:flex-row md:space-x-10 md:space-y-0">
          <AirdropAmountCard
            account={account}
            delegateAddress={delegateAddress}
          />
        </div>
      </div>
    </StepCard>
  );
}
