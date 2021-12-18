import React, { ReactElement } from "react";

import { formatEther } from "ethers/lib/utils";
import tw from "src/elf-tailwindcss-classnames";
import { elementTokenContract } from "src/elf/contracts";
import { useMerkleInfo } from "src/elf/merkle/useMerkleInfo";
import { useTokenBalanceOf } from "src/elf/token/useTokenBalanceOf";
import Button from "src/ui/base/Button/Button";
import { ButtonVariant } from "src/ui/base/Button/styles";
import Card, { CardVariant } from "src/ui/base/Card/Card";
import { LabeledStat } from "src/ui/base/LabeledStat/LabeledStat";
import { useDeposited } from "src/ui/base/lockingVault/useDeposited";
import { useUnclaimed } from "src/ui/rewards/useUnclaimed";
import { t } from "ttag";
import { useVotingPowerForAccount } from "src/ui/voting/useVotingPowerForAccount";
import AnchorButton from "src/ui/base/Button/AnchorButton";
import LinkButton from "src/ui/base/Button/LinkButton";

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
  const votingPower = useVotingPowerForAccount(account);

  return (
    <Card variant={CardVariant.BLUE}>
      <div className={tw("text-white", "font-light")}>{t`Portfolio`}</div>
      <div className={tw("flex", "flex-col", "min-h-full", "align-bottom")}>
        <LabeledStat whiteText data={balance} topLabel={t`Wallet balance`} />
        <LabeledStat
          whiteText
          data={amountDeposited}
          topLabel={t`Voting vault balance`}
        />
        <div className={tw("flex", "items-center", "justify-between")}>
          <LabeledStat
            whiteText
            data={unclaimed}
            topLabel={t`Unclaimed rewards`}
          />
          <LinkButton
            link="/airdrop"
            className={tw("self-end", "mb-5")}
            variant={ButtonVariant.OUTLINE_WHITE}
          >{t`Claim`}</LinkButton>
        </div>
        <LabeledStat whiteText data={votingPower} topLabel={t`Voting Power`} />
      </div>
    </Card>
  );
}
