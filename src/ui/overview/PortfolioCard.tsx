import React, { ReactElement } from "react";

import { t } from "ttag";

import { useMerkleInfo } from "src/elf/merkle/useMerkleInfo";
import { formatWalletAddress } from "src/formatWalletAddress";
import { useUnclaimedAirdrop } from "src/ui/airdrop/useUnclaimedAirdrop";
import { BalanceWithLabel } from "src/ui/base/BalanceWithLabel/BalanceWithLabel";
import LinkButton from "src/ui/base/Button/LinkButton";
import { ButtonVariant } from "src/ui/base/Button/styles";
import Card, { CardVariant } from "src/ui/base/Card/Card";
import { useDeposited } from "src/ui/base/lockingVault/useDeposited";
import { useVotingPowerForAccountAtLatestBlock } from "src/ui/voting/useVotingPowerForAccount";
import { getEtherscanAddress } from "src/elf-etherscan/domain";

const votingBalanceTooltipText = t`The amount of voting power you own in the system`;
const votingPowerTooltipText = t`The sum of all voting power delegated to you`;

interface PortfolioCardProps {
  account: string | undefined | null;
}

export function PortfolioCard(props: PortfolioCardProps): ReactElement {
  const { account } = props;

  const amountDeposited = useDeposited(account) || "0";

  const { data: merkleInfo } = useMerkleInfo(account);
  const unclaimedAirdrop = useUnclaimedAirdrop(account, merkleInfo);
  const votingPower = useVotingPowerForAccountAtLatestBlock(account);

  return (
    <Card
      variant={CardVariant.GRADIENT}
      // eslint-disable-next-line tailwindcss/no-custom-classname
      className="w-full shadow-md lg:max-w-[512px]"
    >
      <div>
        <span className="text-xl font-bold tracking-widest text-white">{t`Portfolio`}</span>
        {account && (
          <a
            href={getEtherscanAddress(account)}
            target="_blank"
            rel="noreferrer"
            className="ml-2 text-sm font-light tracking-widest text-white underline hover:no-underline"
          >
            ({formatWalletAddress(account)})
          </a>
        )}
      </div>
      <div className="mb-8 flex min-h-full flex-col align-bottom">
        <BalanceWithLabel
          className="mt-8 w-full"
          balance={amountDeposited}
          tooltipText={votingBalanceTooltipText}
          label={t`ELFI`}
        />
        <BalanceWithLabel
          className="mt-8 w-full"
          balance={votingPower}
          tooltipText={votingPowerTooltipText}
          label={t`Your Voting Power`}
        />
        {!!Number(unclaimedAirdrop) && (
          <div className="mt-4 flex items-center justify-between border-t border-white pt-4">
            <BalanceWithLabel
              balance={unclaimedAirdrop}
              label={t`Unclaimed ELFI`}
            />
            <LinkButton
              link="/airdrop"
              className="mb-5 self-end"
              variant={ButtonVariant.OUTLINE_WHITE}
            >{t`Claim`}</LinkButton>
          </div>
        )}
      </div>
    </Card>
  );
}
