import { CheckCircleIcon } from "@heroicons/react/solid";
import React, { ReactElement } from "react";
import { useMerkleInfo } from "src/elf/merkle/useMerkleInfo";
import { LoadingAirdropCard } from "src/ui/airdrop/AirdropPage/LoadingAirdropCard";
import { NoAirdropCard } from "src/ui/airdrop/AirdropPage/NoAirdropCard";
import { AirdropAmountCard } from "src/ui/airdrop/AirdropPreview/AirdropAmountCard";
import { StepCard } from "src/ui/airdrop/StepCard/StepCard";
import { Intent, Tag } from "src/ui/base/Tag/Tag";
import { t } from "ttag";

interface AirdropPreviewProps {
  account: string | null | undefined;
  onNextStep: () => void;
  onPrevStep: () => void;
}

export function AirdropPreview({
  onNextStep,
  onPrevStep,
  account,
}: AirdropPreviewProps): ReactElement {
  const merkleInfoQueryData = useMerkleInfo(account);

  const { data: merkleInfo, isLoading: isLoadingMerkle } = merkleInfoQueryData;

  if (isLoadingMerkle && !merkleInfo) {
    return <LoadingAirdropCard />;
  }

  // user has no airdrop if they have no merkle value
  if (!merkleInfo) {
    return <NoAirdropCard />;
  }

  return (
    <StepCard onPrevStep={onPrevStep} onNextStep={onNextStep}>
      <div className="flex flex-col">
        <div className="text-right">
          <Tag intent={Intent.SUCCESS}>
            <span className="font-bold">{t`Eligible for airdrop`}</span>
            <CheckCircleIcon height={24} className="ml-4" />
          </Tag>
        </div>
        <div className="mb-10 text-3xl font-bold text-left">{t`Congratulations!`}</div>
        <div className="flex flex-col justify-center w-full mb-10 text-base">
          <span className="w-full mb-2 font-bold">{t`Congratulations! You have some ELFI available to claim.`}</span>
          <span className="w-full">{t`You have received these tokens for being an active member of the Element community.
We hope to see you continue to contribute to the future of Element.`}</span>
        </div>
        <div className="flex flex-col justify-center px-12 mb-10 space-y-10 md:flex-row md:space-x-10 md:space-y-0">
          <AirdropAmountCard account={account} />
        </div>
      </div>
    </StepCard>
  );
}
