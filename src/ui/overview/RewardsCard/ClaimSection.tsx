import React, { ReactElement, useCallback } from "react";

import { parseEther } from "@ethersproject/units";
import { ethers, Signer } from "ethers";
import tw, {
  textColor,
  fontWeight,
  display,
  gridTemplateColumns,
  gap,
  width,
} from "src/elf-tailwindcss-classnames";
import { useMerkleInfo } from "src/elf/merkle/useMerkleInfo";
import Button from "src/ui/base/Button/Button";
import H3 from "src/ui/base/H3";
import { useClaimRewards } from "src/ui/rewards/useClaimRewards";
import { useUnclaimedRewards } from "src/ui/rewards/useUnclaimed";
import { t } from "ttag";
import { Tooltip } from "@material-ui/core";

interface ClaimSectionProps {
  account: string | undefined | null;
  signer: Signer | undefined;
}
export function ClaimSection(props: ClaimSectionProps): ReactElement {
  const { account, signer } = props;

  const { mutate: claim, isLoading } = useClaimRewards(signer);
  const { data: merkleInfo } = useMerkleInfo(account);
  const unclaimed = useUnclaimedRewards(account, merkleInfo);
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

  const tooltipTitle = getTooltipTitle(account, hasUnclaimedRewards);
  return (
    <div>
      <H3
        className={tw(textColor("text-blue-900"), fontWeight("font-semibold"))}
      >{t`Claim without delegating`}</H3>
      <div
        className={tw(
          display("grid"),
          gridTemplateColumns("grid-cols-1", "md:grid-cols-2"),
          gap("gap-6"),
        )}
      >
        <div>
          <p>
            {t`If you'd simply like to claim your rewards, you can do so here.`}
          </p>
        </div>

        <div>
          <Tooltip
            id="claim-button-tooltp"
            arrow
            title={tooltipTitle}
            placement="top"
          >
            <div>
              <Button
                loading={isLoading}
                disabled={!account || !hasUnclaimedRewards || isLoading}
                className={width("w-full")}
                onClick={onClaim}
              >
                <span className={width("w-full")}>{t`Claim`}</span>
              </Button>
            </div>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
function getTooltipTitle(
  account: string | null | undefined,
  hasAnyBalance: boolean,
): string {
  // disabled without error states
  if (!account) {
    return t`Connect wallet`;
  }

  if (!hasAnyBalance) {
    return t`No tokens to claim`;
  }

  // not disabled, no error, so don't show tooltip
  return "";
}
