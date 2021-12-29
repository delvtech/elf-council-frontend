import React, { ReactElement } from "react";
import ZKClaimPage from "src/ui/zkclaim/ZKClaimPage";
import PageView from "src/ui/app/PageView";

export default function Proposals(): ReactElement {
  return (
    <PageView
      showSidebar={false}
      childrenContainerClassName="self-stretch flex justify-center"
    >
      <ZKClaimPage />
    </PageView>
  );
}
