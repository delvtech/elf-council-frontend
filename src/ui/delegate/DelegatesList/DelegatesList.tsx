import { ReactElement } from "react";
import { delegates } from "src/elf-council-delegates/delegates";
import tw, {
  display,
  gridTemplateColumns,
  gap,
  overflow,
  maxHeight,
} from "src/elf-tailwindcss-classnames";
import DelegateProfile from "src/ui/delegate/DelegatesList/DelegateProfile";

function DelegatesList(): ReactElement {
  return (
    <div
      className={tw(
        display("grid"),
        gridTemplateColumns("grid-cols-2", "lg:grid-cols-3"),
        gap("gap-x-4", "gap-y-3"),
        overflow("overflow-y-scroll"),
        maxHeight("max-h-96"),
      )}
    >
      {delegates.map((delegate) => {
        return <DelegateProfile key={delegate.address} delegate={delegate} />;
      })}
    </div>
  );
}

export default DelegatesList;
