import { parseEther } from "@ethersproject/units";
import React, { ReactElement } from "react";
import tw, {
  display,
  flexDirection,
  textColor,
  height,
  textAlign,
  fontSize,
  margin,
  fontWeight,
  letterSpacing,
  space,
  justifyContent,
  width,
} from "src/elf-tailwindcss-classnames";
import { MerkleProof } from "src/elf/merkle/MerkleProof";
import { useMerkleInfo } from "src/elf/merkle/useMerkleInfo";
import { AirdropFullyClaimedCard } from "src/ui/airdrop/AirdropPage/AirdropFullyClaimedCard";
import { useUnclaimedAirdrop } from "src/ui/airdrop/useUnclaimedAirdrop";
import Button from "src/ui/base/Button/Button";
import { ButtonVariant } from "src/ui/base/Button/styles";
import Card, { CardVariant } from "src/ui/base/Card/Card";
import { t } from "ttag";
import { LoadingAirdropCard } from "./LoadingAirdropCard";
import { NoAirdropCard } from "./NoAirdropCard";

interface ViewAirdropStepCardProps {
  account: string | null | undefined;
  onNextStep: () => void;
}

export function ViewAirdropStepCard({
  onNextStep,
  account,
}: ViewAirdropStepCardProps): ReactElement {
  const merkleInfoQueryData = useMerkleInfo(account);

  const { data: merkleInfo, isLoading: isLoadingMerkle } = merkleInfoQueryData;
  const claimableBalance = useUnclaimedAirdrop(account, merkleInfo);

  if (isLoadingMerkle && !merkleInfo) {
    return <LoadingAirdropCard />;
  }

  // user has no airdrop if they have no merkle value
  if (!merkleInfo) {
    return <NoAirdropCard />;
  }

  // user has no airdrop if they have a merkle value but have already claimed
  // the full amount
  if (merkleInfo && parseEther(claimableBalance).isZero()) {
    return <AirdropFullyClaimedCard />;
  }

  const airdropAmountLabel = getAirdropAmountLabel(merkleInfo, isLoadingMerkle);

  return (
    <Card
      variant={CardVariant.BLUE}
      className={tw(
        display("flex"),
        flexDirection("flex-col"),
        textColor("text-white"),
        height("h-full"),
      )}
    >
      <div
        className={tw(
          textAlign("text-center"),
          fontSize("text-sm"),
          margin("mb-4"),
        )}
      >
        <div
          className={tw(
            fontWeight("font-semibold"),
            letterSpacing("tracking-wider"),
          )}
        >{t`Congratulations!`}</div>
        <p className={textAlign("text-center")}>
          {t`You have some ELFI available to claim.`}
        </p>
      </div>
      <div
        className={tw(
          fontSize("text-2xl"),
          textAlign("text-center"),
          fontWeight("font-bold"),
          textColor("text-white"),
          margin("mb-6"),
        )}
      >
        {airdropAmountLabel}
      </div>
      <div
        className={tw(fontSize("text-sm"), margin("mb-6"), space("space-y-4"))}
      >
        <div
          className={tw(fontWeight("font-semibold"), textAlign("text-center"))}
        >{t`Next, pick your delegate!`}</div>
        <p>{t`The voting power of your ELFI tokens can be delegated to any address
        of your choosing. You can select anyone, including yourself.`}</p>
        <p>{t`Don't worry, you will still own your
        tokens and you can change your delegate at any time.`}</p>
      </div>
      <div
        className={tw(
          display("flex"),
          justifyContent("justify-end"),
          width("w-full"),
        )}
      >
        <Button
          onClick={onNextStep}
          variant={ButtonVariant.OUTLINE_WHITE}
        >{t`Pick a delegate`}</Button>
      </div>
    </Card>
  );
}

function getAirdropAmountLabel(
  merkleProof: MerkleProof | undefined,
  isLoading: boolean,
): string {
  if (isLoading) {
    return t`Loading...`;
  }

  if (merkleProof) {
    return `${merkleProof.leaf.value} ELFI`;
  }

  return "0 ELFI";
}
