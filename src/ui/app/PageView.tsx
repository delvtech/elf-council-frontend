import { useWeb3React } from "@web3-react/core";
import classNames from "classnames";
import React, { Fragment, ReactElement, ReactNode } from "react";
import { addressesJson } from "src/elf-council-addresses";
import tw from "src/elf-tailwindcss-classnames";
import { ChainId, ChainNames } from "src/ethereum";
import Header from "src/ui/app/Header";
import Sidebar from "src/ui/app/Sidebar";
import SimpleDialog from "src/ui/base/Dialog/Dialog";
import H3 from "src/ui/base/H3";
import { t } from "ttag";

interface PageViewProps {
  children?: ReactNode;
  childrenContainerClassName?: string;
  /**
   * Whether or not the sidebar navigation should be shown, defaults to true
   */
  showSidebar?: boolean;
}

export default function PageView(props: PageViewProps): ReactElement {
  const { children, showSidebar = true, childrenContainerClassName } = props;
  const { chainId } = useWeb3React();
  const isWrongChain = !!chainId && chainId !== addressesJson.chainId;
  return (
    <Fragment>
      <div
        className={tw(
          "w-full",
          "h-full",
          {
            "md:pl-60": showSidebar,
            "xl:pl-80": showSidebar,
          },
          "overflow-hidden"
        )}
      >
        {showSidebar ? <Sidebar /> : null}
        <div
          className={tw(
            "w-full",
            "h-full",
            "p-6",
            "flex",
            "flex-col",
            "flex-1",
            "overflow-auto",
            "items-center"
          )}
        >
          <Header />
          <div
            className={classNames(
              tw("max-w-6xl", "mt-6", "h-full"),
              childrenContainerClassName
            )}
          >
            {children}
          </div>
        </div>
      </div>
      <SimpleDialog isOpen={isWrongChain}>
        <div className={tw("text-center")}>
          <H3>{t`Please connect to ${
            ChainNames[addressesJson.chainId as ChainId]
          }`}</H3>
          <span>{t`Chain ID: ${addressesJson.chainId}`}</span>
        </div>
      </SimpleDialog>
    </Fragment>
  );
}
