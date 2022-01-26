import { ReactElement } from "react";

import classNames from "classnames";
import { Signer } from "ethers";
import dynamic from "next/dynamic";
import { t } from "ttag";

import { BalanceWithLabel } from "src/ui/base/BalanceWithLabel/BalanceWithLabel";
import { RESOURCES_URL } from "src/ui/resources";

// SSR: false? -- https://stackoverflow.com/a/64119607
const DynamicDepositSection = dynamic(
  () => import("src/ui/delegate/PortfolioCard/DepositSection"),
  { ssr: false },
);
const DynamicWithdrawSection = dynamic(
  () => import("src/ui/delegate/PortfolioCard/WithdrawSection"),
  { ssr: false },
);

interface PortfolioCardProps {
  account: string | null | undefined;
  signer: Signer | undefined;
  currentDelegateAddress: string | undefined;
  walletBalance: string;
  vaultBalance: string;
}

const portfolioTooltip = t`Don't know what the difference between your wallet balance and eligible voting balance is? Click this icon to learn more`;

function PortfolioCard(props: PortfolioCardProps): ReactElement {
  const {
    account,
    signer,
    currentDelegateAddress,
    walletBalance,
    vaultBalance,
  } = props;

  return (
    <div className={classNames({ "opacity-50": !account })}>
      {/* Balance Stats */}
      <div className="flex flex-col mb-4">
        <BalanceWithLabel
          tooltipText={portfolioTooltip}
          tooltipHref={RESOURCES_URL}
          label={t`Wallet Balance`}
          balance={walletBalance}
          className="mb-2"
        />
        <BalanceWithLabel
          tooltipText={portfolioTooltip}
          tooltipHref={RESOURCES_URL}
          label={t`Deposited Balance`}
          balance={vaultBalance}
        />
      </div>

      {/* Deposit Section */}
      <DynamicDepositSection
        account={account}
        signer={signer}
        currentDelegateAddress={currentDelegateAddress}
        walletBalance={walletBalance}
      />

      {/* Withdraw Section */}
      <DynamicWithdrawSection
        account={account}
        signer={signer}
        className="mt-7"
        vaultBalance={vaultBalance}
      />
    </div>
  );
}

export default PortfolioCard;
