import { ReactElement } from "react";
import { Signer } from "ethers";
import { Delegate } from "src/elf-council-delegates/delegates";
import { BalanceLabeledStat } from "src/ui/delegate/BalanceLabeledStat/BalanceLabeledStat";

import { t } from "ttag";
import classNames from "classnames";
import DepositSection from "src/ui/delegate/PortfolioCard/DepositSection";
import WithdrawSection from "src/ui/delegate/PortfolioCard/WithdrawSection";

interface PortfolioCardProps {
  account: string | null | undefined;
  signer: Signer | undefined;
  currentDelegate: Delegate | undefined;
  walletBalance: string;
  vaultBalance: string;
  refetchBalances: () => void;
}

const portfolioTooltip = t`Don't know what the difference between your wallet balance and eligible voting balance is? Click this icon to learn more`;

function PortfolioCard(props: PortfolioCardProps): ReactElement {
  const {
    account,
    signer,
    currentDelegate,
    walletBalance,
    vaultBalance,
    refetchBalances,
  } = props;

  return (
    <div className={classNames({ "opacity-50": !account })}>
      {/* Balance Stats */}
      <div className="flex flex-col mb-4">
        <BalanceLabeledStat
          tooltip={portfolioTooltip}
          tooltipHref="/resources"
          label={t`Wallet Balance`}
          balance={walletBalance}
          className="mb-2"
        />
        <BalanceLabeledStat
          tooltip={portfolioTooltip}
          tooltipHref="/resources"
          label={t`Deposited Balance`}
          balance={vaultBalance}
        />
      </div>

      {/* Deposit Section */}
      <DepositSection
        account={account}
        signer={signer}
        currentDelegate={currentDelegate}
        walletBalance={walletBalance}
        refetchBalances={refetchBalances}
      />

      {/* Withdraw Section */}
      <WithdrawSection
        account={account}
        signer={signer}
        className="mt-7"
        vaultBalance={vaultBalance}
        refetchBalances={refetchBalances}
      />
    </div>
  );
}

export default PortfolioCard;
