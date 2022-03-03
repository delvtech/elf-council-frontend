import React, { ReactElement, useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import LookupCard from "./LookupCard";
import EligibleCard from "./EligibleCard";
import AlreadyClaimedCard from "./AlreadyClaimedCard";
import NotEligibleCard from "./NotEligibleCard";
import DelegateInfoCard from "./DelegateInfoCard";
import ChooseDelegateCard from "./ChooseDelegateCard";
import TransactionCard from "./TransactionCard";
import ShareCard from "./ShareCard";
import { useSigner } from "src/ui/signer/useSigner";
import useRouterSteps, { StepStatus } from "src/ui/router/useRouterSteps";
import { ElementLogo } from "src/ui/base/ElementLogo/ElementLogo";
import {
  StepItem,
  StepStatus as StepItemStatus,
} from "src/ui/base/Steps/StepItem";
import { StepDivider } from "src/ui/base/Steps/StepDivider";
import Steps from "src/ui/base/Steps/Steps";
// import useWorker from "src/ui/base/useWorker";
// import { useQuery } from "react-query";
import { t } from "ttag";
import { utils } from "ethers";

export enum Step {
  LOOKUP = "lookup",
  ELIGIBILITY = "eligibility",
  DELEGATE_INFO = "info",
  DELEGATE = "delegate",
  TRANSACTION = "transaction",
  SHARE = "share",
}

export default function ClaimPage(): ReactElement {
  const { account, active, library } = useWeb3React();
  const signer = useSigner(account, library);
  const [keySecretPair, setKeySecretPair] = useState<[string, string]>();
  const key = keySecretPair?.[0];
  const secret = keySecretPair?.[1];
  const [publicId, setPublicId] = useState<string>();
  const [alreadyClaimed, setAlreadyClaimed] = useState(false);
  const [delegateAddress, setDelegateAddress] = useState<string>();
  const {
    canViewStep,
    getStepPath,
    getStepStatus,
    goToNextStep,
    goToPreviousStep,
  } = useRouterSteps({
    steps: [
      Step.LOOKUP,
      Step.ELIGIBILITY,
      Step.DELEGATE_INFO,
      Step.DELEGATE,
      Step.TRANSACTION,
      Step.SHARE,
    ],
  });
  // TODO
  // const proofCallResult =
  //   useWorker(a16zLibrary.generateProofCallData);
  // TODO: fetch leafs from aws and generate merkletree
  // const { data: merkleTree, isLoading: merkleLeafsLoading } = useQuery({
  //   queryKey: ["zk-merkle-tree-from-leafs"],
  //   queryFn: async () => {
  //     const leafs = await fetch(`${awsUrl}/zk-leafs.txt`).then((res) =>
  //       res.text(),
  //     );
  //     return a16zLibrary.queryMerkleTree(ethersProvider, address);
  //   },
  // });

  useEffect(() => {
    // TODO
    // if (data && merkleTree) {
    //   proofCallResult.run(
    //     merkleTree,
    //     key,
    //     secret,
    //     redeemerAddress,
    //   );
    // }

    const placeholderSuccessKey =
      "0x321718eb3db448ca864758c7cc54fd72e7a88b982a308f07b16d156fe6592e37";
    const placeholderClaimedKey =
      "0x181a6585d99fdd4a22d02d1609d4d2a5498777523560905a3c069fd6f61feb1a";

    if (key === placeholderSuccessKey) {
      setPublicId(utils.id(`${key}${secret}`));
      setAlreadyClaimed(false);
    } else if (key === placeholderClaimedKey) {
      setPublicId(utils.id(`${key}${secret}`));
      setAlreadyClaimed(true);
    } else {
      setPublicId(undefined);
    }
  }, [key, secret /*, merkleTree */]);

  // TODO: transition styles
  const getStepClassName = (step: Step) => {
    switch (getStepStatus(step)) {
      case StepStatus.CURRENT:
        return "block";
      default:
        return "hidden";
    }
  };

  const getStepItemStatus = (steps: Step[]): StepItemStatus => {
    const statuses = steps.map((step) => getStepStatus(step));
    if (statuses.includes(StepStatus.CURRENT)) {
      return StepItemStatus.CURRENT;
    }
    if (statuses.includes(StepStatus.PENDING)) {
      return StepItemStatus.PENDING;
    }
    return StepItemStatus.COMPLETE;
  };

  return (
    <div className="flex max-w-4xl flex-1 flex-col items-center gap-6">
      <div style={{ width: 600, maxWidth: "100%" }}>
        <Steps className="w-full">
          <StepItem
            stepLabel="1"
            status={getStepItemStatus([Step.LOOKUP, Step.ELIGIBILITY])}
            href={getStepPath(Step.LOOKUP)}
          >{t`View Airdrop`}</StepItem>
          <StepDivider />
          <StepItem
            stepLabel="2"
            status={getStepItemStatus([Step.DELEGATE_INFO, Step.DELEGATE])}
            href={
              canViewStep(Step.DELEGATE_INFO)
                ? getStepPath(Step.DELEGATE_INFO)
                : undefined
            }
          >{t`Choose Delegate`}</StepItem>
          <StepDivider />
          <StepItem
            stepLabel="3"
            status={getStepItemStatus([Step.TRANSACTION])}
            href={
              canViewStep(Step.TRANSACTION)
                ? getStepPath(Step.TRANSACTION)
                : undefined
            }
          >{t`Review Transaction`}</StepItem>
        </Steps>
      </div>

      {/* Lookup */}
      <LookupCard
        className={getStepClassName(Step.LOOKUP)}
        onChange={setKeySecretPair}
        onNextStep={goToNextStep}
      />

      {/* Eligibility */}
      {publicId && !alreadyClaimed && (
        <EligibleCard
          className={getStepClassName(Step.ELIGIBILITY)}
          onPreviousStep={goToPreviousStep}
          onNextStep={goToNextStep}
        />
      )}
      {publicId && alreadyClaimed && (
        <AlreadyClaimedCard className={getStepClassName(Step.ELIGIBILITY)} />
      )}
      {!publicId && (
        <NotEligibleCard
          onTryAgain={goToPreviousStep}
          className={getStepClassName(Step.ELIGIBILITY)}
        />
      )}

      {/* Delegation Information */}
      <DelegateInfoCard
        className={getStepClassName(Step.DELEGATE_INFO)}
        onPreviousStep={goToPreviousStep}
        onNextStep={goToNextStep}
      />

      {/* Delegate */}
      <ChooseDelegateCard
        account={account as string}
        className={getStepClassName(Step.DELEGATE)}
        onChooseDelegate={setDelegateAddress}
        onPreviousStep={goToPreviousStep}
        onNextStep={goToNextStep}
      />

      {/* Review & Initiate Transaction */}
      {account && signer && delegateAddress && (
        <TransactionCard
          className={getStepClassName(Step.TRANSACTION)}
          account={account}
          signer={signer}
          delegateAddress={delegateAddress}
          onPreviousStep={goToPreviousStep}
          onSuccess={goToNextStep}
          onNextStep={goToNextStep}
        />
      )}

      {/* Share */}
      <ShareCard className={getStepClassName(Step.SHARE)} />

      <div className="mt-auto flex flex-1 flex-col items-center text-principalRoyalBlue">
        <span className="text-sm">{t`Powered by`}</span>
        <ElementLogo height={"40"} />
      </div>
    </div>
  );
}
