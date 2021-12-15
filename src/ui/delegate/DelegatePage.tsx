import { ReactElement, useState } from "react";
<<<<<<< HEAD
import { useWeb3React } from "@web3-react/core";
import { Signer } from "ethers";
import { Delegate } from "src/elf-council-delegates/delegates";
import tw from "src/elf-tailwindcss-classnames";
import H1 from "src/ui/base/H1";
import H2 from "src/ui/base/H2";
import PortfolioCard from "src/ui/delegate/PortfolioCard/PortfolioCard";
import DelegateCard from "src/ui/delegate/DelegateCard/DelegateCard";
import { t } from "ttag";
import DelegatesList from "./DelegatesList/DelegatesList";
import GradientCard from 'src/ui/base/Card/GradientCard'
=======

import { useWeb3React } from "@web3-react/core";
import { Signer } from "ethers";

import { Delegate } from "src/elf-council-delegates/delegates";
import tw from "src/elf-tailwindcss-classnames";

import H1 from "src/ui/base/H1";
import H2 from "src/ui/base/H2";

import FeaturedDelegatesTable from "src/ui/overview/FeaturedDelegatesTable";
import PortfolioCard from "src/ui/delegate/PortfolioCard/PortfolioCard";
import DelegateCard from "src/ui/delegate/DelegateCard/DelegateCard";

import { t } from "ttag";
>>>>>>> main

export default function DelegatePage(): ReactElement {
  const { account, library } = useWeb3React();
  const signer = account ? (library?.getSigner(account) as Signer) : undefined;

  const [currentDelegate, setCurrentDelegate] = useState<
    Delegate | undefined
  >();
<<<<<<< HEAD

  return (
    <div className={tw("flex", "flex-col", "items-start")}>
      <H1 className={tw("flex-1", "text-center")}>{t`Delegate`}</H1>
      <div className={tw("flex", "h-full", "w-full", "py-8")}>
        <div
          className={tw(
            "w-full",
            "gap-6",
            "flex",
            "flex-col",
            "xl:flex-row",
            "items-start"
          )}
        >
          {/* Portfolio & Delegate Card */}
          <GradientCard
            className={tw(
              "flex",
              "w-full",
              "flex-col",
              "lg:flex-row",
              "xl:flex-col",
              "xl:w-4/12",
              "h-full",
              "rounded-xl",
              "shadow"
            )}
          >
            <div className={tw("w-full", "p-7", "xl:pb-0")}>
              <H2 className={tw("mb-4", "text-white")}>{t`Portfolio`}</H2>
              <DelegateCard
                account={account}
                signer={signer}
                currentDelegate={currentDelegate}
                setCurrentDelegate={setCurrentDelegate}
              />
            </div>
            <div className={tw("w-full", "p-7", "xl:pt-4")}>
              <PortfolioCard
                account={account}
                signer={signer}
                currentDelegate={currentDelegate}
              />
            </div>
          </GradientCard>

          {/* Delegate Leaderboard */}
          <div className={tw("w-full", "xl:w-9/12", "p-4")}>
            <H2
              className={tw("mb-4", "text-brandDarkBlue-dark")}
            >{t`Explore Featured Delegates`}</H2>
            <DelegatesList />
=======

  return (
    <div className={tw("flex", "flex-col", "items-start")}>
      <H1 className={tw("flex-1", "text-center")}>{t`Delegate`}</H1>
      <div className={tw("flex", "h-full", "w-full", "py-8")}>
        <div
          className={tw(
            "w-full",
            "gap-6",
            "flex",
            "flex-col",
            "xl:flex-row",
            "items-start"
          )}
        >
          {/* Portfolio & Delegate Card */}
          <div
            className={tw(
              "bg-gradient-to-br",
              "from-principalRoyalBlue",
              "via-principalRoyalBlue",
              "to-principalBlue",
              "flex",
              "w-full",
              "flex-col",
              "lg:flex-row",
              "xl:flex-col",
              "xl:w-4/12",
              "h-full",
              "rounded-xl",
              "shadow"
            )}
          >
            <div className={tw("w-full", "p-7", "xl:pb-0")}>
              <H2 className={tw("mb-4", "text-white")}>{t`Portfolio`}</H2>
              <DelegateCard
                account={account}
                signer={signer}
                currentDelegate={currentDelegate}
                setCurrentDelegate={setCurrentDelegate}
              />
            </div>
            {account ? (
              <div className={tw("w-full", "p-7", "xl:pt-4")}>
                <PortfolioCard
                  account={account}
                  signer={signer}
                  currentDelegate={currentDelegate}
                />
              </div>
            ) : null}
          </div>

          {/* Delegate Leaderboard & Delegate Search */}
          <div
            className={tw(
              "w-full",
              "xl:w-9/12",
              "bg-white",
              "rounded-xl",
              "shadow",
              "p-4"
            )}
          >
            <H2
              className={tw("mb-4", "text-brandDarkBlue-dark")}
            >{t`Delegate Leaderboard`}</H2>
            <FeaturedDelegatesTable search />
>>>>>>> main
          </div>
        </div>
      </div>
    </div>
  );
}
