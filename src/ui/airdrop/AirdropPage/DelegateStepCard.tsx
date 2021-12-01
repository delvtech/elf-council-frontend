import React, { ReactElement, useState } from "react";
import { isValidAddress } from "src/base/isValidAddress";
import tw from "src/elf-tailwindcss-classnames";
import Button from "src/ui/base/Button/Button";
import { ButtonVariant } from "src/ui/base/Button/styles";
import Card, { CardVariant } from "src/ui/base/Card/Card";
import TextInput from "src/ui/base/Input/TextInput";
import FeaturedDelegatesTable from "src/ui/overview/FeaturedDelegatesTable";
import { ConnectWalletButton } from "src/ui/wallet/ConnectWalletButton/ConnectWalletButton";
import { t } from "ttag";

interface DelegateStepCardProps {}

export function DelegateStepCard({}: DelegateStepCardProps): ReactElement {
  const [delegateAddress, setDelegateAddress] = useState("");
  return (
    <Card
      variant={CardVariant.BLUE}
      className={tw("flex", "flex-col", "text-white", "text-center")}
    >
      <div className={tw("text-center", "text-sm", "mb-4")}>
        <div
          className={tw("font-semibold", "tracking-wider")}
        >{t`Delegate your voting power`}</div>
      </div>
      <div>
        <TextInput
          screenReaderLabel={t`Delegate address`}
          id={"delegate-address-input"}
          name={""}
          onChange={(e) => setDelegateAddress(e.target.value)}
          value={delegateAddress}
          placeholder={t`Copy and paste a delegate address here`}
        />
        <FeaturedDelegatesTable />
      </div>
      <div className={tw("flex", "justify-end", "w-full")}>
        <Button className={tw("mr-4")} variant={ButtonVariant.MINIMAL}>
          <span className={tw("text-white", "text-xs")}>{t`Claim only`}</span>
        </Button>
        <Button
          disabled={!isValidAddress(delegateAddress)}
          variant={ButtonVariant.GRADIENT}
        >{t`Claim and delegate`}</Button>
      </div>
    </Card>
  );
}
