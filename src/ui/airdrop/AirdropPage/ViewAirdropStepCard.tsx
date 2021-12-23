import { CheckCircleIcon } from "@heroicons/react/solid";
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
  space,
  justifyContent,
  width,
  padding,
} from "src/elf-tailwindcss-classnames";
import { useMerkleInfo } from "src/elf/merkle/useMerkleInfo";
import { AirdropAmountCard } from "src/ui/airdrop/AirdropPreview/AirdropAmountCard";
import { RewardsInfoCard } from "src/ui/airdrop/AirdropPreview/RewardsInfoCard";
import Button from "src/ui/base/Button/Button";
import { ButtonVariant } from "src/ui/base/Button/styles";
import Card, { CardVariant } from "src/ui/base/Card/Card";
import { Tag, Intent } from "src/ui/base/Tag/Tag";
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

  if (isLoadingMerkle && !merkleInfo) {
    return <LoadingAirdropCard />;
  }

  // user has no airdrop if they have no merkle value
  if (!merkleInfo) {
    return <NoAirdropCard />;
  }

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
          display("flex"),
          flexDirection("flex-col"),
          padding("p-6"),
        )}
      >
        <div className={textAlign("text-right")}>
          <Tag intent={Intent.SUCCESS}>
            <span
              className={fontWeight("font-bold")}
            >{t`Eligible for airdrop`}</span>
            <CheckCircleIcon height={24} className={margin("ml-4")} />
          </Tag>
        </div>
        <div
          className={tw(
            textAlign("text-left"),
            fontSize("text-3xl"),
            fontWeight("font-bold"),
            margin("mb-10"),
          )}
        >{t`Connect wallet`}</div>
        <div
          className={tw(
            display("flex"),
            flexDirection("flex-col"),
            width("w-full"),
            justifyContent("justify-center"),
            fontSize("text-base"),
            margin("mb-10"),
          )}
        >
          <span
            className={tw(
              width("w-full"),
              fontWeight("font-bold"),
              margin("mb-2"),
            )}
          >{t`Congratulations! You have some ELFI available to claim.`}</span>
          <span
            className={width("w-full")}
          >{t`You have received these tokens for being an active member of the Element community.
We hope to see you continue to contribute to the future of Element.`}</span>
        </div>
        <div
          className={tw(
            display("flex"),
            flexDirection("flex-col", "md:flex-row"),
            width("w-full"),
            space("space-y-10", "md:space-x-10", "md:space-y-0"),
            padding("px-12"),
            margin("mb-10"),
          )}
        >
          <AirdropAmountCard account={account} />
          <RewardsInfoCard />
        </div>
        <div className={tw(display("flex"), justifyContent("justify-between"))}>
          <Button
            onClick={() => {
              /* TODO: onPreviousStep */
            }}
            variant={ButtonVariant.WHITE}
          >
            <span className={tw(padding("px-10"))}>{t`Back`}</span>
          </Button>
          <Button onClick={onNextStep} variant={ButtonVariant.GRADIENT}>
            <span className={tw(padding("px-10"))}>{t`Next`}</span>
          </Button>
        </div>
      </div>
    </Card>
  );
}
