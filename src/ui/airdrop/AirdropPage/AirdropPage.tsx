import { useWeb3React } from "@web3-react/core";
import React, { ReactElement } from "react";
import tw from "src/elf-tailwindcss-classnames";
import Card, { CardVariant } from "src/ui/base/Card/Card";
import H1 from "src/ui/base/H1";
import H2 from "src/ui/base/H2";
import { t } from "ttag";

export default function AirdropPage(): ReactElement {
  const { account, library } = useWeb3React();

  return (
    <div
      style={{ width: 500 }}
      className={tw("flex", "flex-col", "h-full", "pt-8", "space-y-8")}
    >
      <H1 className={tw("flex-1", "text-center")}>{t`Airdrop`}</H1>
      <div className={tw("flex", "space-x-12")}>
        <Card variant={CardVariant.GRADIENT} className={tw("flex", "flex-col")}>
          <div>{t`Introducing $ELFI`}</div>
          <H2>{t`Advocate for the future of fixed rates.`}</H2>
          <div>
            {t`If you were an early participant in 
Element, you maybe have been awarded 
some $ELFI.  Learn more about our 
distribution 

Connect your wallet to see if you have 
any tokens available to claim!`}
          </div>
        </Card>
      </div>
    </div>
  );
}
