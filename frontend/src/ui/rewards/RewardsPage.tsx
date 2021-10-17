import React, { ReactElement, useCallback } from "react";

import { useWeb3React } from "@web3-react/core";
import { formatEther, parseEther } from "ethers/lib/utils";
import Image from "next/image";
import tw from "src/elf-tailwindcss-classnames";
import { elementTokenContract, rewardsContract } from "src/elf/contracts";
import { useMerkleInfo } from "src/elf/merkle/useMerkleInfo";
import { useTokenBalanceOf } from "src/elf/token/useTokenBalanceOf";
import { useSmartContractReadCall } from "src/react-query-typechain/hooks/useSmartContractReadCall/useSmartContractReadCall";
import Button from "src/ui/base/Button/Button";
import { ButtonVariant } from "src/ui/base/Button/styles";
import GradientCard from "src/ui/base/Card/GradientCard";
import NumericInput from "src/ui/base/Input/NumericInput";
import { useNumericInput } from "src/ui/base/Input/useNumericInput";
import { Label } from "src/ui/base/Label/Label";
import { useElementTokenBalanceOf } from "src/ui/contracts/useElementTokenBalance";
import { useSigner } from "src/ui/signer/useSigner";
import { t } from "ttag";

import { useClaimRewards } from "./useClaimRewards";

interface RewardsPageProps {}

export function RewardsPage(unusedProps: RewardsPageProps): ReactElement {
  const { account, library } = useWeb3React();
  const signer = useSigner(account, library);
  const { data: balanceOf } = useElementTokenBalanceOf(account);
  const formattedBalance = balanceOf ? formatEther(balanceOf) : "-";

  const { claimed, balance, merkleInfo } = useRewardsInfo(account);

  // TODO: display this info on the page
  console.log("merkleInfo", merkleInfo);
  console.log("balance", balance);
  console.log("claimed", claimed);

  const { mutate: claim } = useClaimRewards(signer);
  const onClaim = useCallback(async () => {
    if (!account || !merkleInfo) {
      return;
    }

    const { value } = merkleInfo?.leaf;
    const { proof } = merkleInfo;
    const valueBN = parseEther(value);

    await claim([valueBN, valueBN, proof, account]);
  }, [account, claim, merkleInfo]);

  const {
    stringValue: depositAmount,
    onChange: onSetDepositAmount,
    setValue: setDepositAmount,
  } = useNumericInput();

  const onSetMax = useCallback(async () => {
    setDepositAmount(balance);
  }, [balance, setDepositAmount]);

  return (
    <div
      className={tw(
        "flex",
        "h-full",
        "flex-shrink-0",
        "items-center",
        "justify-center"
      )}
    >
      <GradientCard className={tw("text-white", "w-96", "flex-col", "flex")}>
        <div
          className={tw(
            "flex-col",
            "w-full",
            "flex",
            "items-center",
            "text-center"
          )}
        >
          <div className={tw("p-4", "text-xl")}>{t`Your ELF Balance`}</div>
          <div className="w-full border-t border-gray-300" />
        </div>

        <div
          className={tw(
            "flex-col",
            "w-full",
            "flex",
            "items-center",
            "text-center",
            "pt-4",
            "px-8",
            "pb-8",
            "gap-4"
          )}
        >
          <Image
            height={84}
            width={84}
            src="/assets/ElementLogo--light.svg"
            alt={t`Element logo`}
          />
          <div className={tw("flex", "flex-col")}>
            <span className={tw("text-3xl", "mb-4")}>150.00</span>
            <Label
              className={tw("text-center", "px-12")}
            >{t`You have ELF ready to claim from the Element LP Program.`}</Label>
          </div>
          <Label>{t`People who provide liquidity to eligible investment pools or trade on eligible token pairs receive weekly $ELF distributions as incentives. $ELF token holders help foster the Element Protocol can shape its future by voting and engaging with our governance.`}</Label>
          <div className={tw("grid", "grid-cols-2", "w-full", "px-4")}>
            <Label className={tw("text-left")}>{t`Balance:`}</Label>
            <Label className={tw("text-right")}>{formattedBalance}</Label>
          </div>
          <div className={tw("grid", "grid-cols-2", "w-full", "px-4")}>
            <Label className={tw("text-left")}>{t`Unclaimed:`}</Label>
            <Label className={tw("text-right")}>{t`150.00000`}</Label>
          </div>
          <Label small>{t`Go to Dashboard Overview`}</Label>
          <div className={tw("flex", "flex-col")}>
            <div className={tw("flex", "gap-4")}>
              <Button
                onClick={onClaim}
                disabled={!account || !merkleInfo}
                round
                variant={ButtonVariant.OUTLINE_WHITE}
              >{t`Withdraw`}</Button>
              <Button
                round
                variant={ButtonVariant.WHITE}
              >{t`Claim & Deposit`}</Button>
            </div>
            <div className={tw("flex", "gap-4", "space-y-4")}>
              <Button
                onClick={onSetMax}
                disabled={!account || !merkleInfo}
                round
                variant={ButtonVariant.OUTLINE_WHITE}
              >{t`Max`}</Button>
              <NumericInput
                value={depositAmount}
                onChange={onSetDepositAmount}
                screenReaderLabel={t`deposit amount`}
                htmlFor={"depaoit-amount"}
                id={"deposit-amount"}
                name={"Deposit Amount"}
              />
              <Button
                onClick={onClaim}
                disabled={!account || !merkleInfo}
                round
                variant={ButtonVariant.OUTLINE_WHITE}
              >{t`Deposit`}</Button>
            </div>
          </div>
        </div>
      </GradientCard>
    </div>
  );
}

function useRewardsInfo(address: string | undefined | null) {
  const { data: claimedBN } = useSmartContractReadCall(
    rewardsContract,
    "claimed",
    {
      callArgs: [address as string],
      enabled: !!address,
    }
  );

  const { data: balanceBN } = useTokenBalanceOf(elementTokenContract, address);
  const { data: merkleInfo } = useMerkleInfo(address);

  return {
    claimed: formatEther(claimedBN || 0),
    balance: formatEther(balanceBN || 0),
    merkleInfo,
  };
}
