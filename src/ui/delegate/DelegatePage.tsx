import React, { ReactElement, useCallback, useState } from "react";

import { useWeb3React } from "@web3-react/core";
import { Signer } from "ethers";
import { formatEther } from "ethers/lib/utils";
import { isValidAddress } from "src/base/isValidAddress";
import tw from "src/elf-tailwindcss-classnames";
import { formatWalletAddress } from "src/formatWalletAddress";
import Button from "src/ui/base/Button/Button";
import H2 from "src/ui/base/H2";
import H3 from "src/ui/base/H3";
import TextInput from "src/ui/base/Input/TextInput";
import GradientCard from "src/ui/base/Card/GradientCard";
import { useChangeDelegation } from "src/ui/contracts/useChangeDelegation";
import { useDeposits } from "src/ui/contracts/useDeposits";
import { ConnectWalletButton } from "src/ui/wallet/ConnectWalletButton/ConnectWalletButton";
import { jt, t } from "ttag";
import FeaturedDelegatesTable from "src/ui/overview/FeaturedDelegatesTable";
import { ButtonVariant } from "src/ui/base/Button/styles";

export default function DelegatePage(): ReactElement {
  const { account, library } = useWeb3React();
  const signer = account ? (library?.getSigner(account) as Signer) : undefined;

  return (
    <div className={tw("flex", "h-full", "py-8")}>
      <div
        className={tw(
          "w-full",
          "gap-6",
          "flex",
          "flex-col",
          "lg:flex-row",
          "items-center"
        )}
      >
        {/* Portfolio & Delegate Card */}
        <GradientCard
          className={tw(
            "w-full",
            "lg:w-4/12",
            "h-full",
            "rounded-xl",
            "shadow"
          )}
        >
          <div className={tw("w-full", "p-4")}>
            <H2 className={tw("mb-4", "text-white")}>{t`Delegate`}</H2>
            <DelegateSection account={account} signer={signer} />
          </div>
          <div className={tw("w-full", "p-4")}>
            <H2 className={tw("mb-4", "text-white")}>{t`Portfolio`}</H2>
            <PortfolioSection />
          </div>
        </GradientCard>

        {/* Delegate Leaderboard & Delegate Search */}
        <div
          className={tw(
            "w-full",
            "lg:w-8/12",
            "bg-white",
            "rounded-xl",
            "shadow",
            "p-4"
          )}
        >
          <H2
            className={tw("mb-4", "text-brandDarkBlue-dark")}
          >{t`Delegate Leaderboard`}</H2>
          <FeaturedDelegatesTable />
        </div>
      </div>
    </div>
  );
}

interface PortfolioSectionProps {}

function PortfolioSection(props: PortfolioSectionProps) {
  return <div className={tw("text-white")}>Portfolio Section</div>;
}
interface DelegationSectionProps {
  account: string | null | undefined;
  signer: Signer | undefined;
}

function DelegateSection({ account, signer }: DelegationSectionProps) {
  const { data: [delegateAddressOnChain, amountDelegated] = [] } =
    useDeposits(account);

  const { mutate: changeDelegation } = useChangeDelegation(signer);

  const [delegateAddressInput, setDelegateAddressInput] = useState<
    string | undefined
  >();
  const onDelegateClick = useCallback(() => {
    if (delegateAddressInput && isValidAddress(delegateAddressInput)) {
      changeDelegation([delegateAddressInput]);
    }
  }, [changeDelegation, delegateAddressInput]);

  const walletLink = (
    <a
      className={tw("font-semibold", "text-brandDarkBlue", "hover:underline")}
      key="delegate-lnik"
      href={`https://etherscan.io/address/${delegateAddressOnChain}`}
    >
      {formatWalletAddress(delegateAddressOnChain || "")}
    </a>
  );
  return (
    <>
      <H3 className={tw("flex-1", "text-white")}>{t`Delegate Your Vote`}</H3>
      <div className={tw("flex", "justify-between", "text-sm", "text-white")}>
        <span className={tw("font-semibold")}>{t`Current voting status:`}</span>
        <span>
          {delegateAddressOnChain
            ? jt`Delegated to ${walletLink}`
            : t`Not delegated`}
        </span>
      </div>
      <div className={tw("flex", "justify-between", "text-sm", "text-white")}>
        <span
          className={tw("text-white", "font-semibold")}
        >{t`Amount delegated:`}</span>
        <span>{amountDelegated ? formatEther(amountDelegated) : "-"}</span>
      </div>
      <TextInput
        screenReaderLabel={t`Insert Delegate Address`}
        id={"delegate-address"}
        name={t`Insert Delegate Address`}
        placeholder={t`Insert Delegate Address`}
        className={tw("mb-8", "h-12", "text-center")}
        value={delegateAddressInput}
        onChange={(event) => setDelegateAddressInput(event.target.value)}
      />
      <div className={tw("text-center")}>
        {account ? (
          <Button onClick={onDelegateClick}>{t`Delegate Vote`}</Button>
        ) : (
          <ConnectWalletButton
            label={t`Connect your wallet to delegate your vote`}
            variant={ButtonVariant.WHITE}
          />
        )}
      </div>
    </>
  );
}
