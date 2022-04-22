import React, { ReactElement } from "react";

import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import classNames from "classnames";
import { ethers } from "ethers";
import Head from "next/head";
import { t } from "ttag";

import { defaultProvider } from "src/elf/providers/providers";
import Button from "src/ui/base/Button/Button";
import { ButtonVariant } from "src/ui/base/Button/styles";
import H1 from "src/ui/base/H1/H1";
import { Intent } from "src/ui/base/Intent";
import { Tag } from "src/ui/base/Tag/Tag";
import DelegateProfileRow from "src/ui/delegate/DelegatesList/DelegateProfileRow";
import { Delegate } from "src/elf-council-delegates/delegates";
import GSCMemberProfileRow from "src/ui/gsc/GSCMemberProfileRow";
import H2 from "src/ui/base/H2/H2";

const provider = defaultProvider;

const members: Delegate[] = [
  { address: ethers.Wallet.createRandom().address },
  { address: ethers.Wallet.createRandom().address },
  { address: ethers.Wallet.createRandom().address },
  { address: ethers.Wallet.createRandom().address },
  { address: ethers.Wallet.createRandom().address },
];
const delegates: Delegate[] = [
  { address: ethers.Wallet.createRandom().address },
  { address: ethers.Wallet.createRandom().address },
  { address: ethers.Wallet.createRandom().address },
  { address: ethers.Wallet.createRandom().address },
  { address: ethers.Wallet.createRandom().address },
];
interface GSCOverviewPageProps {}
export function GSCOverviewPage(
  unusedProps: GSCOverviewPageProps,
): ReactElement {
  const { account } = useWeb3React<Web3Provider>();
  const selectedDelegate = delegates[0].address;
  const delegateAddressOnChain = delegates[0].address;

  return (
    <div className="h-full w-full space-y-6 xl:max-w-[1024px]">
      <Head>
        <title>{t`GSCOverview | Element Council Protocol`}</title>
      </Head>

      <div className="px-8 py-1">
        <H1 className="text-center text-principalRoyalBlue">
          {t`Governance GSCOverview`}
        </H1>
      </div>
      <div className="flex w-full grid-cols-2 flex-col justify-center space-y-6 xl:flex-row xl:space-x-6 xl:space-y-0">
        <div className="flex w-full flex-col gap-6">
          <H2 className="text-principalRoyalBlue">{t`Council Assembly`}</H2>
          {/* Members */}
          <ul
            // 392px exactly matches 5 rows of the list
            className="flex h-[40vh] min-h-[392px] w-full flex-col gap-y-2 overflow-y-scroll pr-1"
          >
            {members.map((member, idx) => {
              const handleDelegation = () => {};

              const currentlyDelegated = delegateAddressOnChain
                ? member.address === delegateAddressOnChain
                : false;

              const selected = member.address === selectedDelegate;

              // TODO: Remove -${idx} for production since addresses are always unique
              return (
                <li className="w-full" key={`${member.address}-${idx}}`}>
                  <GSCMemberProfileRow
                    provider={provider}
                    selected={selected}
                    delegate={member}
                    kickButton={
                      member.address === members[4].address ? (
                        <Button className="w-full bg-red-500 text-center">
                          <div className="flex w-full justify-center">Kick</div>
                        </Button>
                      ) : undefined
                    }
                    delegateButton={
                      <ChangeDelegateButton
                        tagClassName="block"
                        buttonClassName="inline-flex"
                        onDelegationClick={handleDelegation}
                        account={account}
                        isLoading={false}
                        currentlyDelegated={currentlyDelegated}
                      />
                    }
                    profileActionButton={
                      <ChangeDelegateButton
                        buttonClassName="inline-flex"
                        onDelegationClick={handleDelegation}
                        account={account}
                        isLoading={false}
                        currentlyDelegated={currentlyDelegated}
                      />
                    }
                  />
                </li>
              );
            })}
          </ul>

          <H2 className="text-principalRoyalBlue">{t`Candidates`}</H2>
          {/* Delegates */}
          <ul
            // 392px exactly matches 5 rows of the list
            className="flex h-[40vh] min-h-[392px] w-full flex-col gap-y-2 overflow-y-scroll pr-1"
          >
            {delegates.map((delegate, idx) => {
              const handleDelegation = () => {};

              const currentlyDelegated = delegateAddressOnChain
                ? delegate.address === delegateAddressOnChain
                : false;

              const selected = delegate.address === selectedDelegate;

              // TODO: Remove -${idx} for production since addresses are always unique
              return (
                <li className="w-full" key={`${delegate.address}-${idx}}`}>
                  <DelegateProfileRow
                    provider={provider}
                    selected={selected}
                    delegate={delegate}
                    actionButton={
                      <ChangeDelegateButton
                        tagClassName="block"
                        buttonClassName="inline-flex"
                        onDelegationClick={handleDelegation}
                        account={account}
                        isLoading={false}
                        currentlyDelegated={currentlyDelegated}
                      />
                    }
                    profileActionButton={
                      <ChangeDelegateButton
                        buttonClassName="inline-flex"
                        onDelegationClick={handleDelegation}
                        account={account}
                        isLoading={false}
                        currentlyDelegated={currentlyDelegated}
                      />
                    }
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default GSCOverviewPage;

interface ChangeDelegateButtonProps {
  tagClassName?: string;
  buttonClassName?: string;
  onDelegationClick: () => void;
  account: string | null | undefined;
  isLoading: boolean;
  currentlyDelegated: boolean;
}
function ChangeDelegateButton({
  tagClassName = "",
  buttonClassName = "",
  onDelegationClick,
  account,
  isLoading,
  currentlyDelegated,
}: ChangeDelegateButtonProps): ReactElement {
  return (
    <React.Fragment>
      {currentlyDelegated ? (
        <Tag
          intent={Intent.SUCCESS}
          className={classNames(tagClassName, "w-full shadow")}
        >
          <div className="text-center text-base font-bold">{t`Delegated`}</div>
        </Tag>
      ) : (
        <Button
          onClick={onDelegationClick}
          variant={ButtonVariant.GRADIENT}
          disabled={!account || isLoading || currentlyDelegated}
          className={classNames(buttonClassName, "w-full justify-center")}
          loading={isLoading}
        >
          {t`Delegate`}
        </Button>
      )}
    </React.Fragment>
  );
}
