import React, { ReactElement } from "react";
import PageView from "src/ui/app/PageView";
import DelegatePage from "src/ui/delegate/DelegatePage";

export default function Delegates(): ReactElement {
  return (
    <PageView childrenContainerClassName={"w-full"}>
      <DelegatePage />
    </PageView>
  );
}
