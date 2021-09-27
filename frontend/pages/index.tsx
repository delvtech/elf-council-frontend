import OverviewPage from "src/efi-ui/overview/OverviewPage";
import React, { ReactElement } from "react";
import PageView from "src/efi-ui/app/PageView";

export default function Home(): ReactElement {
  return (
    <PageView>
      <OverviewPage />
    </PageView>
  );
}
