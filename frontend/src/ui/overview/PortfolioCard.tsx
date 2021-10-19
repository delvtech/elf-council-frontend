import { Card } from "@material-ui/core";
import React, { ReactElement } from "react";

import tw from "src/elf-tailwindcss-classnames";
import H3 from "src/ui/base/H3";
import { t } from "ttag";

function PortfolioCard(): ReactElement {
  return (
    <Card className={tw("flex", "flex-col")}>
      <H3>{t`Portfolio`}</H3>
    </Card>
  );
}

export default PortfolioCard;
