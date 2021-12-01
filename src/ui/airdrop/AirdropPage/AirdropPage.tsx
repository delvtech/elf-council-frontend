import { useWeb3React } from "@web3-react/core";
import React, { ReactElement } from "react";
import tw from "src/elf-tailwindcss-classnames";
import Button from "src/ui/base/Button/Button";
import Card from "src/ui/base/Card/Card";
import Steps from "src/ui/base/Card/Steps/Steps";
import H1 from "src/ui/base/H1";
import { t } from "ttag";
import { ConnectWalletStepCard } from "./ConnectWalletStepCard";

export default function AirdropPage(): ReactElement {
  const { account, library } = useWeb3React();

  return (
    <div className={tw("flex", "flex-col", "h-full", "pt-8", "space-y-8")}>
      <H1
        className={tw("flex-1", "text-center")}
      >{t`Element Finance Token Airdrop`}</H1>
      <div className={tw("flex", "space-x-12", "flex-shrink-0")}>
        <Card className={tw("flex", "flex-col", "text-white", "w-96")}>
          <div
            className={tw(
              "text-xl",
              "font-bold",
              "text-principalRoyalBlue",
              "text-center"
            )}
          >{t`Claim your ELFI in 3 steps.`}</div>
          <Steps
            steps={[
              {
                name: "Connect wallet",
                status: account ? "complete" : "current",
                onClick: () => {},
              },
              {
                name: "View airdrop",
                status: account ? "current" : "upcoming",
                onClick: () => {},
              },
              {
                name: "Claim and delegate",
                status: "upcoming",
                onClick: () => {},
              },
            ]}
          />
        </Card>

        <ConnectWalletStepCard />
      </div>
    </div>
  );
}
