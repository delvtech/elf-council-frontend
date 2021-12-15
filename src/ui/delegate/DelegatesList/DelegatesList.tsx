import { ReactElement } from "react";
import { delegates } from "src/elf-council-delegates/delegates";
import tw from "src/elf-tailwindcss-classnames";
import { t } from "ttag";
import DelegateProfile from "src/ui/delegate/DelegatesList/DelegateProfile";

interface DelegatesListProps {}

function DelegatesList(props: DelegatesListProps): ReactElement {
  return (
    <div className={tw("grid", "grid-cols-3", "gap-x-4", "gap-y-3")}>
      {delegates.map((delegate) => {
        return <DelegateProfile key={delegate.address} delegate={delegate} />;
      })}
    </div>
  );
}

export default DelegatesList;
