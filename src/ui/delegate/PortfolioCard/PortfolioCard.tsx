import { ReactElement } from "react";
import { ethers, Signer } from "ethers";
import { parseEther } from "ethers/lib/utils";
import Link from "next/link";
import { Delegate } from "src/elf-council-delegates/delegates";
import Button from "src/ui/base/Button/Button";
import { ButtonVariant } from "src/ui/base/Button/styles";
import { DepositInput } from "src/ui/overview/DepositCard/DepositInput";
import { BalanceLabeledStat } from "src/ui/delegate/BalanceLabeledStat/BalanceLabeledStat";
import { useNumericInputValue } from "src/ui/base/Input/useNumericInputValue";
import { useTokenAllowance } from "src/elf/token/useTokenAllowance";
import { useSetTokenAllowance } from "src/ui/base/token/useSetTokenAllowance";
import { useWithdrawFromLockingVault } from "src/ui/rewards/useWithdrawFromLockingVault";
import { useDepositIntoLockingVault } from "src/ui/rewards/useDepositIntoLockingVault";
import { jt, t } from "ttag";
import classNames from "classnames";
import { addressesJson } from "src/elf-council-addresses";
import { elementTokenContract } from "src/elf/contracts";

interface PortfolioCardProps {
  account: string | null | undefined;
  signer: Signer | undefined;
  currentDelegate: Delegate | undefined;
  walletBalance: string;
  vaultBalance: string;
}

const portfolioTooltip = t`Don’t know what the difference between your wallet balance and eligible voting balance is? Click this icon to learn more`;

function PortfolioCard(props: PortfolioCardProps): ReactElement {
  const { elementToken, lockingVault } = addressesJson.addresses;
  const { account, signer, currentDelegate, walletBalance, vaultBalance } =
    props;

  const { value: depositAmount, setNumericValue: setDepositAmount } =
    useNumericInputValue();
  const { value: withdrawAmount, setNumericValue: setWithdrawAmount } =
    useNumericInputValue();

  const clearDepositInput = () => setDepositAmount("");
  const clearWithdrawInput = () => setWithdrawAmount("");

  const { mutate: deposit } = useDepositIntoLockingVault(
    signer,
    clearDepositInput,
  );

  const { mutate: withdraw } = useWithdrawFromLockingVault(
    signer,
    clearWithdrawInput,
  );

  const { mutate: allow } = useSetTokenAllowance(signer, elementToken);

  const { data: allowanceBN } = useTokenAllowance(
    elementTokenContract,
    account,
    lockingVault,
  );

  const isAllowed = allowanceBN?.gt(parseEther(depositAmount || "0")) || false;

  const onSetAllowance = () => {
    if (!account || !signer || !lockingVault) return;

    allow([lockingVault, ethers.constants.MaxUint256]);
  };

  const onDeposit = () => {
    if (!account || !signer || !currentDelegate) return;
    deposit([account, parseEther(depositAmount), currentDelegate.address]);
  };

  const onWithdraw = () => {
    if (!account) return;
    withdraw([parseEther(withdrawAmount)]);
  };

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
      <div>
        <PortfolioDepositText />
        <div className="mt-3">
          <div className="text-white text-sm mb-2">
            {jt`Tokens Eligible to Deposit: ${walletBalance}`}
          </div>
          <DepositInput
            depositAmount={depositAmount}
            balance={walletBalance}
            onDeposit={setDepositAmount}
            id={"deposit-amount"}
            name={t`Deposit amount`}
            placeholder={t`Insert amount to deposit`}
            screenReaderLabel={t`Amount to deposit`}
          />
        </div>
        <div className="w-full flex justify-end mt-4 gap-4">
          {!isAllowed && account ? (
            <Button
              onClick={onSetAllowance}
              disabled={!account}
              variant={ButtonVariant.GRADIENT}
              className="w-28 justify-center"
            >
              {t`Allow`}
            </Button>
          ) : null}

          <Button
            onClick={onDeposit}
            disabled={!parseInt(walletBalance) || !depositAmount || !isAllowed}
            variant={ButtonVariant.GRADIENT}
            className="w-28 justify-center"
          >{t`Deposit`}</Button>
        </div>
      </div>

      {/* Withdraw Section */}
      <div className="mt-7">
        <PortfolioWithdrawText />
        <div className="mt-3">
          <div className="text-white text-sm mb-2">
            {jt`Tokens Eligible to Withdraw: ${vaultBalance}`}
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
          <Button
            onClick={onWithdraw}
            disabled={!parseInt(vaultBalance) || !withdrawAmount}
            variant={ButtonVariant.WHITE}
            className="w-28 text-center"
          >{t`Withdraw`}</Button>
        </div>
      </div>
    </div>
  );
}

function PortfolioDepositText(): ReactElement {
  const deposit = <span className="font-bold">{t`deposit`}</span>;

  return (
    <p className="text-white font-light leading-5 text-sm">
      {jt`To protect our governance system, we ask our users to ${deposit} their tokens when they have the intention to vote and/or delegate.`}{" "}
      <span className="font-bold">
        {t`This verifies your eligibility to vote and/or delegate.`}
      </span>
      <div>
        <Link href="/resources" passHref>
          <span className="text-goldYellow cursor-pointer">
            {t`To learn more about our vaults read here.`}
          </span>
        </Link>
      </div>
    </p>
  );
}

function PortfolioWithdrawText(): ReactElement {
  return (
    <p className="text-white font-light leading-5 text-sm">
      {t`To remove deposited tokens from voting eligibility enter a withdrawal
      amount.`}
      <div>
        <Link href="/resources" passHref>
          <span className="text-goldYellow cursor-pointer">
            {t`Read more to learn about our voting vaults.`}
          </span>
        </Link>
      </div>
    </p>
  );
}

export default PortfolioCard;
