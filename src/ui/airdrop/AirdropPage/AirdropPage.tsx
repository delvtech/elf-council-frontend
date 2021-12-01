import { useWeb3React } from "@web3-react/core";
import React, { ReactElement } from "react";
import tw from "src/elf-tailwindcss-classnames";
import Button from "src/ui/base/Button/Button";
import { ButtonVariant } from "src/ui/base/Button/styles";
import Card, { CardVariant } from "src/ui/base/Card/Card";
import H1 from "src/ui/base/H1";
import { t } from "ttag";

export default function AirdropPage(): ReactElement {
  const { account, library } = useWeb3React();

  return (
    <div
      style={{ width: 500 }}
      className={tw("flex", "flex-col", "h-full", "pt-8", "space-y-8")}
    >
      <H1
        className={tw("flex-1", "text-center")}
      >{t`Element Council Token Airdrop`}</H1>
      <div className={tw("flex", "space-x-12")}>
        <Card
          variant={CardVariant.BLUE}
          className={tw(
            "flex",
            "flex-col",
            "text-white",
            "space-y-5",
            "text-center"
          )}
        >
          <div
            className={tw(
              "text-center",
              "font-semibold",
              "tracking-wider",
              "text-sm"
            )}
          >{t`Introducing $ELFI`}</div>
          <div
            className={tw("text-2xl", "font-bold", "text-white")}
          >{t`Advocate for the future of fixed rates.`}</div>
          <div className={tw("text-sm", "space-y-4", "text-justify", "px-4")}>
            <p>
              {t`If you were an early participant in Element, you maybe have been awarded some $ELFI.`}{" "}
              <a
                href="https://ADD_LINK_HERE"
                className={tw("text-goldYellow", "hover:underline")}
              >{t`Learn more about our distribution.`}</a>
            </p>
            <p>{t`Connect your wallet to see if you have any tokens available to claim!`}</p>
          </div>
          <div className={tw("flex", "justify-end", "w-full")}>
            <Button
              variant={ButtonVariant.OUTLINE_WHITE}
            >{t`Get started`}</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
