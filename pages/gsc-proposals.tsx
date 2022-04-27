import React, { ReactElement } from "react";

import { ProposalsJson } from "@elementfi/elf-council-proposals";

import { PROPOSALS_JSON_URL } from "src/elf-council-proposals";
import PageView from "src/ui/app/PageView";
import { useLatestBlockNumber } from "src/ui/ethereum/useLatestBlockNumber";
import GSCProposalsPage from "src/ui/proposals/GSCProposalsPage";

interface GSCProposalsProps {
  proposalsJson: ProposalsJson;
}
export default function GSCProposals({
  proposalsJson,
}: GSCProposalsProps): ReactElement | null {
  const { data: currentBlockNumber } = useLatestBlockNumber();
  if (!currentBlockNumber) {
    return null;
  }
  return (
    <PageView>
      <GSCProposalsPage
        proposalsJson={proposalsJson}
        currentBlockNumber={currentBlockNumber}
      />
    </PageView>
  );
}

export async function getStaticProps(): Promise<{
  props: { proposalsJson: ProposalsJson };
  revalidate: number;
}> {
  // Fetch the proposals.json server side so that it's immediately available on
  // the client. This makes it easy to update the proposals.json as needed
  // without having to do a deploy.
  try {
    const res = await fetch(PROPOSALS_JSON_URL);
    const proposalsJson = await res.json();
    return {
      props: { proposalsJson },
      revalidate: 60, // seconds
    };
  } catch (error) {
    console.error("error", error);
  }

  return { props: { proposalsJson: emptyProposals }, revalidate: 60 };
}

const emptyProposals: ProposalsJson = {
  version: "0.0.0",
  snapshotSpace: "",
  proposals: [],
};
