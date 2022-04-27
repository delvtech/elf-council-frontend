import React, { ReactElement } from "react";
import PageView from "src/ui/app/PageView";
import VestingClaim from "src/ui/delegate-vesting/VestingDelegatePage";

export default function Airdrop(): ReactElement {
  return (
    <PageView showSidebar childrenContainerClassName="flex justify-center">
      <VestingClaim />
    </PageView>
  );
}
