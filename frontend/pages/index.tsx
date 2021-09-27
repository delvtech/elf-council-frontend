import OverviewPage from "pages/components/OverviewPage";
import PageView from "pages/components/PageView";
import React, { ReactElement } from "react";

export default function Home(): ReactElement {
  return (
    <PageView>
      <OverviewPage />
    </PageView>
  );
}
