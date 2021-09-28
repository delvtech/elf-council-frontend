import React, { ReactElement } from "react";
import PageView from "src/efi-ui/app/PageView";
import { ResourcesCard } from "src/efi-ui/resources/ResourcesCard";

export default function Resources(): ReactElement {
  return (
    <PageView>
      <ResourcesCard />
    </PageView>
  );
}
