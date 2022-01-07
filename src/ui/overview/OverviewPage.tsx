import React, { ReactElement } from "react";

import { Web3Provider } from "@ethersproject/providers";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { useWeb3React } from "@web3-react/core";
import classNames from "classnames";
import { t } from "ttag";

import Card from "src/ui/base/Card/Card";
import H1 from "src/ui/base/H1";
import { PortfolioCard } from "src/ui/overview/PortfolioCard";

import { SummaryCards } from "./SummaryCards";

export function OverviewPage(): ReactElement {
  const { account } = useWeb3React<Web3Provider>();
  return (
    <div className="w-full h-full space-y-6 lg:max-w-[1024px]">
      <div className="px-8 py-1">
        <H1 className="text-center"> {t`Governance Overview`}</H1>
      </div>
      <SummaryCards />
      <div className="flex flex-col justify-center w-full space-y-6 lg:space-x-6 lg:flex-row lg:space-y-0">
        <PortfolioCard account={account} />
        <FAQ />
      </div>
    </div>
  );
}

export default OverviewPage;

function FAQ() {
  return (
    <Card className="w-full shadow-md lg:max-w-[512px]">
      <span className="text-xl font-bold tracking-widest text-principalRoyalBlue">{t`FAQ`}</span>
      <div className="w-full pt-4">
        <div className="w-full max-w-md mx-auto bg-white rounded-2xl">
          <Disclosure as="div" className="mt-2">
            {({ open }) => (
              <>
                <Disclosure.Button className="flex justify-between w-full px-4 py-4 text-sm font-medium text-left rounded-lg bg-hackerSky text-principalRoyalBlue hover:bg-hackerSky-dark focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                  <span>{t`What is your refund policy?`}</span>

                  <ChevronDownIcon
                    className={classNames(
                      open ? classNames("transform rotate-180") : "",
                      "ml-2 h-5 w-5 transition ease-in-out duration-150",
                    )}
                    aria-hidden="true"
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                  {t`If you're unhappy with your purchase for any reason, email us
                within 90 days and we'll refund you in full, no questions asked.`}
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          <Disclosure as="div" className="mt-2">
            {({ open }) => (
              <>
                <Disclosure.Button className="flex justify-between w-full px-4 py-4 text-sm font-medium text-left rounded-lg bg-hackerSky text-principalRoyalBlue hover:bg-hackerSky-dark focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                  <span>{t`Do you offer technical support?`}</span>
                  <ChevronDownIcon
                    className={classNames(
                      open ? classNames("transform rotate-180") : "",
                      "ml-2 h-5 w-5 transition ease-in-out duration-150",
                    )}
                    aria-hidden="true"
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                  No.
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          <Disclosure as="div" className="mt-2">
            {({ open }) => (
              <>
                <Disclosure.Button className="flex justify-between w-full px-4 py-4 text-sm font-medium text-left rounded-lg bg-hackerSky text-principalRoyalBlue hover:bg-hackerSky-dark focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                  <span>{t`What is your refund policy?`}</span>
                  <ChevronDownIcon
                    className={classNames(
                      open ? classNames("transform rotate-180") : "",
                      "ml-2 h-5 w-5 transition ease-in-out duration-150",
                    )}
                    aria-hidden="true"
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                  {t`If you're unhappy with your purchase for any reason, email us
                within 90 days and we'll refund you in full, no questions asked.`}
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          <Disclosure as="div" className="mt-2">
            {({ open }) => (
              <>
                <Disclosure.Button className="flex justify-between w-full px-4 py-4 text-sm font-medium text-left rounded-lg bg-hackerSky text-principalRoyalBlue hover:bg-hackerSky-dark focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                  <span>{t`Do you offer technical support?`}</span>
                  <ChevronDownIcon
                    className={classNames(
                      open ? classNames("transform rotate-180") : "",
                      "ml-2 h-5 w-5 transition ease-in-out duration-150",
                    )}
                    aria-hidden="true"
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                  No.
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>
      </div>
    </Card>
  );
}
