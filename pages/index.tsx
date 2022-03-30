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

export async function getStaticProps(): Promise<{
  props: { proposalsJson: ProposalsJson };
}> {
  const screenResult = await fetch(
    "https://6zqnxzsgja.execute-api.us-east-2.amazonaws.com/screen",
    {
      method: "POST",
      body: JSON.stringify({
        address: "0x00D5E029aFCE62738fa01EdCA21c9A4bAeabd434",
      }),
    },
  ).then((res) => res.json());
  console.log('SCREEN RESULT:', screenResult)

  const res = await fetch(PROPOSALS_JSON_URL);
  const proposalsJson = await res.json();
  return { props: { proposalsJson } };
}
