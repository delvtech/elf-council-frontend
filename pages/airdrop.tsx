import React, { ReactElement } from "react";
import tw, { display, justifyContent } from "src/elf-tailwindcss-classnames";
import AirdropPage from "src/ui/airdrop/AirdropPage/AirdropPage";
import PageView from "src/ui/app/PageView";

export default function Proposals(): ReactElement {
  return (
    <PageView
      showSidebar={false}
      showHeader={false}
      showFooter
      childrenContainerClassName={tw(
        display("flex"),
        justifyContent("justify-center"),
      )}
    >
      <AirdropPage />
    </PageView>
  );
}
