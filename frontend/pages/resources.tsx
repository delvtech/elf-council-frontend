import React, { ReactElement } from "react";
import PageView from "src/efi-ui/app/PageView";
import Button from "src/efi-ui/base/Button/Button";
import Card from "src/efi-ui/base/Card/Card";
import CardHeader from "src/efi-ui/base/Card/CardHeader";
import tw from "src/elf-tailwindcss-classnames";
import { t } from "ttag";

export default function Resources(): ReactElement {
  return (
    <PageView>
      <Card>
        <CardHeader
          title={t`Resources`}
          description={t`Lorem ipsum dolor sit amet consectetur adipisicing elit quam corrupti
          consectetur.`}
          action={
            <div className="sm:space-x-4">
              <Button>{t`View Template`}</Button>
              <Button>{t`New Proposal`}</Button>
            </div>
          }
        />
      </Card>
    </PageView>
  );
}
