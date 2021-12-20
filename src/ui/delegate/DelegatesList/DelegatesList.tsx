import { ReactElement } from "react";
import { delegates } from "src/elf-council-delegates/delegates";
import tw from "src/elf-tailwindcss-classnames";
import DelegateProfile from "src/ui/delegate/DelegatesList/DelegateProfile";

function DelegatesList(): ReactElement {
  return (
    <div
      className={tw(
        "grid",
        "grid-cols-2",
        "lg:grid-cols-3",
        "gap-x-4",
        "gap-y-3",
        "overflow-y-scroll",
        "max-h-96"
      )}
    >
      {delegates.map((delegate) => {
        return <DelegateProfile key={delegate.address} delegate={delegate} />;
      })}
    </div>
  );
}

export default DelegatesList;
