import React, { ChangeEvent, ReactElement, useCallback, useState } from "react";

import { parseEther } from "@ethersproject/units";
import { ethers, Signer } from "ethers";
import { isValidAddress } from "src/base/isValidAddress";
import tw from "src/elf-tailwindcss-classnames";
import { useMerkleInfo } from "src/elf/merkle/useMerkleInfo";
import Button from "src/ui/base/Button/Button";
import Card from "src/ui/base/Card/Card";
import H2 from "src/ui/base/H2";
import H3 from "src/ui/base/H3";
import TextInput from "src/ui/base/Input/TextInput";
import { useDelegate } from "src/ui/delegate/useDelegate";
import FeaturedDelegatesTable from "src/ui/overview/FeaturedDelegatesTable";
import { useClaimAndDepositRewards } from "src/ui/rewards/useClaimAndDepositRewards";
import { useClaimRewards } from "src/ui/rewards/useClaimRewards";
import { t } from "ttag";
import { formatWalletAddress } from "src/formatWalletAddress";

interface RewardsCardProps {
  account: string | undefined | null;
  signer: Signer | undefined;
}

export default function RewardsCard(props: RewardsCardProps): ReactElement {
  const { account, signer } = props;
  const delegate = useDelegate(account);

  return (
    <Card className={tw("w-full")}>
      <H2
        className={tw("text-blue-900", "font-semibold", "pb-4")}
      >{t`Rewards`}</H2>
      <div className={tw("space-y-4")}>
        <ClaimAndDelegateSection account={account} signer={signer} />
        {!delegate && <FeaturedDelegatesTable />}
        <ClaimSection account={account} signer={signer} />
      </div>
    </Card>
  );
}

interface ClaimAndDelegateSectionProps {
  account: string | undefined | null;
  signer: Signer | undefined;
}

function ClaimAndDelegateSection(
  props: ClaimAndDelegateSectionProps
): ReactElement {
  const { account, signer } = props;
  const delegate = useDelegate(account);
  const { data: merkleInfo } = useMerkleInfo(account);

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
  const { mutate: claimAndDeposit } = useClaimAndDepositRewards(signer);
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
      <div className={tw("grid", "grid-cols-1", "gap-6", "sm:grid-cols-2")}>
        <div>
          <H3 className={tw("text-blue-900", "font-semibold", "pb-2")}>
            {title}
          </H3>
          <p>{description}</p>
        </div>

        <div>
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
          {delegate && (
            <div>
              <p>{t`current delegate address:`}</p>
              <p>{formatWalletAddress(delegate)}</p>
            </div>
          )}

          <Button
            className={tw("w-full", "text-center")}
            onClick={onClaimAndDeposit}
          >{t`Claim`}</Button>
        </div>
      </div>
    </div>
  );
}

interface ClaimSectionProps {
  account: string | undefined | null;
  signer: Signer | undefined;
}
function ClaimSection(props: ClaimSectionProps) {
  const { account, signer } = props;

  const { mutate: claim } = useClaimRewards(signer);
  const { data: merkleInfo } = useMerkleInfo(account);
  const onClaim = useCallback(() => {
    if (!account || !merkleInfo) {
      return;
    }

    const { value } = merkleInfo?.leaf;
    const { proof } = merkleInfo;
    const valueBN = parseEther(value);

    claim([valueBN, valueBN, proof, account]);
  }, [account, claim, merkleInfo]);

  return (
    <div>
      <H3
        className={tw("text-blue-900", "font-semibold")}
      >{t`Claim without delegating`}</H3>
      <div className={tw("grid", "grid-cols-1", "gap-6", "sm:grid-cols-2")}>
        <div>
          <p>
            {t`If you'd simply like to claim your rewards, you can do so here.`}
          </p>
        </div>

        <div>
          <Button
            className={tw("w-full", "text-center")}
            onClick={onClaim}
          >{t`Claim`}</Button>
        </div>
      </div>
    </div>
  );
}
