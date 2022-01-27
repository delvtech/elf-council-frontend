import React, { ReactElement } from "react";
import ZKPage from "src/ui/zk/ZKPage";
import { Platform } from "src/ui/zk/types";
import PageView from "src/ui/app/PageView";

export default function ZK(): ReactElement {
  return (
    <PageView
      showSidebar={false}
      childrenContainerClassName="self-stretch flex justify-center"
    >
      <ZKPage platform={Platform.GITHUB} />
    </PageView>
  );
}
