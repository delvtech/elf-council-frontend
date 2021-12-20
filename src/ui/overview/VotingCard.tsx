import React, { ReactElement } from "react";

import { proposalsJson } from "src/elf-council-proposals";
import tw, {
  textColor,
  fontWeight,
  display,
  fontSize,
} from "src/elf-tailwindcss-classnames";
import Card from "src/ui/base/Card/Card";
import H3 from "src/ui/base/H3";
import { LabeledStat } from "src/ui/base/LabeledStat/LabeledStat";
import { useDelegate } from "src/ui/delegate/useDelegate";
import { useLatestBlockNumber } from "src/ui/ethereum/useLatestBlockNumber";
import { useVotingPowerForAccount } from "src/ui/voting/useVotingPowerForAccount";
import { t } from "ttag";

interface VotingCardProps {
  account: string | undefined | null;
}
function VotingCard(props: VotingCardProps): ReactElement {
  const { account } = props;
  const proposalwithNearestDeadline = getNextProposal();
  const { data: currentBlock = 0 } = useLatestBlockNumber();
  const delegate = useDelegate(account);
  const votingPower = useVotingPowerForAccount(account);
  const delegateVotingPower = useVotingPowerForAccount(delegate);

  const blocksUntilNextVoteEnds =
    proposalwithNearestDeadline.expiration - currentBlock;

  return (
    <Card>
      <H3
        className={tw(textColor("text-blue-900"), fontWeight("font-semibold"))}
      >{t`Voting`}</H3>
      <div className={tw(display("flex"))}>
        <LabeledStat data={votingPower} bottomLabel={t`Voting Power`} />
        <LabeledStat
          data={String(blocksUntilNextVoteEnds)}
          bottomLabel={t`Next vote ends`}
        />
      </div>
      <p
        className={tw(
          fontSize("text-lg"),
          textColor("text-blue-500"),
          fontWeight("font-semibold"),
        )}
      ></p>
      <div className={tw(display("flex"))}>
        <LabeledStat
          data={delegateVotingPower}
          bottomLabel={t`Delegate powers`}
        />
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
