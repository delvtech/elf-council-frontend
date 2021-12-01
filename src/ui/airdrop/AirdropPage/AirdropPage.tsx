import { useWeb3React } from "@web3-react/core";
import React, { ReactElement } from "react";
import tw from "src/elf-tailwindcss-classnames";
import Card from "src/ui/base/Card/Card";
import H1 from "src/ui/base/H1";
import { t } from "ttag";

export default function AirdropPage(): ReactElement {
  const { account, library } = useWeb3React();

  return (
    <div className={tw("h-full", "pt-8", "px-8", "space-y-8")}>
      <H1 className={tw("flex-1", "text-center")}>{t`Airdrop`}</H1>
      <div className={tw("flex", "space-x-12")}>
        <Card>Airdrop</Card>
      </div>
    </div>
  );
}
