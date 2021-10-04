import React, { ReactElement } from "react";
import PageView from "src/efi-ui/app/PageView";
import { RewardsPage } from "src/efi-ui/rewards/RewardsPage";

export default function Rewards(): ReactElement {
  return (
    <PageView>
      <RewardsPage />
    </PageView>
  );
}
