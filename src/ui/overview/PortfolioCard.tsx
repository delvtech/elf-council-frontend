import React, { ReactElement } from "react";

import classNames from "classnames";
import { commify, formatEther } from "ethers/lib/utils";
import tw, {
  boxShadow,
  textColor,
  fontWeight,
  fontSize,
  letterSpacing,
  margin,
  display,
  flexDirection,
  minHeight,
  verticalAlign,
  width,
  alignItems,
  justifyContent,
  borderWidth,
  borderColor,
  padding,
  alignSelf,
} from "src/elf-tailwindcss-classnames";
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

const portfolioTooltipText = t`Don’t know what the difference between your wallet balance and eligible voting balance is? Click this icon to learn more`;
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
    <Card variant={CardVariant.GRADIENT} className={tw(boxShadow("shadow-md"))}>
      <div>
        <span
          className={tw(
            textColor("text-white"),
            fontWeight("font-bold"),
            fontSize("text-xl"),
            letterSpacing("tracking-widest"),
          )}
        >{t`Portfolio`}</span>
        <span
          className={tw(
            margin("ml-2"),
            textColor("text-white"),
            fontWeight("font-light"),
            fontSize("text-sm"),
            letterSpacing("tracking-widest"),
          )}
        >
          {account && `(${formatWalletAddress(account)})`}
        </span>
      </div>
      <div
        className={tw(
          display("flex"),
          flexDirection("flex-col"),
          minHeight("min-h-full"),
          verticalAlign("align-bottom"),
          margin("mb-8"),
        )}
      >
        <BalanceWithLabel
          className={tw(width("w-full"), margin("mt-8"))}
          balance={formattedBalance}
          tooltipText={portfolioTooltipText}
          tooltipHref={"/resources"}
          label={t`Wallet balance`}
        />
        <BalanceWithLabel
          className={tw(width("w-full"), margin("mt-8"))}
          balance={amountDeposited}
          tooltipText={votingBalanceTooltipText}
          tooltipHref={"/resources"}
          label={t`Eligible voting balance`}
        />
        <BalanceWithLabel
          className={tw(width("w-full"), margin("mt-8"))}
          balance={formattedVotingPower}
          tooltipText={votingPowerTooltipText}
          tooltipHref={"/resources"}
          label={t`Voting Power`}
        />
        <div
          className={tw(
            display("flex"),
            alignItems("items-center"),
            justifyContent("justify-between"),
            borderWidth("border-t"),
            borderColor("border-white"),
            margin("mt-4"),
            padding("pt-4"),
          )}
        >
          <BalanceWithLabel
            balance={formattedAirdrop}
            label={t`Unclaimed airdrop`}
          />
          <LinkButton
            link="/airdrop"
            className={tw(alignSelf("self-end"), margin("mb-5"))}
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
    <div className={classNames(className, tw(textColor("text-white")))}>
      <div className={tw(display("flex"), alignItems("items-center"))}>
        <div
          className={tw(fontSize("text-2xl"), fontWeight("font-extralight"))}
        >
          {balance}
        </div>
        <ElementIcon className={tw(margin("ml-2"))} size={IconSize.MEDIUM} />
      </div>
      <div
        className={tw(
          display("flex"),
          fontSize("text-lg"),
          fontWeight("font-light"),
          alignItems("items-center"),
        )}
      >
        {label}
        {tooltipText && (
          <InfoIconWithTooltip
            className={tw(margin("ml-1"))}
            tooltipText={tooltipText}
            tooltipHref={tooltipHref}
          />
        )}
      </div>
    </div>
  );
}
