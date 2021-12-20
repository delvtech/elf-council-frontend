import { Fragment, ReactElement, ChangeEvent, useCallback } from "react";
import { Signer } from "ethers";
import { formatEther, parseEther } from "ethers/lib/utils";
import Link from "next/link";
        
import { elementTokenContract } from "src/elf/contracts";
import { useTokenBalanceOf } from "src/elf/token/useTokenBalanceOf";
import { Delegate } from "src/elf-council-delegates/delegates";
import Button from "src/ui/base/Button/Button";
import { useNumericInputValue } from "src/ui/base/Input/useNumericInputValue";
import { BalanceLabeledStat } from "src/ui/delegate/BalanceLabeledStat/BalanceLabeledStat";
import { DepositInput } from "src/ui/overview/DepositCard/DepositInput";
import { useWithdrawFromLockingVault } from "src/ui/rewards/useWithdrawFromLockingVault";
import { useDepositIntoLockingVault } from "src/ui/rewards/useDepositIntoLockingVault";
import { useDeposits } from "src/ui/contracts/useDeposits";
import { jt, t } from "ttag";
import tw from "src/elf-tailwindcss-classnames";
import { ButtonVariant } from "src/ui/base/Button/styles";

interface PortfolioCardProps {
  account: string | null | undefined;
  signer: Signer | undefined;
  currentDelegate: Delegate | undefined;
}

const portfolioTooltip = t`Don’t know what the difference between your wallet balance and eligible voting balance is? Click this icon to learn more`;

function PortfolioCard(props: PortfolioCardProps): ReactElement {
  const { account, signer, currentDelegate } = props;

  const { value: deposit, setNumericValue: setDeposit } =
    useNumericInputValue();
  const { value: withdraw, setNumericValue: setWithdraw } =
    useNumericInputValue();

  const clearDepositInput = () => setDeposit("");
  const clearWithdrawInput = () => setWithdraw("");

  const { data: walletBalanceBN } = useTokenBalanceOf(
    elementTokenContract,
    account
  );
  const walletBalance = formatEther(walletBalanceBN || 0);

  const { data: [, vaultBalanceBN] = [] } = useDeposits(account);
  const vaultBalance = formatEther(vaultBalanceBN || 0);

  const { mutate: onDeposit } = useDepositIntoLockingVault(
    signer,
    clearDepositInput
  );

  const { mutate: onWithdraw } = useWithdrawFromLockingVault(
    signer,
    clearWithdrawInput
  );

  const onSetDepositAmount = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const newDepositAmount = event.target.value;
      setDeposit(newDepositAmount);
    },
    [setDeposit]
  );

  const onSetWithdrawalAmount = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const newWithdrawalAmount = event.target.value;
      setWithdraw(newWithdrawalAmount);
    },
    [setWithdraw]
  );

  const depositClickHandler = () => {
    if (!account || !signer || !currentDelegate) return;
    onDeposit([account, parseEther(deposit), currentDelegate.address]);
  };

  const withdrawClickHandler = () => {
    if (!account) return;
    onWithdraw([parseEther(withdraw)]);
  };

  const setMaxDeposit = () => {
    if (!account) return;
    setDeposit(walletBalance);
  };
  const setMaxWithdraw = () => {
    if (!account) return;
    setWithdraw(vaultBalance);
  };

  return (
    <div>
      {/* Balance Stats */}
      <div className={tw("flex", "flex-col", "mb-4")}>
        <BalanceLabeledStat
          tooltip={portfolioTooltip}
          tooltipHref="/resources"
          label={t`Wallet Balance`}
          balance={walletBalance}
          className={tw("mb-2")}
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
        <div className={tw("mt-3")}>
          <div
            className={tw("text-white", "text-sm", "mb-2")}
          >{jt`Tokens Eligible to Deposit: ${walletBalance}`}</div>
          <DepositInput
            depositAmount={deposit}
            balance={walletBalance}
            onSetDepositAmount={onSetDepositAmount}
            id={"deposit-amount"}
            name={t`Deposit amount`}
            placeholder={t`Insert amount to deposit`}
            screenReaderLabel={t`Amount to deposit`}
          />
        </div>
        <div className={tw("w-full", "flex", "justify-end", "mt-4", "gap-4")}>
          <Button
            onClick={setMaxDeposit}
            disabled={!parseInt(walletBalance)}
            variant={ButtonVariant.GRADIENT}
          >{t`Max`}</Button>
          <Button
            onClick={depositClickHandler}
            disabled={!parseInt(walletBalance) || !deposit}
            variant={ButtonVariant.GRADIENT}
          >{t`Deposit`}</Button>
        </div>
      </div>

      {/* Withdraw Section */}
      <div className={tw("mt-7")}>
        <PortfolioWithdrawText />
        <div className={tw("mt-3")}>
          <div
            className={tw("text-white", "text-sm", "mb-2")}
          >{jt`Tokens Eligible to Deposit: ${walletBalance}`}</div>
          <DepositInput
            depositAmount={withdraw}
            balance={vaultBalance}
            onSetDepositAmount={onSetWithdrawalAmount}
            id={"withdraw-amount"}
            name={t`Withdraw amount`}
            placeholder={t`Insert amount to withdraw`}
            screenReaderLabel={t`Amount to withdraw`}
          />
        </div>
        <div className={tw("w-full", "flex", "justify-end", "mt-4", "gap-4")}>
          <Button
            onClick={setMaxWithdraw}
            disabled={!parseInt(vaultBalance)}
            variant={ButtonVariant.WHITE}
          >{t`Max`}</Button>
          <Button
            onClick={withdrawClickHandler}
            disabled={!parseInt(vaultBalance) || !withdraw}
            variant={ButtonVariant.WHITE}
          >{t`Withdraw`}</Button>
        </div>
      </div>
    </div>
  );
}

function PortfolioDepositText(): ReactElement {
  return (
    <p className={tw("text-white", "font-light", "leading-5", "text-sm")}>
      To protect our governance system, we ask our users to{" "}
      <span className={tw("font-bold")}>deposit</span> their tokens when they
      have the intention to vote and/or delegate.{" "}
      <span className={tw("font-bold")}>
        This verifies your eligibility to vote and/or delegate.
      </span>{" "}
      <div>
        <Link href="/resources" passHref>
          <a className={tw("text-goldYellow")} href="/resources">
            To learn more about our vaults read here.
          </a>
        </Link>
      </div>
    </p>
  );
}

function PortfolioWithdrawText(): ReactElement {
  return (
    <p className={tw("text-white", "font-light", "leading-5", "text-sm")}>
      To remove deposited tokens from voting eligibility enter a withdrawal
      amount.
      <div>
        <Link href="/resources" passHref>
          <a className={tw("text-goldYellow")} href="/resources">
            Read more to learn about our voting vaults.
          </a>
        </Link>
      </div>
    </p>
  );
}

export default PortfolioCard;
