import { Fragment, ReactElement, ChangeEvent, useCallback } from "react";
import { Signer } from "ethers";
import { formatEther, parseEther } from "ethers/lib/utils";

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
import { ExclamationCircleIcon } from "@heroicons/react/outline";

interface PortfolioCardProps {
  account: string | null | undefined;
  signer: Signer | undefined;
  currentDelegate: Delegate | undefined;
}

function WalletHelperText(): ReactElement {
  const linkElement = (
    <span key="wallet-balance-tooltip" className={tw("whitespace-nowrap")}>
      the&nbsp;
      <span>
        <ExclamationCircleIcon className={tw("inline-block", "h-3")} />
      </span>{" "}
      <span>icon to learn more.</span>
    </span>
  );

  return (
    <div>
      <span>
        {jt`Don’t know what the difference between your wallet balance and eligible voting balance is? Click ${linkElement}`}
      </span>
    </div>
  );
}

function VaultHelperText(): ReactElement {
  const linkElement = (
    <span key="vault-balance-tooltip" className={tw("whitespace-nowrap")}>
      the&nbsp;
      <span>
        <ExclamationCircleIcon className={tw("inline-block", "h-3")} />
      </span>{" "}
      <span>icon to learn more.</span>
    </span>
  );

  return (
    <div>
      <span>
        {jt`Don’t know what the difference between your wallet balance and eligible voting balance is? Click ${linkElement}`}
      </span>
    </div>
  );
}

const walletToolTip = t`This balance is the amount of $ELFI tokens you have in this wallet.  These are not eligible for voting unless they’re deposited into our voting vaults. This is done to protect our governance decisions. If you would like to vote and/or delegate, please deposit the amount of $ELFI tokens that you would like to use in this voting period into our voting vault. To learn more about our vaults read here.`;
const vaultToolTip = t`If you would like to remove tokens from our voter vaults that would no longer be eligible for voting/delegating please enter and withdraw below.`;

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
    <Fragment>
      <div>
        <BalanceLabeledStat
          tooltip={walletToolTip}
          helperText={<WalletHelperText />}
          label={t`Wallet Balance`}
          balance={walletBalance}
          className={tw("mb-3")}
        />
        <DepositInput
          depositAmount={deposit}
          balance={walletBalance}
          onSetDepositAmount={onSetDepositAmount}
          id={"deposit-amount"}
          name={t`Deposit amount`}
          placeholder={t`Insert amount to deposit`}
          screenReaderLabel={t`Amount to deposit`}
        />
        <div className={tw("w-full", "flex", "justify-end", "mt-4", "gap-4")}>
          <Button
            onClick={setMaxDeposit}
            disabled={!parseInt(walletBalance)}
            variant={ButtonVariant.WHITE}
          >{t`Max`}</Button>
          <Button
            onClick={depositClickHandler}
            disabled={!parseInt(walletBalance) || !deposit}
            variant={ButtonVariant.WHITE}
          >{t`Deposit`}</Button>
        </div>
      </div>
      <div className={tw("mt-2")}>
        <BalanceLabeledStat
          tooltip={vaultToolTip}
          helperText={<VaultHelperText />}
          label={t`Eligible Voting Balance`}
          balance={vaultBalance}
          className={tw("mb-3")}
        />
        <DepositInput
          depositAmount={withdraw}
          balance={vaultBalance}
          onSetDepositAmount={onSetWithdrawalAmount}
          id={"withdraw-amount"}
          name={t`Withdraw amount`}
          placeholder={t`Insert amount to withdraw`}
          screenReaderLabel={t`Amount to withdraw`}
        />
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
    </Fragment>
  );
}

export default PortfolioCard;
