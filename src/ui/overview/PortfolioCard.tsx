import React, { ReactElement } from "react";
import { formatEther } from "ethers/lib/utils";
import { elementTokenContract } from "src/elf/contracts";
import { useMerkleInfo } from "src/elf/merkle/useMerkleInfo";
import { useTokenBalanceOf } from "src/elf/token/useTokenBalanceOf";
import { formatWalletAddress } from "src/formatWalletAddress";
import { useUnclaimedAirdrop } from "src/ui/airdrop/useUnclaimedAirdrop";
import { BalanceWithLabel } from "src/ui/base/BalanceWithLabel/BalanceWithLabel";
import LinkButton from "src/ui/base/Button/LinkButton";
import { ButtonVariant } from "src/ui/base/Button/styles";
import Card, { CardVariant } from "src/ui/base/Card/Card";
import { useDeposited } from "src/ui/base/lockingVault/useDeposited";
import { useVotingPowerForAccount } from "src/ui/voting/useVotingPowerForAccount";
import { t } from "ttag";
import { RESOURCES_URL } from "src/ui/resources";

const portfolioTooltipText = t`Don't know what the difference between your wallet balance and eligible voting balance is? Click this icon to learn more`;
const votingBalanceTooltipText = t`Don't know what your voting balance is?  Click on the icon to find out more.`;
const votingPowerTooltipText = t`Don't know what your voting power is?  Click on the icon to find out more.`;

interface PortfolioCardProps {
  account: string | undefined | null;
}

export function PortfolioCard(props: PortfolioCardProps): ReactElement {
  const { account } = props;

  const { data: balanceBN } = useTokenBalanceOf(elementTokenContract, account);

  const balance = formatEther(balanceBN || 0);

  const amountDeposited = useDeposited(account) || "0";

  const { data: merkleInfo } = useMerkleInfo(account);
  const unclaimedAirdrop = useUnclaimedAirdrop(account, merkleInfo);
  const votingPower = useVotingPowerForAccount(account);

  return (
    <Card
      variant={CardVariant.GRADIENT}
      // eslint-disable-next-line tailwindcss/no-custom-classname
      className="w-full shadow-md lg:max-w-[512px]"
    >
      <div>
        <span className="text-xl font-bold tracking-widest text-white">{t`Portfolio`}</span>
        <span className="ml-2 text-sm font-light tracking-widest text-white">
          {account && `(${formatWalletAddress(account)})`}
        </span>
      </div>
      <div className="flex flex-col min-h-full mb-8 align-bottom">
        <BalanceWithLabel
          className="w-full mt-8"
          balance={balance}
          tooltipText={portfolioTooltipText}
          tooltipHref={RESOURCES_URL}
          label={t`Wallet balance`}
        />
        <BalanceWithLabel
          className="w-full mt-8"
          balance={amountDeposited}
          tooltipText={votingBalanceTooltipText}
          tooltipHref={RESOURCES_URL}
          label={t`Eligible voting balance`}
        />
        <BalanceWithLabel
          className="w-full mt-8"
          balance={votingPower}
          tooltipText={votingPowerTooltipText}
          tooltipHref={RESOURCES_URL}
          label={t`Voting Power`}
        />
        {!!Number(unclaimedAirdrop) && (
          <div className="flex items-center justify-between pt-4 mt-4 border-t border-white">
            <BalanceWithLabel
              balance={unclaimedAirdrop}
              label={t`Unclaimed airdrop`}
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
