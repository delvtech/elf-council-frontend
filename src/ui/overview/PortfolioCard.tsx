import React, { ReactElement } from "react";

import classNames from "classnames";
import { commify, formatEther } from "ethers/lib/utils";
import { elementTokenContract } from "src/elf/contracts";
import { useMerkleInfo } from "src/elf/merkle/useMerkleInfo";
import { useTokenBalanceOf } from "src/elf/token/useTokenBalanceOf";
import { formatWalletAddress } from "src/formatWalletAddress";
import { useUnclaimedAirdrop } from "src/ui/airdrop/useUnclaimedAirdrop";
import LinkButton from "src/ui/base/Button/LinkButton";
import { ButtonVariant } from "src/ui/base/Button/styles";
import Card, { CardVariant } from "src/ui/base/Card/Card";
import { ElementIcon, IconSize } from "src/ui/base/ElementIcon";
import { InfoIconWithTooltip } from "src/ui/base/InfoIconWithTooltip";
import { useDeposited } from "src/ui/base/lockingVault/useDeposited";
import { useVotingPowerForAccount } from "src/ui/voting/useVotingPowerForAccount";
import { t } from "ttag";

const rand1 = Math.random() * 100000000;
const rand2 = Math.random() * 100000000;
const rand3 = Math.random() * 100000000;

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

  const formattedBalance = commify((+balance * rand1).toFixed(4));
  const formattedAirdrop = commify((+unclaimedAirdrop * rand2).toFixed(4));
  const formattedVotingPower = commify((+votingPower * rand3).toFixed(4));

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
          balance={formattedBalance}
          tooltipText={portfolioTooltipText}
          tooltipHref={"/resources"}
          label={t`Wallet balance`}
        />
        <BalanceWithLabel
          className="w-full mt-8"
          balance={amountDeposited}
          tooltipText={votingBalanceTooltipText}
          tooltipHref={"/resources"}
          label={t`Eligible voting balance`}
        />
        <BalanceWithLabel
          className="w-full mt-8"
          balance={formattedVotingPower}
          tooltipText={votingPowerTooltipText}
          tooltipHref={"/resources"}
          label={t`Voting Power`}
        />
        <div className="flex items-center justify-between pt-4 mt-4 border-t border-white">
          <BalanceWithLabel
            balance={formattedAirdrop}
            label={t`Unclaimed airdrop`}
          />
          <LinkButton
            link="/airdrop"
            className="self-end mb-5"
            variant={ButtonVariant.OUTLINE_WHITE}
          >{t`Claim`}</LinkButton>
        </div>
      </div>
    </Card>
  );
}

interface BalanceWithLabelProps {
  className?: string;
  balance: string;
  label: string;
  tooltipText?: string;
  tooltipHref?: string;
}
function BalanceWithLabel(props: BalanceWithLabelProps) {
  const { className, balance, label, tooltipHref, tooltipText } = props;
  return (
    <div className={classNames(className, "text-white")}>
      <div className="flex items-center">
        <div className="text-2xl font-extralight">{balance}</div>
        <ElementIcon className="ml-2" size={IconSize.MEDIUM} />
      </div>
      <div className="flex items-center text-lg font-light">
        {label}
        {tooltipText && (
          <InfoIconWithTooltip
            className="ml-1"
            tooltipText={tooltipText}
            tooltipHref={tooltipHref}
          />
        )}
      </div>
    </div>
  );
}
