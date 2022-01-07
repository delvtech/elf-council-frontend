import { ProposalsJson } from "elf-council-proposals";
import React, { ReactElement } from "react";
import { PROPOSALS_JSON_URL } from "src/elf-council-proposals";
import PageView from "src/ui/app/PageView";
import ProposalsPage from "src/ui/proposals/ProposalsPage";

interface ProposalsProps {
  proposalsJson: ProposalsJson;
}
export default function Proposals({
  proposalsJson,
}: ProposalsProps): ReactElement {
  return (
    <PageView>
      <ProposalsPage proposalsJson={proposalsJson} />
    </PageView>
  );
}

export async function getServerSideProps(): Promise<{
  props: { proposalsJson: ProposalsJson };
}> {
  const res = await fetch(PROPOSALS_JSON_URL);
  const proposalsJson = await res.json();
  return { props: { proposalsJson } };
}
