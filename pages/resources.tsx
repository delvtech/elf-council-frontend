import React, { ReactElement } from "react";
import PageView from "src/ui/app/PageView";
import ResourcesCard from "src/ui/resources/ResourcesCard";

export default function Resources(): ReactElement {
  return (
    <PageView>
      <ResourcesCard />
    </PageView>
  );
}
