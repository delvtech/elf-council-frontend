import React, { ReactElement } from "react";
import tw, {
  display,
  flexDirection,
  textColor,
  height,
  alignItems,
  fontSize,
  margin,
  fontWeight,
  width,
  flex,
  textAlign,
  textOpacity,
} from "src/elf-tailwindcss-classnames";
import Card, { CardVariant } from "src/ui/base/Card/Card";
import { t } from "ttag";
import { ElementIcon, IconSize } from "src/ui/base/ElementIcon";
import { useMerkleInfo } from "src/elf/merkle/useMerkleInfo";
import { MerkleProof } from "src/elf/merkle/MerkleProof";
import { commify } from "ethers/lib/utils";

interface YouCanDelegateCardProps {
  account: string | null | undefined;
}
export function YouCanDelegateCard({
  account,
}: YouCanDelegateCardProps): ReactElement {
  const merkleInfoQueryData = useMerkleInfo(account);

  const { data: merkleInfo, isLoading: isLoadingMerkle } = merkleInfoQueryData;
  const airdropAmountLabel = getAirdropAmountLabel(merkleInfo, isLoadingMerkle);
  return (
    <Card
      variant={CardVariant.HACKER_SKY}
      className={tw(flex("flex-1"), height("h-64"), textAlign("text-center"))}
    >
      <div
        className={tw(
          height("h-full"),
          width("w-full"),
          display("flex"),
          flexDirection("flex-col"),
        )}
      >
        <div
          className={tw(
            fontSize("text-lg"),
            fontWeight("font-bold"),
            textColor("text-principalRoyalBlue"),
            textOpacity("text-opacity-60"),
            margin("mb-2"),
          )}
        >{t`You can delegate`}</div>
        <div className={tw(flex("flex-1"))}>
          <div
            className={tw(
              textColor("text-principalRoyalBlue"),
              fontSize("text-2xl"),
              fontWeight("font-bold"),
            )}
          >
            {airdropAmountLabel}
          </div>
          <div
            className={tw(
              textColor("text-gray-500"),
              display("flex"),
              flexDirection("flex-col"),
              alignItems("items-center"),
            )}
          >
            <span className={tw(margin("mb-4"))}>{t`$ELFI tokens`}</span>
            <ElementIcon
              bgColorClassName="bg-paleLily"
              className={tw(margin("ml-2"))}
              size={IconSize.LARGE}
            />
          </div>
        </div>
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
    return `${commify(merkleProof.leaf.value)}`;
  }

  return "0 ELFI";
}
