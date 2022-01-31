import { CheckCircleIcon } from "@heroicons/react/solid";
import React, { ReactElement } from "react";
import { useMerkleInfo } from "src/elf/merkle/useMerkleInfo";
import { LoadingAirdropCard } from "src/ui/airdrop/AirdropPage/LoadingAirdropCard";
import { NoAirdropCard } from "src/ui/airdrop/AirdropPage/NoAirdropCard";
import { AirdropAmountCard } from "src/ui/airdrop/AirdropPreview/AirdropAmountCard";
import { StepCard } from "src/ui/airdrop/StepCard/StepCard";
import { ElementIcon, IconSize } from "src/ui/base/ElementIcon/ElementIcon";
import { Tag } from "src/ui/base/Tag/Tag";
import { Intent } from "src/ui/base/Intent";
import { jt, t } from "ttag";

interface AirdropPreviewProps {
  account: string | null | undefined;
  onNextStep: () => void;
  onPrevStep: () => void;
}

const elementIconInBodyText = (
  <ElementIcon
    key="element-icon-in-body-text"
    className="bg-paleLily inline-block ml-0.5 mr-1 -mb-1.5"
    size={IconSize.MEDIUM}
  />
);
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
        <div className="mb-4 text-right md:mb-0">
          <Tag intent={Intent.SUCCESS}>
            <span className="font-bold">{t`Eligible for airdrop`}</span>
            <CheckCircleIcon height={24} className="ml-4" />
          </Tag>
        </div>
        <div className="flex items-center justify-center mb-2 text-3xl font-bold">
          <span className="text-center">{t`Congratulations!`}</span>
        </div>
        <div className="flex flex-col items-center justify-center w-full mb-10 text-base text-center">
          <span className="w-full mb-6 font-bold ">{jt`You have some ${elementIconInBodyText}ELFI available to deposit.`}</span>
          <span className="w-3/4 text-justify">{t`You have received these tokens for being an active member of the Element community.
We hope to see you continue to contribute to the future of Element.`}</span>
        </div>
        <div className="flex flex-col justify-center px-12 mb-8 space-y-10 md:flex-row md:space-x-10 md:space-y-0">
          <AirdropAmountCard account={account} />
        </div>
      </div>
    </StepCard>
  );
}
