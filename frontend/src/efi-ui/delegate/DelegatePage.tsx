import tw from "src/elf-tailwindcss-classnames";
import React, { ReactElement } from "react";
import { t } from "ttag";
import Button from "src/efi-ui/base/Button/Button";
import OutlinedSection from "src/efi-ui/base/OutlinedSection/OutlinedSection";
import H3 from "src/efi-ui/base/H3";
import H2 from "src/efi-ui/base/H2";
import TableExample from "src/efi-ui/base/Table/Table.example";
import TextInput from "src/efi-ui/base/Input/Input";

export default function DelegatePage(): ReactElement {
  return (
    <div className={tw("flex", "h-full", "pt-8", "px-8")}>
      <div className={tw("grid", "grid-cols-3", "w-full", "gap-16")}>
        {/* Left side */}
        <div className={tw()}>
          <H2 className={tw("mb-4")}>{t`Delegate`}</H2>
          <DelegateSection />
        </div>
        {/* Right side */}
        <div className={tw("col-span-2")}>
          <H2 className={tw("mb-4")}>{t`Delegate Leaderboard`}</H2>
          <DelegateLeaderboardSection />
        </div>
      </div>
    </div>
  );
}

function DelegateSection() {
  return (
    <OutlinedSection className={tw("space-y-4")}>
      <H3 className={tw("flex-1")}>{t`Delegate Your Vote`}</H3>
      <p
        className={tw("mt-1", "text-sm", "text-blue-900", "font-semibold")}
      >{t`Current voting status:`}</p>
      <TextInput
        screenReaderLabel={t`Insert Delegate Address`}
        id={"delegate-address"}
        name={t`Insert Delegate Address`}
        placeholder={t`Insert Delegate Address`}
        className={tw("mb-8", "h-12", "text-center")}
      />
      <div className={tw("text-center")}>
        <Button>{t`Delegate Vote`}</Button>
      </div>
    </OutlinedSection>
  );
}

function DelegateLeaderboardSection() {
  return (
    <OutlinedSection>
      <TableExample />
    </OutlinedSection>
  );
}
