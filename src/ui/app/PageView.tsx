import { useWeb3React } from "@web3-react/core";
import classNames from "classnames";
import React, { Fragment, ReactElement, ReactNode } from "react";
import { addressesJson } from "src/elf-council-addresses";
import tw, {
  width,
  height,
  padding,
  overflow,
  display,
  flexDirection,
  flex,
  alignItems,
  margin,
  textAlign,
} from "src/elf-tailwindcss-classnames";
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
  showHeader?: boolean;
}

export default function PageView(props: PageViewProps): ReactElement {
  const {
    children,
    showSidebar = true,
    showHeader = true,
    childrenContainerClassName,
  } = props;
  const { chainId } = useWeb3React();
  const isWrongChain = !!chainId && chainId !== addressesJson.chainId;
  return (
    <Fragment>
      <div
        className={tw(
          width("w-full"),
          height("h-full"),
          overflow("overflow-hidden"),
          padding({ "md:pl-60": showSidebar }),
        )}
      >
        {showSidebar ? <Sidebar /> : null}
        <div
          className={tw(
            width("w-full"),
            height("h-full"),
            padding("p-6"),
            display("flex"),
            flexDirection("flex-col"),
            flex("flex-1"),
            overflow("overflow-auto"),
            alignItems("items-center"),
          )}
        >
          {showHeader ? <Header /> : null}

          <div
            className={classNames(
              tw(margin("mt-6"), width("w-full"), height("h-full")),
              childrenContainerClassName,
            )}
          >
            {children}
          </div>
        </div>
      </div>
      <SimpleDialog isOpen={isWrongChain}>
        <div className={tw(textAlign("text-center"))}>
          <H3>{t`Please connect to ${
            ChainNames[addressesJson.chainId as ChainId]
          }`}</H3>
          <span>{t`Chain ID: ${addressesJson.chainId}`}</span>
        </div>
      </SimpleDialog>
    </Fragment>
  );
}
