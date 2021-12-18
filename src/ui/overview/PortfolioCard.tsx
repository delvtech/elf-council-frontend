import React, { ReactElement } from "react";

import classNames from "classnames";
import { formatEther } from "ethers/lib/utils";
import tw from "src/elf-tailwindcss-classnames";
import { elementTokenContract } from "src/elf/contracts";
import { useMerkleInfo } from "src/elf/merkle/useMerkleInfo";
import { useTokenBalanceOf } from "src/elf/token/useTokenBalanceOf";
import { formatWalletAddress } from "src/formatWalletAddress";
import { useUnclaimedAirdrop } from "src/ui/airdrop/useUnclaimedAirdrop";
import LinkButton from "src/ui/base/Button/LinkButton";
import { ButtonVariant } from "src/ui/base/Button/styles";
import Card, { CardVariant } from "src/ui/base/Card/Card";
import { ElementIcon, IconSize } from "src/ui/base/ElementIcon";
import { useDeposited } from "src/ui/base/lockingVault/useDeposited";
import { useVotingPowerForAccount } from "src/ui/voting/useVotingPowerForAccount";
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
  const unclaimedAirdrop = useUnclaimedAirdrop(account, merkleInfo);
  const votingPower = useVotingPowerForAccount(account);

  return (
    <Card variant={CardVariant.GRADIENT} className={tw("shadow-md")}>
      <div>
        <span
          className={tw(
            "text-white",
            "font-bold",
            "text-xl",
            "tracking-widest"
          )}
        >{t`Portfolio`}</span>
        <span
          className={tw(
            "ml-2",
            "text-white",
            "font-light",
            "text-sm",
            "tracking-widest"
          )}
        >
          {account && `(${formatWalletAddress(account)})`}
        </span>
      </div>
      <div
        className={tw("flex", "flex-col", "min-h-full", "align-bottom", "mb-8")}
      >
        <div className={tw("flex", "items-center", "justify-between")}>
          <BalanceWithLabel
            className={tw("mt-8")}
            balance={balance}
            label={t`Wallet balance`}
          />
          <BalanceWithLabel
            className={tw("mt-8")}
            balance={unclaimedAirdrop}
            label={t`Voting Power`}
          />
        </div>
        <BalanceWithLabel
          className={tw("mt-8")}
          balance={amountDeposited}
          label={t`Eligible voting balance`}
        />
        <div
          className={tw(
            "flex",
            "items-center",
            "justify-between",
            "border-t",
            "border-white",
            "mt-4",
            "pt-4"
          )}
        >
          <BalanceWithLabel
            balance={unclaimedAirdrop}
            label={t`Unclaimed airdrop`}
          />
          <LinkButton
            link="/airdrop"
            className={tw("self-end", "mb-5")}
            variant={ButtonVariant.OUTLINE_WHITE}
          >{t`Claim`}</LinkButton>
        </div>
      </div>
    </Card>
  );
}

interface BalanceWithLabelProps {
  balance: string;
  label: string;
  className?: string;
}

function BalanceWithLabel(props: BalanceWithLabelProps) {
  const { className, balance, label } = props;
  return (
    <div className={classNames(className, tw("text-white"))}>
      <div className={tw("flex", "items-center")}>
        <div className={tw("text-2xl", "font-extralight")}>{balance}</div>
        <ElementIcon className={tw("ml-2")} size={IconSize.MEDIUM} />
      </div>
      <div className={tw("flex", "text-lg", "font-light")}>{label}</div>
    </div>
  );
}
