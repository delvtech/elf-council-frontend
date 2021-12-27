import { Signer } from "ethers";
import React, { ReactElement, useState } from "react";
import { delegates } from "src/elf-council-delegates/delegates";
import tw, {
  borderRadius,
  boxShadow,
  display,
  gap,
  gridTemplateColumns,
  height,
  margin,
  overflow,
  padding,
  placeholderColor,
  space,
  textAlign,
  textColor,
} from "src/elf-tailwindcss-classnames";
import { useMerkleInfo } from "src/elf/merkle/useMerkleInfo";
import { StepCard } from "src/ui/airdrop/StepCard/StepCard";
import TextInput from "src/ui/base/Input/TextInput";
import DelegateProfile from "src/ui/delegate/DelegatesList/DelegateProfile";
import { t } from "ttag";

interface ChooseDelegateProps {
  account: string | null | undefined;
  signer: Signer | undefined;
  onNextStep: () => void;
  onPrevStep: () => void;
}

export function ChooseDelegate({
  account,
  signer,
  onNextStep,
  onPrevStep,
}: ChooseDelegateProps): ReactElement {
  const [delegateAddress, setDelegateAddress] = useState("");
  const { data: merkleInfo } = useMerkleInfo(account);
  // const { mutate: claim } = useClaimAirdrop(signer);

  const [selectedDelegateIndex, setSelectedDelegateIndex] = useState<
    number | undefined
  >();
  // const claimableBalance = useUnclaimedAirdrop(account, merkleInfo);
  // const onClaimOnlyClick = useCallback(() => {
  //   if (account && merkleInfo) {
  //     claim([
  //       parseEther(merkleInfo.leaf.value),
  //       parseEther(merkleInfo.leaf.value),
  //       merkleInfo.proof,
  //       account,
  //     ]);
  //   }
  // }, [account, claim, merkleInfo]);

  // const { mutate: claimAndDeposit } = useClaimAndDepositAirdrop(signer);
  // const onClaimAndDepositClick = useCallback(() => {
  //   if (account && merkleInfo) {
  //     claimAndDeposit([
  //       parseEther(merkleInfo.leaf.value),
  //       delegateAddress,
  //       parseEther(merkleInfo.leaf.value),
  //       merkleInfo.proof,
  //       account,
  //     ]);
  //   }
  // }, [account, claimAndDeposit, delegateAddress, merkleInfo]);

  return (
    <StepCard
      onNextStep={onNextStep}
      nextStepLabel={t`Review Claim`}
      onPrevStep={onPrevStep}
    >
      <div className="text-left text-2xl font-bold mb-10">{t`Choose a delegate`}</div>
      <div className="flex flex-col w-full justify-center text-base mb-10">
        <span
          className={"w-full mb-4"}
        >{t`In order to participate in governance you must select someone to
          use the voting power associated with your tokens.  To learn more about
          our governance system and delegating process read here.`}</span>
        <span className="w-full font-bold mb-2">{t`You can select anyone to delegate to, including
          yourself. You will own your tokens and you can change your delegate at
          any time.`}</span>
      </div>
      <div className={space("space-y-4")}>
        <TextInput
          screenReaderLabel={t`Enter delegate address`}
          id={"delegate-address"}
          name={t`Enter delegate address`}
          placeholder={t`Enter delegate address`}
          className={tw(
            margin("mb-4"),
            height("h-12"),
            textAlign("text-left"),
            textColor("text-principalRoyalBlue"),
            placeholderColor("placeholder-principalRoyalBlue"),
          )}
          value={delegateAddress}
          onChange={(event) => setDelegateAddress(event.target.value)}
        />
        <div
          className={tw(
            padding("p-1"),
            borderRadius("rounded-xl"),
            boxShadow("shadow"),
            height("h-48"),
            overflow("overflow-auto"),
          )}
        >
          {/* List of delegates */}
          <ul
            className={tw(
              display("grid"),
              gridTemplateColumns("grid-cols-2", "lg:grid-cols-3"),
              gap("gap-x-4", "gap-y-3"),
              overflow("overflow-y-scroll"),
            )}
            style={{ maxHeight: "428px" }}
          >
            {delegates.map((delegate, idx) => {
              return (
                <li key={`${delegate.address}-${idx}}`}>
                  <button
                    className="w-full"
                    onClick={() => setSelectedDelegateIndex(idx)}
                  >
                    <DelegateProfile
                      active={idx === selectedDelegateIndex}
                      delegate={delegate}
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </StepCard>
  );
}
