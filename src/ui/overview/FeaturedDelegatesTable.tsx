import { ReactElement, useCallback, useState, useEffect } from "react";

import Tooltip from "src/ui/base/Tooltip/Tooltip";
import { DuplicateIcon } from "@heroicons/react/outline";
import { copyToClipboard } from "src/base/copyToClipboard";
import { Delegate, delegates } from "src/elf-council-delegates/delegates";
import tw, {
  padding,
  textAlign,
  fontSize,
  fontWeight,
  textColor,
  textTransform,
  letterSpacing,
  whitespace,
  width,
  display,
  flexDirection,
  alignItems,
  overflow,
  verticalAlign,
  justifyContent,
  borderWidth,
  borderRadius,
  margin,
  divideWidth,
  divideColor,
  boxShadow,
  height,
} from "src/elf-tailwindcss-classnames";
import classnames from "classnames";
import { formatWalletAddress } from "src/formatWalletAddress";
import H3 from "src/ui/base/H3";
import Button from "src/ui/base/Button/Button";
import TextInput from "src/ui/base/Input/TextInput";
import { ButtonVariant } from "src/ui/base/Button/styles";
import { t } from "ttag";
import { useVotingPowerForAccount } from "src/ui/voting/useVotingPowerForAccount";
import { ONE_SECOND_IN_MILLISECONDS } from "src/base/time";

const baseHeaderClassName = tw(
  padding("px-4", "py-3"),
  textAlign("text-left"),
  fontSize("text-xs"),
  fontWeight("font-medium"),
  textColor("text-gray-500"),
  textTransform("uppercase"),
  letterSpacing("tracking-wider"),
);
const baseCellClassName = tw(
  padding("px-4", "py-4"),
  whitespace("whitespace-nowrap"),
  fontSize("text-sm"),
  fontWeight("font-medium"),
  textColor("text-gray-900"),
);

const rankHeaderClassName = tw(
  baseHeaderClassName,
  width("w-1/12"),
  textAlign("text-center"),
);
const delegateHeaderClassName = tw(baseHeaderClassName, width("w-4/12"));
const votesHeaderClassName = tw(baseHeaderClassName, width("w-2/12"));
const addressHeaderClassName = tw(baseHeaderClassName, width("w-5/12"));
const rankCellClassName = tw(
  baseCellClassName,
  width("w-1/12"),
  textAlign("text-center"),
);
const delegateCellClassName = tw(baseCellClassName, width("w-4/12"));
const votesCellClassName = tw(baseCellClassName, width("w-2/12"));
const addressCellClassName = tw(baseCellClassName, width("w-5/12"));

interface FeaturedDelegatesTableProps {
  search?: boolean;
}

export default function FeaturedDelegatesTable(
  props: FeaturedDelegatesTableProps,
): ReactElement {
  const { search = false } = props;

  const [searchResults, setSearchResults] = useState<Delegate[]>(delegates);
  const [searchInput, setSearchInput] = useState<string>("");

  return (
    <div
      className={tw(
        display("flex"),
        flexDirection("flex-col"),
        alignItems("items-start"),
      )}
    >
      <div
        className={classnames(
          "-my-2",
          tw(width("w-full"), overflow("overflow-x-auto")),
        )}
      >
        {/* Search feature */}
        {search ? (
          <DelegatesSearchBar
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            setSearchResults={setSearchResults}
          />
        ) : null}
        <div
          className={tw(
            padding("py-2", "sm:px-6", "lg:px-8"),
            verticalAlign("align-middle"),
            display("inline-block", "flex"),
            justifyContent("justify-center"),
          )}
        >
          <div
            className={tw(
              overflow("overflow-hidden"),
              borderWidth("border"),
              borderRadius("rounded-lg"),
            )}
          >
            <table
              className={tw(
                margin("m-auto"),
                divideWidth("divide-y"),
                divideColor("divide-gray-200"),
              )}
            >
              {/* Desktop Header */}
              <thead className={display("hidden", "sm:block")}>
                <tr>
                  <th scope="col" className={rankHeaderClassName}>
                    #
                  </th>
                  <th scope="col" className={delegateHeaderClassName}>
                    {t`Delegate Profile`}
                  </th>
                  <th
                    scope="col"
                    className={tw(
                      votesHeaderClassName,
                      display("hidden", "sm:table-cell"),
                    )}
                  >
                    {t`Votes`}
                  </th>
                  <th
                    scope="col"
                    className={tw(addressHeaderClassName, width("w-48"))}
                  >
                    {t`Address`}
                  </th>
                </tr>
              </thead>
              {/* Mobile Header */}
              <thead className={display("sm:hidden")}>
                <tr>
                  <th scope="col" className={rankHeaderClassName}>
                    #
                  </th>
                  <th
                    scope="col"
                    className={tw(
                      delegateHeaderClassName,
                      textAlign("text-center"),
                    )}
                  >
                    <span>{t`Delegate`}</span>
                    <br />
                    <span>{t`Profile`}</span>
                  </th>
                  <th
                    scope="col"
                    className={tw(
                      addressHeaderClassName,
                      textAlign("text-center"),
                    )}
                  >
                    <span>{t`Copy`}</span>
                    <br />
                    <span>{t`Address`}</span>
                  </th>
                </tr>
              </thead>
              {/* Desktop Cell */}
              <tbody className={display("hidden", "sm:block")}>
                {searchResults.map((delegate, index) => (
                  <tr key={delegate.address}>
                    <td className={rankCellClassName}>{index + 1}</td>
                    <td className={delegateCellClassName}>{delegate.name}</td>
                    <td
                      className={tw(
                        votesCellClassName,
                        display("hidden", "sm:table-cell"),
                      )}
                    >
                      <NumDelegatedVotes account={delegate.address} />
                    </td>
                    <td className={tw(addressCellClassName)}>
                      <div
                        className={tw(
                          display("flex"),
                          justifyContent("justify-center"),
                        )}
                      >
                        <CopyAddressButton address={delegate.address} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
              {/* Mobile Cell */}
              <tbody className={display("sm:hidden")}>
                {searchResults.map((delegate, index) => (
                  <tr key={delegate.address}>
                    <td className={rankCellClassName}>{index + 1}</td>
                    <td
                      className={tw(
                        baseCellClassName,
                        display("flex"),
                        flexDirection("flex-col"),
                        margin("mt-5"),
                      )}
                    >
                      <span>{delegate.name}</span>
                      <span>
                        <NumDelegatedVotes account={delegate.address} />
                      </span>
                    </td>
                    <td className={addressCellClassName}>
                      <div
                        className={tw(
                          display("flex"),
                          justifyContent("justify-center"),
                        )}
                      >
                        <CopyAddressButton address={delegate.address} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

interface CopyAddressButtonProps {
  address: string;
}
function CopyAddressButton(props: CopyAddressButtonProps) {
  const { address } = props;
  const [showTooltip, setShowTooltip] = useState(false);
  const onCopyAddress = useCallback(() => {
    setShowTooltip(true);
    setTimeout(() => setShowTooltip(false), ONE_SECOND_IN_MILLISECONDS);
    copyToClipboard(address);
  }, [address]);

  return (
    <Tooltip isOpen={showTooltip} content={t`Address copied`}>
      <div>
        <Button
          className={boxShadow("shadow-none")}
          variant={ButtonVariant.MINIMAL}
          onClick={onCopyAddress}
        >
          <div
            className={tw(
              display("hidden", "sm:block", "flex"),
              margin("mr-2"),
              alignItems("items-center"),
            )}
          >
            {formatWalletAddress(address)}
          </div>
          <DuplicateIcon />
        </Button>
      </div>
    </Tooltip>
  );
}

interface NumDelegatedVotesProps {
  account: string;
}
function NumDelegatedVotes(props: NumDelegatedVotesProps): ReactElement {
  const { account } = props;
  const votePower = useVotingPowerForAccount(account);
  return <span>{votePower}</span>;
}

interface DelegatesSearchBarProps {
  searchInput: string;
  setSearchInput: (input: string) => void;
  setSearchResults: (nextResults: Delegate[]) => void;
}

function DelegatesSearchBar(props: DelegatesSearchBarProps): ReactElement {
  const { searchInput, setSearchInput, setSearchResults } = props;

  const filterResults = useCallback(
    (searchString: string) => {
      if (!searchString) {
        setSearchResults(delegates);
        return;
      }

      const newResults = delegates.filter((d) => {
        const nameRegex = new RegExp(searchString, "i");
        const addressRegex = new RegExp(searchString);

        return nameRegex.test(d.name) || addressRegex.test(d.address);
      });

      setSearchResults(newResults);
    },
    [setSearchResults],
  );

  useEffect(() => {
    filterResults(searchInput);
  }, [searchInput, filterResults]);

  return (
    <div className={textColor("text-brandDarkBlue-dark")}>
      <H3>{t`Search Delegates`}</H3>
      <TextInput
        screenReaderLabel={t`Search Delegates`}
        id={"delegate-name-or-address"}
        name={t`Search Delegates`}
        placeholder={t`Insert Delegate Name or Address`}
        className={tw(margin("mb-8"), height("h-12"), textAlign("text-center"))}
        value={searchInput}
        onChange={(event) => setSearchInput(event.target.value)}
      />
    </div>
  );
}
