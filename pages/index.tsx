import OverviewPage from "src/ui/overview/OverviewPage";
import React, { ReactElement } from "react";
import PageView from "src/ui/app/PageView";
import tw from "src/elf-tailwindcss-classnames";

export default function Home(): ReactElement {
  return (
    <PageView childrenContainerClassName={tw("flex", "justify-center")}>
      <OverviewPage />
    </PageView>
  );
}
