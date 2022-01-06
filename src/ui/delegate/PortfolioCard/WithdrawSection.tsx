import { ReactElement, useEffect, useState } from "react";
import { Signer } from "ethers";
import { t } from "ttag";
import Link from "next/link";

import { useNumericInputValue } from "src/ui/base/Input/useNumericInputValue";
import { useWithdrawFromLockingVault } from "src/ui/rewards/useWithdrawFromLockingVault";
import { parseEther } from "ethers/lib/utils";
import { DepositInput } from "src/ui/overview/DepositCard/DepositInput";

import { ButtonVariant } from "src/ui/base/Button/styles";

import { WithdrawButton } from "src/ui/overview/DepositCard/WithdrawButton";

interface WithdrawSectionProps {
  account: string | null | undefined;
  signer: Signer | undefined;
  className?: string;
  vaultBalance: string;
}

const MAX_INPUT = 1000000000;
const MAX_PRECISION = 18;

function WithdrawSection(props: WithdrawSectionProps): ReactElement {
  const { account, signer, className, vaultBalance } = props;
  const [withdrawInProgress, setWithdrawInProgress] = useState(false);

  const { value: withdrawAmount, setNumericValue: setWithdrawAmount } =
    useNumericInputValue({ max: MAX_INPUT, maxPrecision: MAX_PRECISION });

  const clearWithdrawInput = () => {
    setWithdrawAmount("");
  };

  const onWithdrawSuccess = () => {
    clearWithdrawInput();
    setWithdrawInProgress(false);
  };

  const { mutate: withdraw, isLoading: withdrawLoading } =
    useWithdrawFromLockingVault(signer, account, onWithdrawSuccess);

  const onWithdraw = () => {
    if (!account) {
      return;
    }
    setWithdrawInProgress(true);
    withdraw([parseEther(withdrawAmount)]);
  };

  useEffect(() => {
    // If the withdraw failed
    if (!withdrawLoading && withdrawInProgress) {
      setWithdrawInProgress(false);
    }
  }, [withdrawInProgress, withdrawLoading]);

  return (
    <div className={className}>
      <PortfolioWithdrawText />
      <div className="mt-3">
        <div className="text-white text-sm mb-2">
          {t`Tokens Eligible to Withdraw: ${vaultBalance}`}
        </div>
        <DepositInput
          depositAmount={withdrawAmount}
          balance={vaultBalance}
          onDeposit={setWithdrawAmount}
          id={"withdraw-amount"}
          name={t`Withdraw amount`}
          placeholder={t`Insert amount to withdraw`}
          screenReaderLabel={t`Amount to withdraw`}
        />
      </div>
      <div className="w-full flex justify-end mt-4 gap-4">
        <WithdrawButton
          account={account}
          amountDeposited={vaultBalance}
          withdrawAmount={withdrawAmount}
          onWithdraw={onWithdraw}
          isLoading={withdrawLoading || withdrawInProgress}
          buttonVariant={ButtonVariant.WHITE}
          buttonClassName="w-28 justify-center"
        />
      </div>
    </div>
  );
}

function PortfolioWithdrawText(): ReactElement {
  return (
    <p className="text-white font-light leading-5 text-sm">
      {t`To remove deposited tokens from voting eligibility enter a withdrawal
      amount.`}
      <div>
        <Link href="/resources">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a className="text-goldYellow">
            {t`Read more to learn about our voting vaults.`}
          </a>
        </Link>
      </div>
    </p>
  );
}

export default WithdrawSection;
