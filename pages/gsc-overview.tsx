import React, { ReactElement } from "react";

import PageView from "src/ui/app/PageView";
import GSCOverviewPage from "src/ui/gsc/GSCOverviewPage";

interface GSCOverviewProps {}
export default function GSCOverview(
  unusedProps: GSCOverviewProps,
): ReactElement {
  return (
    <PageView childrenContainerClassName="flex justify-center">
      <GSCOverviewPage />
    </PageView>
  );
}
