import React, { ReactElement } from "react";
import ZKPage from "src/ui/zk/ZKPage";
import PageView from "src/ui/app/PageView";

export default function Proposals(): ReactElement {
  return (
    <PageView
      showSidebar={false}
      childrenContainerClassName="self-stretch flex justify-center"
    >
      <ZKPage />
    </PageView>
  );
}
