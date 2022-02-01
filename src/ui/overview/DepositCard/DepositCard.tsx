import React, { ReactElement } from "react";

import { Signer } from "ethers";
import tw, {
  width,
  textColor,
  fontWeight,
  padding,
  space,
} from "src/elf-tailwindcss-classnames";
import Card from "src/ui/base/Card/Card";
import H2 from "src/ui/base/H2/H2";
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
    <Card className={width("w-full")}>
      <H2
        className={tw(
          textColor("text-brandDarkBlue-dark"),
          fontWeight("font-semibold"),
          padding("pb-4"),
        )}
      >{t`Voting Power`}</H2>
      <div className={space("space-y-12")}>
        <DepositSection account={account} signer={signer} />
        <WithdrawSection account={account} signer={signer} />
      </div>
    </Card>
  );
}
