import React, { ReactElement, useCallback } from "react";

import { parseEther } from "@ethersproject/units";
import { FixedNumber, Signer } from "ethers";
import Link from "next/link";
import tw, {
  textColor,
  display,
  gridTemplateColumns,
  gap,
  fontWeight,
  padding,
  space,
  flexGrow,
  justifyContent,
  width,
  height,
  textAlign,
} from "src/elf-tailwindcss-classnames";
import Button from "src/ui/base/Button/Button";
import H3 from "src/ui/base/H3";
import TokenInput from "src/ui/base/Input/TokenInput";
import { useNumericInputValue } from "src/ui/base/Input/useNumericInputValue";
import { LabeledStat } from "src/ui/base/LabeledStat/LabeledStat";
import { useDeposited } from "src/ui/base/lockingVault/useDeposited";
import { WithdrawButton } from "src/ui/overview/DepositCard/WithdrawButton";
import { useWithdrawFromLockingVault } from "src/ui/rewards/useWithdrawFromLockingVault";
import { jt, t } from "ttag";

interface WithdrawSectionProps {
  account: string | undefined | null;
  signer: Signer | undefined;
}
export function WithdrawSection(props: WithdrawSectionProps): ReactElement {
  const { account, signer } = props;
  const amountDeposited = useDeposited(account) || "0";

  const title = t`Remove Voting Power`;
  const description = t`Withdraw your ELFI tokens to your wallet.`;
  const description2 = t`This will give your delegate less voting power.`;
  const learnMoreLink = (
    <Link key="learn-more-link" href="/resources">
      {/* There's a big discussion about how awful the Link api is for a11y
      here: https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/issues/402 the
      best thing to do for now is just ignore this rule when an anchor tag is
      the child of a Link since all a tags *should* have an href 🙁 */
      /* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a className="text-blue-500 underline">{t`here.`}</a>
    </Link>
  );
  const learnMore = jt`Learn more ${learnMoreLink}`;

  const { value: withdrawAmount, setNumericValue: setWithdrawAmount } =
    useNumericInputValue();

  const hasAmountDeposited = !!Number(amountDeposited);
  const hasEnoughDeposited = !FixedNumber.from(amountDeposited)
    .subUnsafe(FixedNumber.from(withdrawAmount || "0"))
    .isNegative();

  // handlers for numeric input
  const clearWithdrawInput = useCallback(() => {
    setWithdrawAmount("");
  }, [setWithdrawAmount]);

  // handler for max button
  const onSetMax = useCallback(() => {
    if (amountDeposited) {
      setWithdrawAmount(amountDeposited);
    }
  }, [amountDeposited, setWithdrawAmount]);

  // handler for withdraw button
  const withdrawFromLockingVault = useWithdrawFromLockingVault(
    signer,
    account,
    clearWithdrawInput,
  );
  const { mutate: withdraw, isLoading } = withdrawFromLockingVault;
  const onWithdraw = useCallback(() => {
    if (!account) {
      return;
    }

    withdraw([parseEther(withdrawAmount)]);
  }, [account, withdraw, withdrawAmount]);

  return (
    <div>
      <div
        className={tw(
          display("grid"),
          gridTemplateColumns("grid-cols-1", "sm:grid-cols-2"),
          gap("gap-6"),
        )}
      >
        <div>
          <H3
            className={tw(
              textColor("text-brandDarkBlue-dark"),
              fontWeight("font-semibold"),
              padding("pb-2"),
            )}
          >
            {title}
          </H3>
          <p>{description}</p>
          <p>{description2}</p>
          <p>{learnMore}</p>
        </div>

        <div className={space("space-y-4")}>
          <div
            className={tw(
              display("flex"),
              flexGrow("grow"),
              justifyContent("justify-end"),
            )}
          >
            <LabeledStat data={amountDeposited} bottomLabel={t`Deposited`} />
          </div>
          <div
            className={tw(display("flex"), space("space-x-4"), width("w-full"))}
          >
            <Button
              disabled={!hasAmountDeposited || !account}
              onClick={onSetMax}
            >
              <span className={width("w-full")}>{t`Max`}</span>
            </Button>
            <TokenInput
              disabled={!hasAmountDeposited}
              error={!hasEnoughDeposited}
              screenReaderLabel={t`Amount to withdraw`}
              id={"withdraw-amount"}
              name={t`Withdraw amount`}
              placeholder={t`Insert amount to withdraw`}
              className={flexGrow("grow")}
              inputClassName={tw(height("h-12"), textAlign("text-center"))}
              value={withdrawAmount}
              onChange={setWithdrawAmount}
            />
          </div>
          <WithdrawButton
            isLoading={isLoading}
            account={account}
            amountDeposited={amountDeposited}
            withdrawAmount={withdrawAmount}
            onWithdraw={onWithdraw}
          />
        </div>
      </div>
    </div>
  );
}
