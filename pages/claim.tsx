import React, { ReactElement } from "react";
import ClaimPage from "src/ui/claim/ClaimPage";
import PageView from "src/ui/app/PageView";

export default function Proposals(): ReactElement {
  return (
    <PageView
      showSidebar={false}
      childrenContainerClassName="self-stretch flex justify-center"
    >
      <ClaimPage />
    </PageView>
  );
}
