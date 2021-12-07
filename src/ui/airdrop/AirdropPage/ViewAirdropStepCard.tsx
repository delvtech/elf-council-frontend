import React, { ReactElement } from "react";
import tw from "src/elf-tailwindcss-classnames";
import { MerkleProof } from "src/elf/merkle/MerkleProof";
import { useMerkleInfo } from "src/elf/merkle/useMerkleInfo";
import Button from "src/ui/base/Button/Button";
import { ButtonVariant } from "src/ui/base/Button/styles";
import Card, { CardVariant } from "src/ui/base/Card/Card";
import { t } from "ttag";

interface ViewAirdropStepCardProps {
  account: string | null | undefined;
  onNextStep: () => void;
}

export function ViewAirdropStepCard({
  onNextStep,
  account,
}: ViewAirdropStepCardProps): ReactElement {
  const merkleInfoQueryData = useMerkleInfo(account);

  const { data, isLoading: isLoadingMerkle } = merkleInfoQueryData;

  if (isLoadingMerkle && !data) {
    return <LoadingCard />;
  }

  // user has no airdrop if they have no merkle value
  if (!data) {
    return <NoAirdropCard />;
  }

  const airdropAmountLabel = getAirdropAmountLabel(data, isLoadingMerkle);

  return (
    <Card
      variant={CardVariant.BLUE}
      className={tw("flex", "flex-col", "text-white", "h-full")}
    >
      <div className={tw("text-center", "text-sm", "mb-4")}>
        <div
          className={tw("font-semibold", "tracking-wider")}
        >{t`Congratulations!`}</div>
        <p className={tw("text-center")}>
          {t`You have some ELFI available to claim.`}
        </p>
      </div>
      <div
        className={tw(
          "text-2xl",
          "text-center",
          "font-bold",
          "text-white",
          "mb-6"
        )}
      >
        {airdropAmountLabel}
      </div>
      <div className={tw("text-sm", "mb-6", "space-y-4")}>
        <div
          className={tw("font-semibold", "text-center")}
        >{t`Next, pick your delegate!`}</div>
        <p>{t`The voting power of your ELFI tokens can be delegated to any address
        of your choosing. You can select anyone, including yourself.`}</p>
        <p>{t`Don't worry, you will still own your
        tokens and you can change your delegate at any time.`}</p>
      </div>
      <div className={tw("flex", "justify-end", "w-full")}>
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
  isLoading: boolean
): string {
  if (isLoading) {
    return t`Loading...`;
  }

  if (merkleProof) {
    return `${merkleProof.leaf.value} ELFI`;
  }

  return "0 ELFI";
}

function LoadingCard(): ReactElement {
  return (
    <Card
      variant={CardVariant.BLUE}
      className={tw(
        "flex",
        "flex-col",
        "text-white",
        "text-center",
        "h-full",
        "justify-center",
        "items-center"
      )}
    >
      <div
        className={tw(
          "text-center",
          "text-sm",
          "mb-4",
          "animate-pulse",
          "items-center",
          "justify-center",
          "flex",
          "flex-col"
        )}
      >
        <div
          className={tw("font-semibold", "tracking-wider")}
        >{t`Checking for airdrop rewards...`}</div>
      </div>
    </Card>
  );
}

function NoAirdropCard(): ReactElement {
  return (
    <Card
      variant={CardVariant.BLUE}
      className={tw(
        "flex",
        "flex-col",
        "text-white",
        "text-center",
        "h-full",
        "justify-center",
        "items-center"
      )}
    >
      <div className={tw("text-center", "text-sm", "mb-4")}>
        <div
          className={tw("font-semibold", "tracking-wider")}
        >{t`Sorry, no airdrop found for this wallet.`}</div>
      </div>
      <div
        className={tw("text-2xl", "font-bold", "text-white", "mb-6")}
      >{t`0 ELFI`}</div>
    </Card>
  );
}
