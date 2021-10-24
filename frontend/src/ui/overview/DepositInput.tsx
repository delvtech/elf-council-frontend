import React, { ReactElement } from "react";
import { FixedNumber } from "ethers";
import tw from "src/elf-tailwindcss-classnames";
import NumericInput from "src/ui/base/Input/NumericInput";
import { t } from "ttag";

interface DepositInputProps {
  depositAmount: string;
  balance: string;
  onSetDepositAmount: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function DepositInput(props: DepositInputProps): ReactElement {
  const { depositAmount, balance, onSetDepositAmount } = props;
  const hasEnoughBalance = !FixedNumber.from(balance || "0")
    .subUnsafe(FixedNumber.from(depositAmount || "0"))
    .isNegative();
  return (
    <NumericInput
      error={!hasEnoughBalance}
      screenReaderLabel={t`Amount to deposit`}
      id={"deposit-amount"}
      name={t`Deposit amount`}
      placeholder={t`Insert amount to deposit`}
      className={tw("h-12", "text-center", "flex-grow")}
      inputClassName={tw("h-12", "text-center", "flex-grow")}
      value={depositAmount}
      onChange={onSetDepositAmount}
    />
  );
}
