import React, { ReactElement } from "react";
import tw from "src/elf-tailwindcss-classnames";
import PageView from "src/ui/app/PageView";
import DelegatePage from "src/ui/delegate/DelegatePage";

export default function Delegates(): ReactElement {
  return (
    <PageView childrenContainerClassName={tw("w-full")}>
      <DelegatePage />
    </PageView>
  );
}
