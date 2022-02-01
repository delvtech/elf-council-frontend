import React, { ReactElement } from "react";
import AirdropPage from "src/ui/airdrop/AirdropPage/AirdropPage";
import PageView from "src/ui/app/PageView";

export default function Airdrop(): ReactElement {
  return (
    <PageView showSidebar childrenContainerClassName="flex justify-center">
      <AirdropPage />
    </PageView>
  );
}
