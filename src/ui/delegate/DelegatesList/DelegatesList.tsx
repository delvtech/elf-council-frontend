import { ReactElement, useState, Fragment } from "react";
import { delegates } from "src/elf-council-delegates/delegates";
import tw, {
  display,
  gridTemplateColumns,
  gap,
  overflow,
  maxHeight,
  margin,
  fontSize,
  textColor,
  letterSpacing,
} from "src/elf-tailwindcss-classnames";
import DelegateProfile from "src/ui/delegate/DelegatesList/DelegateProfile";
import H2 from "src/ui/base/H2";
import { t } from "ttag";

function DelegatesList(): ReactElement {
  const [currentDelegate, setCurrentDelegate] = useState(-1);

  const onClose = () => {
    setCurrentDelegate(-1);
  };

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
          maxHeight("max-h-[428px]"),
        )}
      >
        {delegates.map((delegate, idx) => {
          return (
            <li key={`${delegate.address}-${idx}}`}>
              <button onClick={() => setCurrentDelegate(idx)}>
                <DelegateProfile delegate={delegate} />
              </button>
            </li>
          );
        })}
      </ul>

      {/* Detailed delegate profile */}
      {currentDelegate !== -1 ? (
        <Fragment>
          <div className="absolute z-50 box-content py-2 px-3 rounded-xl top-0 
          right-0 h-full w-full bg-hackerSky">
            <div className="m-12">
              <button onClick={onClose}>CLOSE DELEGATE</button>

              {delegates[currentDelegate].name}
            </div>
          </div>
          <div
            onClick={onClose}
            className="fixed z-30 inset-0 bg-black opacity-50"
          />
        </Fragment>
      ) : null}
    </div>
  );
}

export default DelegatesList;
