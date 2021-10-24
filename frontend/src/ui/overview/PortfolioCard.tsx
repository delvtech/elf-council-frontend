import React, { ReactElement } from "react";

import { formatEther } from "ethers/lib/utils";
import tw from "src/elf-tailwindcss-classnames";
import { elementTokenContract } from "src/elf/contracts";
import { useMerkleInfo } from "src/elf/merkle/useMerkleInfo";
import { useTokenBalanceOf } from "src/elf/token/useTokenBalanceOf";
import Card from "src/ui/base/Card/Card";
import H3 from "src/ui/base/H3";
import { LabeledStat } from "src/ui/base/LabeledStat/LabeledStat";
import { useDeposited } from "src/ui/base/lockingVault/useDeposited";
import { useUnclaimed } from "src/ui/rewards/useUnclaimed";
import { t } from "ttag";

interface PortfolioCardProps {
  account: string | undefined | null;
}
export function PortfolioCard(props: PortfolioCardProps): ReactElement {
  const { account } = props;

  const { data: balanceBN } = useTokenBalanceOf(elementTokenContract, account);
  const balance = formatEther(balanceBN || 0);

  const amountDeposited = useDeposited(account) || "0";

  const { data: merkleInfo } = useMerkleInfo(account);
  const unclaimed = useUnclaimed(account, merkleInfo);

  return (
    <Card>
      <H3 className={tw("text-blue-900", "font-semibold")}>{t`Portfolio`}</H3>
      <div className={tw("flex", "min-h-full", "align-bottom")}>
        <LabeledStat data={balance} bottomLabel={t`Wallet balance`} />
        <LabeledStat data={amountDeposited} bottomLabel={t`Staked tokens`} />
        <LabeledStat data={unclaimed} bottomLabel={t`Unclaimed rewards`} />
      </div>
    </Card>
  );
}
