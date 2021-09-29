import tw from "src/elf-tailwindcss-classnames";
import React, { ReactElement } from "react";
import { useProposals } from "src/efi-ui/proposals/useProposals";
import { t } from "ttag";
import H1 from "src/efi-ui/base/H1";
import Button from "src/efi-ui/base/Button/Button";

export default function ProposalsPage(): ReactElement {
  const { data } = useProposals();
  console.log("data", data);

  return (
    <div className={tw("h-full", "pt-8")}>
      <div className={tw("flex", "px-8", "py-1")}>
        <H1 className={tw("flex-1", "text-center")}>{t`Proposals`}</H1>
        <Button>{t`New Proposal`}</Button>
      </div>
    </div>
  );
}
