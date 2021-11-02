import React, { ReactElement } from "react";

import { Signer } from "ethers";
import tw from "src/elf-tailwindcss-classnames";
import Card from "src/ui/base/Card/Card";
import H2 from "src/ui/base/H2";
import { t } from "ttag";
import { DepositSection } from "./DepositSection";
import { WithdrawSection } from "./WithdrawSection";

interface DepositCardProps {
  account: string | undefined | null;
  signer: Signer | undefined;
}

export default function DepositCard(props: DepositCardProps): ReactElement {
  const { account, signer } = props;

  return (
    <Card className={tw("w-full")}>
      <H2
        className={tw("text-brandDarkBlue-dark", "font-semibold", "pb-4")}
      >{t`Voting Power`}</H2>
      <div className={tw("space-y-12")}>
        <DepositSection account={account} signer={signer} />
        <WithdrawSection account={account} signer={signer} />
      </div>
    </Card>
  );
}
