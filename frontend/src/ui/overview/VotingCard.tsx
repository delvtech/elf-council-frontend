import React, { ReactElement } from "react";

import { proposalsJson } from "src/elf-council-proposals";
import tw from "src/elf-tailwindcss-classnames";
import Card from "src/ui/base/Card/Card";
import H3 from "src/ui/base/H3";
import { LabeledStat } from "src/ui/base/LabeledStat/LabeledStat";
import { useLatestBlockNumber } from "src/ui/ethereum/useLatestBlockNumber";
import { t } from "ttag";

function VotingCard(): ReactElement {
  const walletBalance = "100";
  const proposalwithNearestDeadline = getNextProposal();
  const { data: currentBlock = 0 } = useLatestBlockNumber();

  const blocksUntilNextVoteEnds =
    proposalwithNearestDeadline.expiration - currentBlock;

  return (
    <Card>
      <H3 className={tw("text-blue-900", "font-semibold")}>{t`Voting`}</H3>
      <div className={tw("flex")}>
        <LabeledStat data={walletBalance} bottomLabel={t`Voting Power`} />
        <LabeledStat
          data={String(blocksUntilNextVoteEnds)}
          bottomLabel={t`Next vote ends`}
        />
      </div>
      <p className={tw("text-lg", "text-blue-500", "font-semibold")}></p>
      <div className={tw("flex")}>
        <LabeledStat data={walletBalance} bottomLabel={t`Delegate powers`} />
        <LabeledStat data={"YES"} bottomLabel={t`Current voting status`} />
      </div>
    </Card>
  );
}

export default VotingCard;

function getNextProposal() {
  const { proposals } = proposalsJson;
  const sortedProposals = proposals.sort((a, b) => a.expiration - b.expiration);

  return sortedProposals[0];
}
