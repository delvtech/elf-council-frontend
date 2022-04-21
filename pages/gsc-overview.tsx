import OverviewPage from "src/ui/overview/OverviewPage";
import React, { ReactElement } from "react";
import PageView from "src/ui/app/PageView";
import { ProposalsJson } from "@elementfi/elf-council-proposals";
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

export async function getStaticProps(): Promise<{
  props: { proposalsJson: ProposalsJson };
  revalidate: number;
}> {
  const res = await fetch(PROPOSALS_JSON_URL);
  const proposalsJson = await res.json();

  return {
    props: { proposalsJson },
    revalidate: 60, // seconds
  };
}
