import React, { ReactElement } from "react";
import PageView from "src/efi-ui/app/PageView";
import ProposalsPage from "src/efi-ui/proposals/ProposalsPage";

export default function Proposals(): ReactElement {
  return (
    <PageView>
      <ProposalsPage />
    </PageView>
  );
}
