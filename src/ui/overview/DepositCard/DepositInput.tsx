import React, { ChangeEvent, ReactElement, useCallback } from "react";
import { FixedNumber } from "ethers";
import tw, {
  flexGrow,
  height,
  textAlign,
} from "src/elf-tailwindcss-classnames";
import classNames from "classnames";
import NumericInput from "src/ui/base/Input/NumericInput";

interface DepositInputProps {
  depositAmount: string;
  balance: string;
  setDepositAmount: (value: string) => void;
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
    setDepositAmount,
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

  const onSetDepositAmount = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const newDepositAmount = event.target.value;
      setDepositAmount(newDepositAmount);
    },
    [setDepositAmount],
  );

  const setMax = useCallback(() => {
    setDepositAmount(balance);
  }, [balance, setDepositAmount]);

  return (
    <NumericInput
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
      setMax={setMax}
      onChange={onSetDepositAmount}
    />
  );
}
