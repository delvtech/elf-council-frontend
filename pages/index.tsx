import OverviewPage from "src/ui/overview/OverviewPage";
import React, { ReactElement } from "react";
import PageView from "src/ui/app/PageView";
import { ProposalsJson } from "elf-council-proposals";
import { PROPOSALS_JSON_URL } from "src/elf-council-proposals";

interface HomeProps {
  proposalsJson: ProposalsJson;
}
export default function Home({ proposalsJson }: HomeProps): ReactElement {
  return (
    <PageView childrenContainerClassName="flex justify-center">
      <OverviewPage proposalsJson={proposalsJson} />
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
