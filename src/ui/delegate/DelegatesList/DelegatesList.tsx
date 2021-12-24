import { ReactElement } from "react";
import { delegates } from "src/elf-council-delegates/delegates";
import tw, {
  display,
  gridTemplateColumns,
  gap,
  overflow,
  margin,
  fontSize,
  textColor,
  letterSpacing,
} from "src/elf-tailwindcss-classnames";
import DelegateProfile from "src/ui/delegate/DelegatesList/DelegateProfile";
import H2 from "src/ui/base/H2";
import { t } from "ttag";

function DelegatesList(): ReactElement {
  return (
    <div className="relative">
      <H2
        className={tw(
          margin("mb-4"),
          fontSize("text-2xl"),
          textColor("text-principalRoyalBlue"),
          letterSpacing("tracking-wide"),
        )}
      >{t`Explore Featured Delegates`}</H2>
      {/* List of delegates */}
      <ul
        className={tw(
          display("grid"),
          gridTemplateColumns("grid-cols-2", "lg:grid-cols-3"),
          gap("gap-x-4", "gap-y-3"),
          overflow("overflow-y-scroll"),
        )}
        style={{ maxHeight: "428px" }}
      >
        {delegates.map((delegate) => {
          return (
            <li key={delegate.address}>
              <DelegateProfile delegate={delegate} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default DelegatesList;
