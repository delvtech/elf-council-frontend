import React, { ReactElement } from "react";
import AirdropPage from "src/ui/airdrop/AirdropPage/AirdropPage";
import PageView from "src/ui/app/PageView";

export default function Proposals(): ReactElement {
  return (
    <PageView
      showSidebar={false}
      childrenContainerClassName="flex justify-center"
    >
      <AirdropPage />
    </PageView>
  );
}
