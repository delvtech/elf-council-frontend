import { CheckCircleIcon } from "@heroicons/react/solid";
import { Signer } from "ethers";
import { parseEther } from "ethers/lib/utils";
import React, { ReactElement, useCallback, useEffect, useState } from "react";
import { isValidAddress } from "src/base/isValidAddress";
import { delegates } from "src/elf-council-delegates/delegates";
import { useMerkleInfo } from "src/elf/merkle/useMerkleInfo";
import { AirdropAmountCard } from "src/ui/airdrop/AirdropAmountCard/AirdropAmountCard";
import { DelegatePreviewCard } from "src/ui/airdrop/DelegatePreviewCard/DelegatePreviewCard";
import { StepCard } from "src/ui/airdrop/StepCard/StepCard";
import { useClaimAndDepositAirdrop } from "src/ui/airdrop/useClaimAndDepositAirdrop";
import { useUnclaimedAirdrop } from "src/ui/airdrop/useUnclaimedAirdrop";
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
      nextStepLabel={isTransactionPending ? <Spinner /> : t`Claim`}
      onPrevStep={onPrevStep}
    >
      <div className="text-right">
        <Tag intent={Intent.SUCCESS}>
          <span className="font-bold">{t`Delegation valid`}</span>
          <CheckCircleIcon height={24} className="ml-4" />
        </Tag>
      </div>
      <div className="text-left text-2xl font-bold mb-10">{t`Review Claim`}</div>
      <div className="flex flex-col w-full justify-center text-base mb-10">
        <span
          className={"w-full mb-4"}
        >{t`Thank you! These tokens will be deposited into the voting vault. 
	You can withdraw them at any time.`}</span>
      </div>
      <div className="flex flex-col md:flex-row w-full space-y-10 md:space-x-10 md:space-y-0 px-12 mb-10">
        <AirdropAmountCard account={account} />
        <DelegatePreviewCard delegateAddress={delegateAddress} />
      </div>
    </StepCard>
  );
}
