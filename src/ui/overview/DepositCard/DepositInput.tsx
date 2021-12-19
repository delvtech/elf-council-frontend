import React, { ReactElement } from "react";
import { FixedNumber } from "ethers";
import tw from "src/elf-tailwindcss-classnames";
import NumericInput from "src/ui/base/Input/NumericInput";
import { t } from "ttag";

interface DepositInputProps {
  depositAmount: string;
  balance: string;
  onSetDepositAmount: (event: React.ChangeEvent<HTMLInputElement>) => void;
  id: string;
  name: string;
  placeholder: string;
  screenReaderLabel: string;
}

export function DepositInput(props: DepositInputProps): ReactElement {
  const {
    depositAmount,
    balance,
    onSetDepositAmount,
    id,
    name,
    placeholder,
    screenReaderLabel,
  } = props;
  const hasBalance = Number(balance);
  const hasEnoughBalance = !FixedNumber.from(balance || "0")
    .subUnsafe(FixedNumber.from(depositAmount || "0"))
    .isNegative();

  return (
    <NumericInput
      disabled={!hasBalance}
      error={!hasEnoughBalance}
      screenReaderLabel={screenReaderLabel}
      id={id}
      name={name}
      placeholder={placeholder}
      className={tw("grow")}
      inputClassName={tw("h-12", "text-center")}
      value={depositAmount}
      onChange={onSetDepositAmount}
    />
  );
}
