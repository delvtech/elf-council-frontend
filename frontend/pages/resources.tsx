import React, { ReactElement } from "react";
import PageView from "src/efi-ui/app/PageView";
import Button from "src/efi-ui/base/Button/Button";
import ResourcesHeader from "src/efi-ui/resources/ResourcesHeader";
import tw from "src/elf-tailwindcss-classnames";
import { t } from "ttag";

export default function Resources(): ReactElement {
  return (
    <PageView>
      <div className={tw("flex", "items-center", "justify-between")}>
        <ResourcesHeader />
        <div className={"space-x-4"}>
          <Button>{t`View Template`}</Button>
          <Button>{t`New Proposal`}</Button>
        </div>
      </div>
    </PageView>
  );
}
