import React, { ChangeEvent, ReactElement, useCallback } from "react";
import { FixedNumber } from "ethers";
import tw, {
  flexGrow,
  height,
  textAlign,
} from "src/elf-tailwindcss-classnames";
import classNames from "classnames";
import TokenInput from "src/ui/base/Input/TokenInput";

interface DepositInputProps {
  depositAmount: string;
  balance: string;
  onDeposit: (value: string) => void;
  className?: string;
  inputClassName?: string;
  id: string;
  name: string;
  placeholder: string;
  screenReaderLabel: string;
}

export function DepositInput(props: DepositInputProps): ReactElement {
  const {
    depositAmount,
    balance,
    onDeposit,
    className = "",
    inputClassName = "",
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
    <TokenInput
      disabled={!hasBalance}
      error={!hasEnoughBalance}
      screenReaderLabel={screenReaderLabel}
      id={id}
      name={name}
      placeholder={placeholder}
      className={classNames(className, tw(flexGrow("grow")))}
      inputClassName={classNames(
        inputClassName,
        tw(height("h-12"), textAlign("text-left")),
      )}
      value={depositAmount}
      showMaxButton
      maxValue={balance}
      onChange={onDeposit}
    />
  );
}
