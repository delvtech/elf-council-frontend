import React, { ReactElement } from "react";

import { Web3Provider } from "@ethersproject/providers";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { useWeb3React } from "@web3-react/core";
import classNames from "classnames";
import { t } from "ttag";

import Card from "src/ui/base/Card/Card";
import H1 from "src/ui/base/H1/H1";
import { PortfolioCard } from "src/ui/overview/PortfolioCard";

import { SummaryCards } from "./SummaryCards";
import { ProposalsJson } from "elf-council-proposals";
import ElfiverseBanner from "./ElfiverseBanner";

interface OverviewPageProps {
  proposalsJson: ProposalsJson;
  recentDelegators: string[];
}
export function OverviewPage({
  proposalsJson,
  recentDelegators,
}: OverviewPageProps): ReactElement {
  const { account, library } = useWeb3React<Web3Provider>();

  return (
    <div className="h-full w-full space-y-6 xl:max-w-[1024px]">
      <div className="px-8 py-1">
        <H1 className="text-center text-principalRoyalBlue">
          {" "}
          {t`Governance Overview`}
        </H1>
      </div>
      <SummaryCards proposalsJson={proposalsJson} />
      <div className="flex w-full grid-cols-2 flex-col justify-center space-y-6 xl:flex-row xl:space-x-6 xl:space-y-0">
        <div className="w-full">
          <PortfolioCard account={account} provider={library} />
        </div>
        <div className="flex w-full flex-col gap-4">
          <FAQ />
          <ElfiverseBanner
            account={account}
            recentDelegators={recentDelegators}
          />
        </div>
      </div>
    </div>
  );
}

export default OverviewPage;

function FAQ() {
  return (
    <Card className="w-full shadow-md xl:max-w-[512px]">
      <span className="text-xl font-bold tracking-widest text-principalRoyalBlue">{t`FAQ`}</span>
      <div className="w-full pt-4">
        <div className="mx-auto w-full max-w-md rounded-2xl bg-white">
          <Disclosure as="div" className="mt-2">
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between rounded-lg bg-hackerSky px-4 py-4 text-left text-sm font-medium text-principalRoyalBlue hover:bg-hackerSky-dark focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                  <span>{t`What is Element Council?`}</span>

                  <ChevronDownIcon
                    className={classNames(
                      open ? classNames("rotate-180 transform") : "",
                      "ml-2 h-5 w-5 transition duration-150 ease-in-out",
                    )}
                    aria-hidden="true"
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                  {t`The goal of vibrations is to plant the seeds of interconnectedness rather than pain. Energy is a constant.`}
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          <Disclosure as="div" className="mt-2">
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between rounded-lg bg-hackerSky px-4 py-4 text-left text-sm font-medium text-principalRoyalBlue hover:bg-hackerSky-dark focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                  <span>{t`How does delegated voting work?`}</span>
                  <ChevronDownIcon
                    className={classNames(
                      open ? classNames("rotate-180 transform") : "",
                      "ml-2 h-5 w-5 transition duration-150 ease-in-out",
                    )}
                    aria-hidden="true"
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                  Inspiration requires exploration. To traverse the circuit is
                  to become one with it.
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          <Disclosure as="div" className="mt-2">
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between rounded-lg bg-hackerSky px-4 py-4 text-left text-sm font-medium text-principalRoyalBlue hover:bg-hackerSky-dark focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                  <span>{t`Who are the GSC (Governance Steering Council)?`}</span>
                  <ChevronDownIcon
                    className={classNames(
                      open ? classNames("rotate-180 transform") : "",
                      "ml-2 h-5 w-5 transition duration-150 ease-in-out",
                    )}
                    aria-hidden="true"
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                  {t`To wander the vision quest is to become one with it. We exist as electromagnetic forces.`}
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          <Disclosure as="div" className="mt-2">
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between rounded-lg bg-hackerSky px-4 py-4 text-left text-sm font-medium text-principalRoyalBlue hover:bg-hackerSky-dark focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                  <span>{t`What is a voting vault?`}</span>
                  <ChevronDownIcon
                    className={classNames(
                      open ? classNames("rotate-180 transform") : "",
                      "ml-2 h-5 w-5 transition duration-150 ease-in-out",
                    )}
                    aria-hidden="true"
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                  The dreamscape is beaming with sub-atomic particles.
                  Aspiration is a constant.
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>
      </div>
    </Card>
  );
}
