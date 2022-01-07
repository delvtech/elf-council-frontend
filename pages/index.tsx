import OverviewPage from "src/ui/overview/OverviewPage";
import React, { ReactElement } from "react";
import PageView from "src/ui/app/PageView";
import { ProposalsJson } from "elf-council-proposals";

export default function Home(): ReactElement {
  return (
    <PageView childrenContainerClassName="flex justify-center">
      <OverviewPage />
    </PageView>
  );
}

export async function getServerSideProps(): Promise<{
  props: { proposalsJson: ProposalsJson };
}> {
  const res = await fetch(
    "https://elementfi.s3.us-east-2.amazonaws.com/testnet.proposals.json",
  );
  const proposalsJson = await res.json();
  return { props: { proposalsJson } };
}
