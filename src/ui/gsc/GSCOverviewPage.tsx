import React, { ReactElement } from "react";

import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import Head from "next/head";
import { t } from "ttag";

import { Delegate } from "src/elf-council-delegates/delegates";
import { defaultProvider } from "src/elf/providers/providers";
import Button from "src/ui/base/Button/Button";
import { ButtonVariant } from "src/ui/base/Button/styles";
import H1 from "src/ui/base/H1/H1";
import H2 from "src/ui/base/H2/H2";
import { Intent } from "src/ui/base/Intent";
import { Tag } from "src/ui/base/Tag/Tag";
import DelegateProfileRow from "src/ui/delegate/DelegatesList/DelegateProfileRow";
import { GSCMemberProfileRow } from "src/ui/gsc/GSCMemberProfileRow";
import { useGSCMembers } from "./useGSCMembers";

const provider = defaultProvider;

const delegates: Delegate[] = [
  { address: ethers.Wallet.createRandom().address },
  { address: ethers.Wallet.createRandom().address },
  { address: ethers.Wallet.createRandom().address },
  { address: ethers.Wallet.createRandom().address },
  { address: ethers.Wallet.createRandom().address },
];

export function GSCOverviewPage(): ReactElement {
  const { account } = useWeb3React<Web3Provider>();
  const selectedDelegate = delegates[0].address;
  const delegateAddressOnChain = delegates[0].address;

  const members = useGSCMembers();

  return (
    <div className="w-full space-y-6 xl:max-w-[1024px]">
      <Head>
        <title>{t`GSCOverview | Element Council Protocol`}</title>
      </Head>

      <H1 className="text-center text-principalRoyalBlue">
        {t`Governance GSC Overview`}
      </H1>

      <div className="w-full flex-col justify-center space-y-6">
        {/* Members */}
        <H2 className="text-principalRoyalBlue">{t`Council Assembly`}</H2>
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
                    member.address === members[members.length - 1].address ? (
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

        {/* Candidates */}
        <H2 className="text-principalRoyalBlue">{t`Candidates`}</H2>
        <ul className="space-y-2">
          {delegates.map((delegate) => {
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
