import { useWeb3React } from "@web3-react/core";
import classNames from "classnames";
import React, { Fragment, ReactElement, ReactNode } from "react";
import { addressesJson } from "src/elf-council-addresses";
import { ChainId, ChainNames } from "src/ethereum";
import Footer from "src/ui/app/Footer";
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
  showHeader?: boolean;
  showFooter?: boolean;
}

export default function PageView(props: PageViewProps): ReactElement {
  const {
    children,
    showSidebar = true,
    showHeader = true,
    showFooter = false,
    childrenContainerClassName,
  } = props;
  const { chainId } = useWeb3React();
  const isWrongChain = !!chainId && chainId !== addressesJson.chainId;
  return (
    <Fragment>
      <div
        className={classNames(
          "flex w-full h-full bg-appBackgroundLight justify-between",
          {
            "md:pl-60": showSidebar,
          },
        )}
      >
        {showSidebar ? <Sidebar /> : null}
        <div className="w-full h-full p-6 flex flex-col flex-1 items-center">
          {showHeader ? <Header /> : null}

          <div
            className={classNames(
              "mt-6 w-full h-full flex-1",
              childrenContainerClassName,
            )}
          >
            {children}
          </div>
          {showFooter ? <Footer /> : null}
        </div>
      </div>
      <SimpleDialog isOpen={isWrongChain}>
        <div className="text-center">
          <H3>{t`Please connect to ${
            ChainNames[addressesJson.chainId as ChainId]
          }`}</H3>
          <span>{t`Chain ID: ${addressesJson.chainId}`}</span>
        </div>
      </SimpleDialog>
    </Fragment>
  );
}
