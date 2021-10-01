import React, { ReactElement } from "react";
import PageView from "src/efi-ui/app/PageView";
import DelegatePage from "src/efi-ui/delegate/DelegatePage";

export default function Delegates(): ReactElement {
  return (
    <PageView>
      <DelegatePage />
    </PageView>
  );
}
