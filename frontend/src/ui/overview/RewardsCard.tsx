import React, { ReactElement, useCallback, useState } from "react";

import { Signer } from "ethers";
import { isValidAddress } from "src/base/isValidAddress";
import tw from "src/elf-tailwindcss-classnames";
import Button from "src/ui/base/Button/Button";
import Card from "src/ui/base/Card/Card";
import H2 from "src/ui/base/H2";
import H3 from "src/ui/base/H3";
import TextInput from "src/ui/base/Input/TextInput";
import { useChangeDelegation } from "src/ui/contracts/useChangeDelegation";
import FeaturedDelegatesTable from "src/ui/overview/FeaturedDelegatesTable";
import { t } from "ttag";

interface RewardsCardProps {
  signer: Signer | undefined;
}

export default function RewardsCard(props: RewardsCardProps): ReactElement {
  const { signer } = props;
  const onClaimRewards = useCallback(() => {}, []);

  const [delegateAddressInput, setDelegateAddressInput] = useState<
    string | undefined
  >();
  const { mutate: changeDelegation } = useChangeDelegation(signer);
  const onDelegateClick = useCallback(() => {
    if (delegateAddressInput && isValidAddress(delegateAddressInput)) {
      changeDelegation([delegateAddressInput]);
    }
  }, [changeDelegation, delegateAddressInput]);

  return (
    <Card className={tw("w-full")}>
      <H2
        className={tw("text-blue-900", "font-semibold", "pb-4")}
      >{t`Rewards`}</H2>
      <H3
        className={tw("text-blue-900", "font-semibold", "pb-2")}
      >{t`Claim and delegate`}</H3>
      <div className={tw("space-y-4")}>
        <div className={tw("grid", "grid-cols-1", "gap-6", "sm:grid-cols-2")}>
          <div className={tw()}>
            <p>
              {t`Contribute to the future of the protocol! In order to participate
              in governance you need to select someone use the voting power of
              your tokens. If you plan to vote on upcomming proposals then
              select yourself. Otherwise, select a delegate to vote for you!
              We've included a list of delegates that you can select from or you
              can enter any address if you wish. Learn more here.`}
            </p>
          </div>

          <div>
            <TextInput
              screenReaderLabel={t`Insert Delegate Address`}
              id={"delegate-address"}
              name={t`Insert Delegate Address`}
              placeholder={t`Insert Delegate Address`}
              className={tw("mb-8", "h-12", "text-center")}
              value={delegateAddressInput}
              onChange={(event) => setDelegateAddressInput(event.target.value)}
            />
            <Button
              className={tw("w-full", "text-center")}
              onClick={onClaimRewards}
            >{t`Claim`}</Button>
          </div>
        </div>
        <FeaturedDelegatesTable />
        <H3
          className={tw("text-blue-900", "font-semibold")}
        >{t`Claim without delegating`}</H3>
        <div className={tw("grid", "grid-cols-1", "gap-6", "sm:grid-cols-2")}>
          <div className={tw()}>
            <p>
              {t`If you'd simply like to claim your rewards, you can do so here.`}
            </p>
          </div>

          <div>
            <Button
              className={tw("w-full", "text-center")}
              onClick={onClaimRewards}
            >{t`Claim`}</Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
