import OverviewPage from "src/ui/overview/OverviewPage";
import React, { ReactElement } from "react";
import PageView from "src/ui/app/PageView";
import tw, { display, justifyContent } from "src/elf-tailwindcss-classnames";

export default function Home(): ReactElement {
  return (
    <PageView
      childrenContainerClassName={tw(
        display("flex"),
        justifyContent("justify-center"),
      )}
    >
      <OverviewPage />
    </PageView>
  );
}
