import React, { ReactElement } from "react";
import PageView from "src/ui/app/PageView";
import { RewardsPage } from "src/ui/rewards/RewardsPage";

export default function Rewards(): ReactElement {
  return (
    <PageView>
      <RewardsPage />
    </PageView>
  );
}
