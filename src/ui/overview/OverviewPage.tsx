import React, { ReactElement } from "react";

import Image from "next/image";
import { Web3Provider } from "@ethersproject/providers";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon, FireIcon } from "@heroicons/react/solid";
import { useWeb3React } from "@web3-react/core";
import classNames from "classnames";
import { t } from "ttag";

import Card from "src/ui/base/Card/Card";
import H1 from "src/ui/base/H1/H1";
import { PortfolioCard } from "src/ui/overview/PortfolioCard";

import { SummaryCards } from "./SummaryCards";
import { ProposalsJson } from "elf-council-proposals";
import { ButtonVariant } from "src/ui/base/Button/styles";
import Button from "src/ui/base/Button/Button";

interface OverviewPageProps {
  proposalsJson: ProposalsJson;
}
export function OverviewPage({
  proposalsJson,
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
          <ElfiverseBanner />
        </div>
      </div>
    </div>
  );
}

export default OverviewPage;

function ElfiverseBanner() {
  return (
    <Card className="flex w-full flex-col gap-4 shadow-md xl:max-w-[512px]">
      {/* Header */}
      <div className="flex">
        <div className="mt-2 flex w-3/4 flex-col gap-2">
          <span className="font-bold text-principalRoyalBlue">
            {t`Our first minting drop is now live`}
          </span>
          <p className="text-sm leading-6 text-[#979797]">
            {t`Delegate your voting power to yourself or others now to be eligible for minting your ELF NFT.`}
          </p>
        </div>

        <div className="ml-2 w-1/4">
          <div className="ml-auto w-[fit-content]">
            <Image
              src="/assets/overview-page/elfi-nft.png"
              width={100}
              height={100}
              alt="Elfi NFT"
              className="pointer-events-none"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 text-[#979797]">
        {/* Whitelist status */}
        <div className="flex w-[fit-content] items-center gap-2 rounded-lg p-4 shadow-[0_6px_23px_rgba(20,20,43,0.08)]">
          <span className="inline-block h-[15px] w-[15px] rounded-full bg-principalRoyalBlue"></span>
          <span className="text-sm">{t`Current whitelist status: Whitelisted`}</span>
        </div>

        {/* CTA / Button */}
        <div className="flex items-center gap-4 rounded-xl p-4 shadow-[0_6px_23px_rgba(20,20,43,0.08)]">
          <div className="grid h-[50px] w-[50px] shrink-0 place-items-center rounded-full bg-hackerSky">
            <FireIcon className="h-[28px] text-principalRoyalBlue" />
          </div>
          <span className="text-sm leading-4">{t`1,021 / 5000 ELF NFTs Whitelist Remaining`}</span>
          <Button
            className="ml-auto w-1/2 items-center justify-center"
            variant={ButtonVariant.GRADIENT}
          >
            {t`Visit ELF Website`}
          </Button>
        </div>
      </div>
    </Card>
  );
}

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
