import Image from "next/image";
import React, { ReactElement } from "react";
import Button from "src/ui/base/Button/Button";
import { ButtonVariant } from "src/ui/base/Button/styles";
import GradientCard from "src/ui/base/Card/GradientCard";
import { Label } from "src/ui/base/Label/Label";
import tw from "src/elf-tailwindcss-classnames";
import { t } from "ttag";
import { formatEther } from "ethers/lib/utils";
import { useElementTokenBalanceOf } from "src/ui/contracts/useElementTokenBalance";
import { useWeb3React } from "@web3-react/core";

interface RewardsPageProps {}

export function RewardsPage(props: RewardsPageProps): ReactElement {
  const { account } = useWeb3React();
  const { data: balanceOf } = useElementTokenBalanceOf(account);
  const formattedBalance = balanceOf ? formatEther(balanceOf) : "-";
  return (
    <div
      className={tw(
        "flex",
        "h-full",
        "flex-shrink-0",
        "items-center",
        "justify-center"
      )}
    >
      <GradientCard className={tw("text-white", "w-96", "flex-col", "flex")}>
        <div
          className={tw(
            "flex-col",
            "w-full",
            "flex",
            "items-center",
            "text-center"
          )}
        >
          <div className={tw("p-4", "text-xl")}>{t`Your ELF Balance`}</div>
          <div className="w-full border-t border-gray-300" />
        </div>

        <div
          className={tw(
            "flex-col",
            "w-full",
            "flex",
            "items-center",
            "text-center",
            "pt-4",
            "px-8",
            "pb-8",
            "gap-4"
          )}
        >
          <Image
            height={84}
            width={84}
            src="/assets/ElementLogo--light.svg"
            alt={t`Element logo`}
          />
          <div className={tw("flex", "flex-col")}>
            <span className={tw("text-3xl", "mb-4")}>150.00</span>
            <Label
              className={tw("text-center", "px-12")}
            >{t`You have ELF ready to claim from the Element LP Program.`}</Label>
          </div>
          <Label>{t`People who provide liquidity to eligible investment pools or trade on eligible token pairs receive weekly $ELF distributions as incentives. $ELF token holders help foster the Element Protocol can shape its future by voting and engaging with our governance.`}</Label>
          <div className={tw("grid", "grid-cols-2", "w-full", "px-4")}>
            <Label className={tw("text-left")}>{t`Balance:`}</Label>
            <Label className={tw("text-right")}>{formattedBalance}</Label>
          </div>
          <div className={tw("grid", "grid-cols-2", "w-full", "px-4")}>
            <Label className={tw("text-left")}>{t`Unclaimed:`}</Label>
            <Label className={tw("text-right")}>{t`150.00000`}</Label>
          </div>
          <Label small>{t`Go to Dashboard Overview`}</Label>
          <div className={tw("flex", "gap-4")}>
            <Button
              round
              variant={ButtonVariant.OUTLINE_WHITE}
            >{t`Withdraw`}</Button>
            <Button
              round
              variant={ButtonVariant.WHITE}
            >{t`Claim & Deposit`}</Button>
          </div>
        </div>
      </GradientCard>
    </div>
  );
}
