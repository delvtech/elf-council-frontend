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
  boxShadow,
  margin,
  textColor,
  justifyContent,
  fontSize,
  letterSpacing,
  maxHeight,
  backgroundColor,
} from "src/elf-tailwindcss-classnames";
import H1 from "src/ui/base/H1";
import H2 from "src/ui/base/H2";
import PortfolioCard from "src/ui/delegate/PortfolioCard/PortfolioCard";
import DelegateCard from "src/ui/delegate/DelegateCard/DelegateCard";
import { t } from "ttag";
import DelegatesList from "./DelegatesList/DelegatesList";
import GradientCard from "src/ui/base/Card/GradientCard";

export default function DelegatePage(): ReactElement {
  const { account, library } = useWeb3React();
  const signer = account ? (library?.getSigner(account) as Signer) : undefined;

  const [currentDelegate, setCurrentDelegate] = useState<
    Delegate | undefined
  >();

  return (
    <div
      className={tw(
        display("flex"),
        flexDirection("flex-col"),
        alignItems("items-start"),
      )}
    >
      <div
        className={tw(
          display("flex"),
          height("h-full"),
          width("w-full"),
          padding("py-8"),
        )}
      >
        <div
          className={tw(
            width("w-full"),
            display("flex"),
            flexDirection("flex-col", "xl:flex-row"),
            justifyContent("justify-center"),
          )}
        >
          {/* Portfolio Card */}
          <GradientCard
            className={tw(
              display("flex"),
              width("w-full", "xl:w-4/12"),
              flexDirection("flex-col", "lg:flex-row", "xl:flex-col"),
              height("h-full"),
              borderRadius("rounded-xl"),
              boxShadow("shadow"),
              margin("mr-8"),
            )}
          >
            <div className={tw(width("w-full"), padding("px-6", "py-7"))}>
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
              />
            </div>
          </GradientCard>

          {/* Delegates */}
          <div
            className={tw(
              display("flex"),
              flexDirection("flex-col"),
              maxHeight("max-h-full"),
              width("xl:w-7/12"),
            )}
          >
            {/* Delegates List */}
            <div>
              <H2
                className={tw(
                  margin("mb-4"),
                  fontSize("text-2xl"),
                  textColor("text-principalRoyalBlue"),
                  letterSpacing("tracking-wide"),
                )}
              >{t`Explore Featured Delegates`}</H2>
              <DelegatesList />
            </div>

            {/* Delegate Card */}
            <div
              className={tw(
                width("w-full"),
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
    </div>
  );
}
