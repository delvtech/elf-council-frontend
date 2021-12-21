import { ReactElement, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { Signer } from "ethers";
import { Delegate } from "src/elf-council-delegates/delegates";
import tw from "src/elf-tailwindcss-classnames";
import H2 from "src/ui/base/H2";
import PortfolioCard from "src/ui/delegate/PortfolioCard/PortfolioCard";
import DelegateCard from "src/ui/delegate/DelegateCard/DelegateCard";
import { t } from "ttag";
import DelegatesList from "./DelegatesList/DelegatesList";
import GradientCard from "src/ui/base/Card/GradientCard";
import { ShieldExclamationIcon, SparklesIcon } from "@heroicons/react/solid";

export default function DelegatePage(): ReactElement {
  const { account, library } = useWeb3React();
  const signer = account ? (library?.getSigner(account) as Signer) : undefined;

  const [currentDelegate, setCurrentDelegate] = useState<
    Delegate | undefined
  >();

  const showWarning = !account || !currentDelegate;

  return (
    <div className={tw("mb-8", { "mt-16": !showWarning })}>
      {/* Warning Card */}
      {showWarning ? (
        <div
          className={tw(
            "flex",
            "flex-col",
            "xl:flex-row",
            "justify-center",
            "mb-4"
          )}
        >
          <div
            className={tw(
              "flex",
              "items-center",
              "h-12",
              "xl:w-4/12",
              "mr-8",
              "bg-goldYellow",
              "rounded-md",
              "px-6",
              "text-white",
              "leading-4",
              "font-bold",
              "text-sm"
            )}
          >
            {!account ? <NoConnection /> : <NoDelegate />}
          </div>
          <div className={tw("xl:w-7/12")}>{/* Empty on purpose */}</div>
        </div>
      ) : null}

      <div className={tw("flex", "flex-col", "xl:flex-row", "justify-center")}>
        {/* Portfolio Card */}
        <GradientCard
          className={tw(
            "flex",
            "flex-col",
            "lg:flex-row",
            "xl:flex-col",
            "xl:w-4/12",
            "h-full",
            "rounded-xl",
            "shadow",
            "mr-8"
          )}
        >
          <div className={tw("px-6", "py-7")}>
            <H2
              className={tw("mb-4", "text-white", "text-2xl", "tracking-wide")}
            >{t`Portfolio`}</H2>
            <PortfolioCard
              account={account}
              signer={signer}
              currentDelegate={currentDelegate}
            />
          </div>
        </GradientCard>

        {/* Delegates */}
        <div className={tw("flex", "flex-col", "xl:w-7/12")}>
          {/* Delegates List */}
          <div>
            <H2
              className={tw(
                "mb-4",
                "text-2xl",
                "text-principalRoyalBlue",
                "tracking-wide"
              )}
            >{t`Explore Featured Delegates`}</H2>
            <DelegatesList />
          </div>

          {/* Delegate Card */}
          <div
            className={tw(
              "px-6",
              "py-7",
              "mt-auto",
              "rounded-xl",
              "bg-principalRoyalBlue"
            )}
          >
            <H2
              className={tw("mb-4", "text-white", "text-2xl", "tracking-wide")}
            >{t`Delegate`}</H2>
            <DelegateCard
              account={account}
              signer={signer}
              currentDelegate={currentDelegate}
              setCurrentDelegate={setCurrentDelegate}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function NoConnection(): ReactElement {
  return (
    <p className={tw("text-left")}>
      <div>{t`Unable to determine delegation eligibility`}</div>
      <div>
        {t`Please connect your wallet`}
        <ShieldExclamationIcon
          className={tw(
            "relative",
            "bottom-0.5",
            "inline-block",
            "h-4",
            "ml-2"
          )}
        />
      </div>
    </p>
  );
}

function NoDelegate(): ReactElement {
  return (
    <p className={tw("text-left")}>
      <div>
        {t`Please ensure you deposit your tokens to earn your delegating power`}
        <SparklesIcon
          className={tw(
            "relative",
            "bottom-0.5",
            "inline-block",
            "h-4",
            "ml-2"
          )}
        />
      </div>
    </p>
  );
}
