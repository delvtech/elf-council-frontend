import React, { ReactElement, useState } from "react";

import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import Head from "next/head";
import { t } from "ttag";

import { defaultProvider } from "src/elf/providers/providers";
import Button from "src/ui/base/Button/Button";
import { ButtonVariant } from "src/ui/base/Button/styles";
import H1 from "src/ui/base/H1/H1";
import { Intent } from "src/ui/base/Intent";
import { Tag } from "src/ui/base/Tag/Tag";
import DelegateProfileRow from "src/ui/delegate/DelegatesList/DelegateProfileRow";
import { GSCMemberProfileRow } from "src/ui/gsc/GSCMemberProfileRow";
import { useGSCMembers } from "./useGSCMembers";
import { useGSCCandidates } from "./useCandidates";
import Card from "src/ui/base/Card/Card";
import Tabs, { Tab } from "src/ui/base/Tabs/Tabs";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import classNames from "classnames";

const provider = defaultProvider;
const NUM_CANDIDATES_TO_SHOW = 20;

enum TabOption {
  Overview,
  Current,
  Rising,
}

export function GSCOverviewPage(): ReactElement {
  const { account } = useWeb3React<Web3Provider>();

  const { data: members = [] } = useGSCMembers();
  console.log(members);
  const candidates = useGSCCandidates();
  const topTwentyCandidates = candidates.slice(0, NUM_CANDIDATES_TO_SHOW);

  // TODO: stubbed, get real delegate
  const selectedDelegate = candidates[0]?.address;
  const delegateAddressOnChain = candidates[0]?.address;

  const [currentTab, setCurrentTab] = useState<TabOption>(TabOption.Overview);

  const handleChangeTab = (opt: TabOption) => setCurrentTab(opt);

  return (
    <div className="w-full space-y-6 xl:max-w-[1024px]">
      <Head>
        <title>{t`GSCOverview | Element Council Protocol`}</title>
      </Head>

      <H1 className="text-center text-principalRoyalBlue">
        {t`Governance GSC Overview`}
      </H1>

      <Card className="max-w-2xl">
        <div className="w-full max-w-2xl flex-col justify-center space-y-6 ">
          {/* Nav buttons */}
          <div className="flex justify-center">
            <Tabs aria-label={t`Filter proposals`}>
              <Tab
                first
                current={currentTab === TabOption.Overview}
                onClick={() => handleChangeTab(TabOption.Overview)}
                name={t`Overview`}
              />
              <Tab
                current={currentTab === TabOption.Current}
                onClick={() => handleChangeTab(TabOption.Current)}
                name={t`Current Members`}
              />
              <Tab
                last
                current={currentTab === TabOption.Rising}
                onClick={() => handleChangeTab(TabOption.Rising)}
                name={t`Rising Members`}
              />
            </Tabs>
          </div>

          {currentTab === TabOption.Overview && (
            <div className="mt-4 flex flex-col space-y-10 overflow-y-scroll">
              <Disclosure as="div">
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex w-full justify-between rounded-lg bg-hackerSky px-4 py-4 text-left text-sm font-medium text-principalRoyalBlue hover:bg-hackerSky-dark focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                      <span>{t`What makes someone eligible to join the GSC?`}</span>

                      <ChevronDownIcon
                        className={classNames(
                          open ? classNames("rotate-180 transform") : "",
                          "ml-2 h-5 w-5 transition duration-150 ease-in-out",
                        )}
                        aria-hidden="true"
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="flex max-w-fit flex-col gap-3 px-4 pt-4 pb-2 text-sm text-gray-500">
                      <p>{t`Council is an on-chain decentralized governance system through which a community can manage a DAO. It gives the community total flexibility over how to distribute Voting Power and allows it to adapt its governance system to the continuously evolving needs of the DAO.`}</p>
                      <p>{t`The system also includes the optional structure of a Governance Steering Council (GSC) with added governance powers and responsibilities, all to be decided upon by the community.`}</p>
                      <p>{t`This flexibility is possible thanks to the use of Voting Vaults. Learn more in `}</p>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
              <Disclosure as="div" className="mt-4">
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex w-full justify-between rounded-lg bg-hackerSky px-4 py-4 text-left text-sm font-medium text-principalRoyalBlue hover:bg-hackerSky-dark focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                      <span>{t`What are the day-to-day responsibilities of a GSC member?`}</span>

                      <ChevronDownIcon
                        className={classNames(
                          open ? classNames("rotate-180 transform") : "",
                          "ml-2 h-5 w-5 transition duration-150 ease-in-out",
                        )}
                        aria-hidden="true"
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="flex max-w-fit flex-col gap-3 px-4 pt-4 pb-2 text-sm text-gray-500">
                      <p>{t`Council is an on-chain decentralized governance system through which a community can manage a DAO. It gives the community total flexibility over how to distribute Voting Power and allows it to adapt its governance system to the continuously evolving needs of the DAO.`}</p>
                      <p>{t`The system also includes the optional structure of a Governance Steering Council (GSC) with added governance powers and responsibilities, all to be decided upon by the community.`}</p>
                      <p>{t`This flexibility is possible thanks to the use of Voting Vaults. Learn more in `}</p>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
              <Disclosure as="div" className="mt-4">
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex w-full justify-between rounded-lg bg-hackerSky px-4 py-4 text-left text-sm font-medium text-principalRoyalBlue hover:bg-hackerSky-dark focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                      <span>{t`How are GSC members removed and/or added?`}</span>

                      <ChevronDownIcon
                        className={classNames(
                          open ? classNames("rotate-180 transform") : "",
                          "ml-2 h-5 w-5 transition duration-150 ease-in-out",
                        )}
                        aria-hidden="true"
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="flex max-w-fit flex-col gap-3 px-4 pt-4 pb-2 text-sm text-gray-500">
                      <p>{t`Council is an on-chain decentralized governance system through which a community can manage a DAO. It gives the community total flexibility over how to distribute Voting Power and allows it to adapt its governance system to the continuously evolving needs of the DAO.`}</p>
                      <p>{t`The system also includes the optional structure of a Governance Steering Council (GSC) with added governance powers and responsibilities, all to be decided upon by the community.`}</p>
                      <p>{t`This flexibility is possible thanks to the use of Voting Vaults. Learn more in `}</p>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            </div>
          )}

          {currentTab === TabOption.Current &&
            (members.length ? (
              <div className=" max-w-fit">
                <ul className="space-y-2">
                  {members.map((member) => {
                    const handleDelegation = () => {};

                    const currentlyDelegated = delegateAddressOnChain
                      ? member.address === delegateAddressOnChain
                      : false;

                    const selected = member.address === selectedDelegate;

                    return (
                      <li key={`${member.address}`}>
                        <GSCMemberProfileRow
                          selected={selected}
                          delegate={member}
                          kickButton={
                            // TODO: this is stubbed, add real logic
                            member.address ===
                            members[members.length - 1].address ? (
                              <Button
                                variant={ButtonVariant.DANGER}
                                className="w-full text-center"
                              >
                                <div className="flex w-full justify-center">{t`Kick`}</div>
                              </Button>
                            ) : undefined
                          }
                          delegateButton={
                            <ChangeDelegateButton
                              onDelegationClick={handleDelegation}
                              account={account}
                              isLoading={false}
                              isCurrentDelegate={currentlyDelegated}
                            />
                          }
                        />
                      </li>
                    );
                  })}
                </ul>
              </div>
            ) : (
              <div className="text-center font-bold text-principalRoyalBlue">{t`No current GSC members.`}</div>
            ))}

          {currentTab === TabOption.Rising && (
            <div className="h-96 max-w-fit overflow-y-scroll">
              <ul className="space-y-2">
                {topTwentyCandidates.map((delegate) => {
                  const handleDelegation = () => {};

                  const currentlyDelegated = delegateAddressOnChain
                    ? delegate.address === delegateAddressOnChain
                    : false;

                  const selected = delegate.address === selectedDelegate;

                  return (
                    <li key={`${delegate.address}`}>
                      <DelegateProfileRow
                        provider={provider}
                        selected={selected}
                        delegate={delegate}
                        actionButton={
                          <ChangeDelegateButton
                            onDelegationClick={handleDelegation}
                            account={account}
                            isLoading={false}
                            isCurrentDelegate={currentlyDelegated}
                          />
                        }
                        profileActionButton={
                          <ChangeDelegateButton
                            onDelegationClick={handleDelegation}
                            account={account}
                            isLoading={false}
                            isCurrentDelegate={currentlyDelegated}
                          />
                        }
                      />
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

interface ChangeDelegateButtonProps {
  onDelegationClick: () => void;
  account: string | null | undefined;
  isLoading: boolean;
  isCurrentDelegate: boolean;
}
function ChangeDelegateButton({
  onDelegationClick,
  account,
  isLoading,
  isCurrentDelegate,
}: ChangeDelegateButtonProps): ReactElement {
  if (isCurrentDelegate) {
    // !font-bold because Tag has font-medium which has cascade priority over font-bold
    return (
      <Tag
        intent={Intent.SUCCESS}
        className="block w-full text-center !font-bold shadow"
      >
        {t`Delegated`}
      </Tag>
    );
  }

  return (
    <Button
      onClick={onDelegationClick}
      variant={ButtonVariant.GRADIENT}
      disabled={!account || isLoading}
      className="w-full justify-center"
      loading={isLoading}
    >
      {t`Delegate`}
    </Button>
  );
}

export default GSCOverviewPage;
