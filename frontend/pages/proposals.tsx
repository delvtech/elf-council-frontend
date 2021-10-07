import React, { ReactElement } from "react";
import PageView from "src/ui/app/PageView";
import ProposalsPage from "src/ui/proposals/ProposalsPage";

export default function Proposals(): ReactElement {
  return (
    <PageView>
      <ProposalsPage />
    </PageView>
  );
}
