import { ReactElement, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { Signer } from "ethers";
import { Delegate } from "src/elf-council-delegates/delegates";
import tw, {
  display,
  flexDirection,
  alignItems,
  height,
  width,
  padding,
  borderRadius,
  fontWeight,
  boxShadow,
  margin,
  textColor,
  justifyContent,
  fontSize,
  letterSpacing,
  textAlign,
  backgroundColor,
  maxWidth,
  lineHeight,
  position,
  inset,
} from "src/elf-tailwindcss-classnames";
import H2 from "src/ui/base/H2";
import PortfolioCard from "src/ui/delegate/PortfolioCard/PortfolioCard";
import DelegateCard from "src/ui/delegate/DelegateCard/DelegateCard";
import { t } from "ttag";
import DelegatesList from "./DelegatesList/DelegatesList";
import GradientCard from "src/ui/base/Card/GradientCard";
import { elementTokenContract } from "src/elf/contracts";
import { useTokenBalanceOf } from "src/elf/token/useTokenBalanceOf";
import { ShieldExclamationIcon, SparklesIcon } from "@heroicons/react/solid";
import { formatEther } from "ethers/lib/utils";
import { useDeposits } from "src/ui/contracts/useDeposits";

export default function DelegatePage(): ReactElement {
  const { account, library } = useWeb3React();
  const signer = account ? (library?.getSigner(account) as Signer) : undefined;

  const [currentDelegate, setCurrentDelegate] = useState<
    Delegate | undefined
  >();

  const { data: walletBalanceBN } = useTokenBalanceOf(
    elementTokenContract,
    account,
  );
  const walletBalance = formatEther(walletBalanceBN || 0);

  const { data: [, vaultBalanceBN] = [] } = useDeposits(account);
  const vaultBalance = formatEther(vaultBalanceBN || 0);

  const showWarning =
    !account || (parseInt(walletBalance) > 0 && parseInt(vaultBalance) === 0);

  return (
    <div
      className={tw(
        display("flex"),
        flexDirection("flex-col"),
        alignItems("items-center"),
        padding("pb-8", { "pt-16": !showWarning }),
      )}
    >
      {/* Warning Card */}
      {showWarning ? (
        <div
          className={tw(
            display("flex"),
            flexDirection("flex-col", "xl:flex-row"),
            justifyContent("xl:justify-center"),
            margin("mb-4"),
            maxWidth("max-w-7xl"),
            width("w-full"),
          )}
        >
          <div
            className={tw(
              display("flex"),
              alignItems("items-center"),
              height("h-12"),
              width("xl:w-4/12"),
              margin("mr-16"),
              backgroundColor("bg-goldYellow"),
              borderRadius("rounded-md"),
              padding("px-6"),
              textColor("text-white"),
              lineHeight("leading-4"),
              fontWeight("font-bold"),
              fontSize("text-sm"),
            )}
          >
            {!account ? <NoConnection /> : <NoDeposit />}
          </div>

          {/***
           * This is just a empty placeholder to match the width of its
           * counterpart container: delegates list. Matches the '8/12' width.
           * Helps keep warning label flush with the main content of the page,
           * i.e. the PortfolioCard & DelegateList + DelegateCard, due to the
           * 'justify-center' attribute on the main content, which makes it hard
           * to keep things flush and responsive.
           */}
          <div className={tw(width("xl:w-8/12"))} />
        </div>
      ) : null}

      <div
        className={tw(
          display("flex"),
          flexDirection("flex-col", "xl:flex-row"),
          justifyContent("xl:justify-center"),
          maxWidth("max-w-7xl"),
        )}
      >
        {/* Portfolio Card */}
        <GradientCard
          className={tw(
            display("flex"),
            flexDirection("flex-col", "lg:flex-row", "xl:flex-col"),
            width("xl:w-4/12"),
            height("h-full"),
            borderRadius("rounded-xl"),
            boxShadow("shadow"),
            margin("mr-16"),
          )}
        >
          <div className={tw(padding("px-6", "py-7"))}>
            <H2
              className={tw(
                margin("mb-4"),
                textColor("text-white"),
                fontSize("text-2xl"),
                letterSpacing("tracking-wide"),
              )}
            >{t`Portfolio`}</H2>
            <PortfolioCard
              account={account}
              signer={signer}
              currentDelegate={currentDelegate}
              walletBalance={walletBalance}
              vaultBalance={vaultBalance}
            />
          </div>
        </GradientCard>
        {/* Delegates */}
        <div
          className={tw(
            display("flex"),
            flexDirection("flex-col"),
            width("xl:w-8/12"),
          )}
        >
          {/* Delegates List */}
          <DelegatesList />

          {/* Delegate Card */}
          <div
            className={tw(
              padding("px-6", "py-7"),
              margin("mt-auto"),
              borderRadius("rounded-xl"),
              backgroundColor("bg-principalRoyalBlue"),
            )}
          >
            <H2
              className={tw(
                margin("mb-4"),
                textColor("text-white"),
                fontSize("text-2xl"),
                letterSpacing("tracking-wide"),
              )}
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
    <p className={tw(textAlign("text-left"))}>
      <div>{t`Unable to determine delegation eligibility`}</div>
      <div>
        {t`Please connect your wallet`}
        <ShieldExclamationIcon
          className={tw(
            position("relative"),
            inset("bottom-0.5"),
            display("inline-block"),
            height("h-4"),
            margin("ml-2"),
          )}
        />
      </div>
    </p>
  );
}

function NoDeposit(): ReactElement {
  return (
    <p className={tw(textAlign("text-left"))}>
      <div>
        {t`Please ensure you deposit your tokens to earn your delegating power`}
        <SparklesIcon
          className={tw(
            position("relative"),
            inset("bottom-0.5"),
            display("inline-block"),
            height("h-4"),
            margin("ml-2"),
          )}
        />
      </div>
    </p>
  );
}
