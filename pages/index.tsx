import OverviewPage from "src/ui/overview/OverviewPage";
import React, { ReactElement } from "react";
import PageView from "src/ui/app/PageView";
import { ProposalsJson } from "elf-council-proposals";
import { PROPOSALS_JSON_URL } from "src/elf-council-proposals";
import { getRecentDelegators } from "src/ui/overview/getRecentDelegators";

interface HomeProps {
  proposalsJson: ProposalsJson;
  recentDelegators: string[];
}
export default function Home({
  proposalsJson,
  recentDelegators,
}: HomeProps): ReactElement {
  return (
    <PageView childrenContainerClassName="flex justify-center">
      <OverviewPage
        proposalsJson={proposalsJson}
        recentDelegators={recentDelegators}
      />
    </PageView>
  );
}

export async function getStaticProps(): Promise<{
  props: { proposalsJson: ProposalsJson; recentDelegators: string[] };
  revalidate: number;
}> {
  const recentDelegators = await getRecentDelegators();
  const res = await fetch(PROPOSALS_JSON_URL);
  const proposalsJson = await res.json();

  return {
    props: { proposalsJson, recentDelegators },
    revalidate: 60, // seconds,
  };
}

