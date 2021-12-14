import { ReactElement, useCallback, useState, useEffect } from "react";

import { Tooltip } from "@material-ui/core";
import ContentCopyIcon from "@material-ui/icons/FileCopyOutlined";
import { copyToClipboard } from "src/base/copyToClipboard";
import { Delegate, delegates } from "src/elf-council-delegates/delegates";
import tw from "src/elf-tailwindcss-classnames";
import { formatWalletAddress } from "src/formatWalletAddress";
import H3 from "src/ui/base/H3";
import Button from "src/ui/base/Button/Button";
import TextInput from "src/ui/base/Input/TextInput";
import { ButtonVariant } from "src/ui/base/Button/styles";
import { t } from "ttag";
import { useVotingPowerForAccount } from "src/ui/voting/useVotingPowerForAccount";

const baseHeaderClassName = tw(
  "px-4",
  "py-3",
  "text-left",
  "text-xs",
  "font-medium",
  "text-gray-500",
  "uppercase",
  "tracking-wider"
);
const baseCellClassName = tw(
  "px-4",
  "py-4",
  "whitespace-nowrap",
  "text-sm",
  "font-medium",
  "text-gray-900"
);

const rankHeaderClassName = tw(baseHeaderClassName, "w-1/12", "text-center");
const delegateHeaderClassName = tw(baseHeaderClassName, "w-4/12");
const votesHeaderClassName = tw(baseHeaderClassName, "w-2/12");
const addressHeaderClassName = tw(baseHeaderClassName, "w-5/12");
const rankCellClassName = tw(baseCellClassName, "w-1/12", "text-center");
const delegateCellClassName = tw(baseCellClassName, "w-4/12");
const votesCellClassName = tw(baseCellClassName, "w-2/12");
const addressCellClassName = tw(baseCellClassName, "w-5/12");

interface FeaturedDelegatesTableProps {
  search?: boolean;
}

export default function FeaturedDelegatesTable(
  props: FeaturedDelegatesTableProps
): ReactElement {
  const { search = false } = props;

  const [searchResults, setSearchResults] = useState<Delegate[]>(delegates);
  const [searchInput, setSearchInput] = useState<string>("");

  return (
    <div className={tw("flex", "flex-col", "items-start")}>
      <div className={tw("w-full", "-my-2", "overflow-x-auto")}>
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
            "py-2",
            "align-middle",
            "inline-block",
            "flex",
            "justify-center",
            "sm:px-6",
            "lg:px-8"
          )}
        >
          <div className={tw("overflow-hidden", "border", "rounded-lg")}>
            <table className={tw("m-auto", "divide-y", "divide-gray-200")}>
              {/* Desktop Header */}
              <thead className={tw("hidden", "sm:block")}>
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
                      "hidden",
                      "sm:table-cell",
                      votesHeaderClassName
                    )}
                  >
                    {t`Votes`}
                  </th>
                  <th
                    scope="col"
                    className={tw("w-48", addressHeaderClassName)}
                  >
                    {t`Address`}
                  </th>
                </tr>
              </thead>
              {/* Mobile Header */}
              <thead className={tw("sm:hidden")}>
                <tr>
                  <th scope="col" className={rankHeaderClassName}>
                    #
                  </th>
                  <th
                    scope="col"
                    className={tw("text-center", delegateHeaderClassName)}
                  >
                    <span>{t`Delegate`}</span>
                    <br />
                    <span>{t`Profile`}</span>
                  </th>
                  <th
                    scope="col"
                    className={tw("text-center", addressHeaderClassName)}
                  >
                    <span>{t`Copy`}</span>
                    <br />
                    <span>{t`Address`}</span>
                  </th>
                </tr>
              </thead>
              {/* Desktop Cell */}
              <tbody className={tw("hidden", "sm:block")}>
                {searchResults.map((delegate, index) => (
                  <tr key={delegate.address}>
                    <td className={rankCellClassName}>{index + 1}</td>
                    <td className={delegateCellClassName}>{delegate.name}</td>
                    <td
                      className={tw(
                        "hidden",
                        "sm:table-cell",
                        votesCellClassName
                      )}
                    >
                      <NumDelegatedVotes account={delegate.address} />
                    </td>
                    <td className={tw(addressCellClassName)}>
                      <div className={tw("flex", "justify-center")}>
                        <CopyAddressButton address={delegate.address} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
              {/* Mobile Cell */}
              <tbody className={tw("sm:hidden")}>
                {searchResults.map((delegate, index) => (
                  <tr key={delegate.address}>
                    <td className={rankCellClassName}>{index + 1}</td>
                    <td
                      className={tw(
                        baseCellClassName,
                        "flex",
                        "flex-col",
                        "mt-5"
                      )}
                    >
                      <span>{delegate.name}</span>
                      <span>
                        <NumDelegatedVotes account={delegate.address} />
                      </span>
                    </td>
                    <td className={addressCellClassName}>
                      <div className={tw("flex", "justify-center")}>
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
    setTimeout(() => setShowTooltip(false), 1000);
    copyToClipboard(address);
  }, [address]);

  return (
    <Tooltip arrow placement="top" open={showTooltip} title={t`Address copied`}>
      <div>
        <Button
          className={tw("shadow-none")}
          variant={ButtonVariant.MINIMAL}
          onClick={onCopyAddress}
        >
          <div
            className={tw("hidden", "sm:block", "mr-2", "flex", "items-center")}
          >
            {formatWalletAddress(address)}
          </div>
          <ContentCopyIcon />
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
    [setSearchResults]
  );

  useEffect(() => {
    filterResults(searchInput);
  }, [searchInput, filterResults]);

  return (
    <div className={tw("text-brandDarkBlue-dark")}>
      <H3>{t`Search Delegates`}</H3>
      <TextInput
        screenReaderLabel={t`Search Delegates`}
        id={"delegate-name-or-address"}
        name={t`Search Delegates`}
        placeholder={t`Insert Delegate Name or Address`}
        className={tw("mb-8", "h-12", "text-center")}
        value={searchInput}
        onChange={(event) => setSearchInput(event.target.value)}
      />
    </div>
  );
}
