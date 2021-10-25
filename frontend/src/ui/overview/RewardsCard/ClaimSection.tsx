import React, { ReactElement, useCallback } from "react";

import { parseEther } from "@ethersproject/units";
import { ethers, Signer } from "ethers";
import tw from "src/elf-tailwindcss-classnames";
import { useMerkleInfo } from "src/elf/merkle/useMerkleInfo";
import Button from "src/ui/base/Button/Button";
import H3 from "src/ui/base/H3";
import { useClaimRewards } from "src/ui/rewards/useClaimRewards";
import { useUnclaimed } from "src/ui/rewards/useUnclaimed";
import { t } from "ttag";

interface ClaimSectionProps {
  account: string | undefined | null;
  signer: Signer | undefined;
}
export function ClaimSection(props: ClaimSectionProps): ReactElement {
  const { account, signer } = props;

  const { mutate: claim, isLoading } = useClaimRewards(signer);
  const { data: merkleInfo } = useMerkleInfo(account);
  const unclaimed = useUnclaimed(account, merkleInfo);
  const hasUnclaimedRewards = !!Number(unclaimed);
  const onClaim = useCallback(() => {
    if (!account || !merkleInfo) {
      return;
    }

    const { value } = merkleInfo?.leaf;
    const { proof } = merkleInfo;
    const valueBN = parseEther(value);

    claim([ethers.constants.WeiPerEther, valueBN, proof, account]);
  }, [account, claim, merkleInfo]);

  return (
    <div>
      <H3
        className={tw("text-blue-900", "font-semibold")}
      >{t`Claim without delegating`}</H3>
      <div className={tw("grid", "grid-cols-1", "gap-6", "md:grid-cols-2")}>
        <div>
          <p>
            {t`If you'd simply like to claim your rewards, you can do so here.`}
          </p>
        </div>

        <div>
          <Button
            loading={isLoading}
            disabled={isLoading || !account || !hasUnclaimedRewards}
            className={tw("w-full", "text-center")}
            onClick={onClaim}
          >
            <span className={tw("w-full")}>{t`Claim`}</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
