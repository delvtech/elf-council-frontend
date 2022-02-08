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
import { RESOURCES_URL } from "src/ui/resources";
import { useVotingPowerForAccountAtLatestBlock } from "src/ui/voting/useVotingPowerForAccount";
import { getEtherscanAddress } from "src/elf-etherscan/domain";

const votingBalanceTooltipText = t`Don't know what your voting balance is?  Click on the icon to find out more.`;
const votingPowerTooltipText = t`Don't know what your voting power is?  Click on the icon to find out more.`;

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
      <div className="flex flex-col min-h-full mb-8 align-bottom">
        <BalanceWithLabel
          className="w-full mt-8"
          balance={amountDeposited}
          tooltipText={votingBalanceTooltipText}
          tooltipHref={RESOURCES_URL}
          label={t`Voting Vault Balance`}
        />
        <BalanceWithLabel
          className="w-full mt-8"
          balance={votingPower}
          tooltipText={votingPowerTooltipText}
          tooltipHref={RESOURCES_URL}
          label={t`Your Voting Power`}
        />
        {!!Number(unclaimedAirdrop) && (
          <div className="flex items-center justify-between pt-4 mt-4 border-t border-white">
            <BalanceWithLabel
              balance={unclaimedAirdrop}
              label={t`Unclaimed Airdrop`}
            />
            <LinkButton
              link="/airdrop"
              className="self-end mb-5"
              variant={ButtonVariant.OUTLINE_WHITE}
            >{t`Claim`}</LinkButton>
          </div>
        )}
      </div>
    </Card>
  );
}
