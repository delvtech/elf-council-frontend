import React, { ReactElement } from "react";

import Head from "next/head";
import { Web3Provider } from "@ethersproject/providers";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { useWeb3React } from "@web3-react/core";
import classNames from "classnames";
import { jt, t } from "ttag";

import ElementUrls from "src/elf/urls";
import Card from "src/ui/base/Card/Card";
import H1 from "src/ui/base/H1/H1";
import ExternalLink from "src/ui/base/ExternalLink/ExternalLink";
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
      <Head>
        <title>{t`Overview | Element Council Protocol`}</title>
        <link rel="icon" href="/gov-favicon.ico" />
      </Head>

      <div className="px-8 py-1">
        <H1 className="text-center text-principalRoyalBlue">
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

const faqDocsLink = (
  <ExternalLink
    key="faq-docs-link"
    href={ElementUrls.DOCS}
    className="inline-flex !gap-1"
  >{t`Council's Docs.`}</ExternalLink>
);

function FAQ() {
  return (
    <Card className="w-full shadow-md xl:max-w-[512px]">
      <span className="text-xl font-bold tracking-widest text-principalRoyalBlue">{t`FAQ`}</span>
      <div className="w-full pt-4">
        <div className="w-full rounded-2xl bg-white">
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
                <Disclosure.Panel className="flex flex-col gap-3 px-4 pt-4 pb-2 text-sm text-gray-500">
                  <p>{t`Council is an on-chain decentralized governance system through which a community can manage a DAO. It gives the community total flexibility over how to distribute Voting Power and allows it to adapt its governance system to the continuously evolving needs of the DAO.`}</p>
                  <p>{t`The system also includes the optional structure of a Governance Steering Council (GSC) with added governance powers and responsibilities, all to be decided upon by the community.`}</p>
                  <p>{jt`This flexibility is possible thanks to the use of Voting Vaults. Learn more in ${faqDocsLink}`}</p>
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
                <Disclosure.Panel className="flex flex-col gap-3 px-4 pt-4 pb-2 text-sm text-gray-500">
                  <p>{t`Voting vaults are smart contracts that allow any programmable logic to be used for allocating voting power to governance participants. Some example metrics include:`}</p>
                  <ul className="ml-7 flex list-disc flex-col gap-1">
                    <li className="list-item">{t`Reputation or merit-based systems`}</li>
                    <li>{t`User protocol usage metrics`}</li>
                    <li>{t`User governance participation data`}</li>
                    <li>{t`Token-holding`}</li>
                    <li>{t`Positions in DeFi protocols (staked assets, collateral, positions, etc.)`}</li>
                    <li>{t`Any other metric or combination of metrics`}</li>
                  </ul>
                  <p>{t`This gives the community complete modularity and flexibility over how to structure a DAO's governance framework, and provides a way for governance participants to keep their holdings' capital efficiency without sacrificing their voting power in the protocol.`}</p>
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
                <Disclosure.Panel className="flex flex-col gap-3 px-4 pt-4 pb-2 text-sm text-gray-500">
                  <p>{t`You can assign all of your Voting Power in the protocol to someone else, and they can vote on your behalf. This is called Delegation. It's important that you select a delegate who is aligned with your vision for how the protocol should evolve, as your votes would be counted towards their selection.`}</p>
                  <p>{t`This alleviates the issues of having to keep up with the multitude of discussions that happen surrounding the protocol, and having to interact with on-chain contracts for each decision that needs to be made. Reducing the governance load on each participant ultimately helps to reduce some of the friction and encourage higher levels of voter participation in governance decisions.`}</p>
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
                <Disclosure.Panel className="flex flex-col gap-3 px-4 pt-4 pb-2 text-sm text-gray-500">
                  <p>{t`The GSC is a group of delegates, each of whom has reached a pre-established threshold of delegated voting power, giving them additional governance powers within the system, and as a result, additional responsibilities.`}</p>
                  <p>{t`GSC members can have different special functions (propose votes directly on chain, spend a portion of treasury funds at their discretion, etc.), different responsibilities (DAO2DAO relationships, collaborations, treasury management, community engagement, etc.), and could be compensated for the time and effort that they dedicate to improving the protocol. All of these functions and responsibilities must be defined and ratified through the governance process.`}</p>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>
      </div>
    </Card>
  );
}
