import React, { ChangeEvent, ReactElement, useCallback, useState } from "react";

import { parseEther } from "@ethersproject/units";
import { ethers, Signer } from "ethers";
import { isValidAddress } from "src/base/isValidAddress";
import tw from "src/elf-tailwindcss-classnames";
import { useMerkleInfo } from "src/elf/merkle/useMerkleInfo";
import { formatWalletAddress } from "src/formatWalletAddress";
import H3 from "src/ui/base/H3";
import TextInput from "src/ui/base/Input/TextInput";
import { LabeledStat } from "src/ui/base/LabeledStat/LabeledStat";
import { useDelegate } from "src/ui/delegate/useDelegate";
import { useClaimAndDepositRewards } from "src/ui/rewards/useClaimAndDepositRewards";
import { useUnclaimedRewards } from "src/ui/rewards/useUnclaimed";
import { t } from "ttag";

import { ClaimAndDelegateButton } from "./ClaimAndDelegateButton";

interface ClaimAndDelegateSectionProps {
  account: string | undefined | null;
  signer: Signer | undefined;
}
export function ClaimAndDelegateSection(
  props: ClaimAndDelegateSectionProps
): ReactElement {
  const { account, signer } = props;
  const delegate = useDelegate(account);
  const { data: merkleInfo } = useMerkleInfo(account);
  const unclaimed = useUnclaimedRewards(account, merkleInfo);

  const title = delegate ? t`Claim and deposit` : t`Claim and delegate`;
  const description = delegate
    ? t`Claim your rewards and give more voting power to your delegate`
    : t`Contribute to the future of the protocol! In order to participate
        in governance you need to select someone use the voting power of
        your tokens. If you plan to vote on upcomming proposals then
        select yourself. Otherwise, select a delegate to vote for you!
        We've included a list of delegates that you can select from or you
        can enter any address if you wish. Learn more here.`;

  // handlers for text input
  const [delegateAddress, setDelegateAddress] = useState<string>("");
  const onUpdateDelegateAddress = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const delegateAddress = event.target.value;
      if (delegateAddress && isValidAddress(delegateAddress)) {
        setDelegateAddress(delegateAddress);
      }
    },
    []
  );

  // handler for button
  const { mutate: claimAndDeposit, isLoading } =
    useClaimAndDepositRewards(signer);
  const onClaimAndDeposit = useCallback(() => {
    if (!account || !merkleInfo) {
      return;
    }

    const { value } = merkleInfo?.leaf;
    const { proof } = merkleInfo;
    const valueBN = parseEther(value);

    claimAndDeposit([
      // DEPOSIT AMOUNT HARDCODED TO 1 FOR TESTING PURPOSES.  We need to change this to 'unclaimed'.
      ethers.constants.WeiPerEther,
      // this is ignored if 'delegate' already has a value
      delegate ? ethers.constants.AddressZero : delegateAddress,
      valueBN,
      proof,
      account,
    ]);
  }, [account, claimAndDeposit, delegate, delegateAddress, merkleInfo]);

  return (
    <div>
      <div className={tw("grid", "grid-cols-1", "gap-6", "md:grid-cols-2")}>
        <div>
          <H3 className={tw("text-blue-900", "font-semibold", "pb-2")}>
            {title}
          </H3>
          <p>{description}</p>
        </div>

        <div>
          <div className={tw("flex", "justify-between")}>
            <LabeledStat
              data={formatWalletAddress(delegate || t`N/A`)}
              bottomLabel={t`delegate`}
            />
            <LabeledStat data={unclaimed} bottomLabel={t`Unclaimed`} />
          </div>
          {!delegate && (
            <TextInput
              screenReaderLabel={t`Insert Delegate Address`}
              id={"delegate-address"}
              name={t`Insert Delegate Address`}
              placeholder={t`Insert Delegate Address`}
              className={tw("mb-8", "h-12", "text-center")}
              value={delegateAddress}
              onChange={onUpdateDelegateAddress}
            />
          )}

          <ClaimAndDelegateButton
            account={account}
            balance={unclaimed}
            isDelegated={isValidAddress(delegate || "")}
            delegateAddress={delegateAddress}
            isLoading={isLoading}
            onClaimAndDelegate={onClaimAndDeposit}
          ></ClaimAndDelegateButton>
        </div>
      </div>
    </div>
  );
}
