import { ReactElement, useCallback, useState } from "react";

import { Tooltip } from "@material-ui/core";
import ContentCopyIcon from "@material-ui/icons/FileCopyOutlined";
import { copyToClipboard } from "src/base/copyToClipboard";
import { delegates } from "src/elf-council-delegates/delegates";
import tw from "src/elf-tailwindcss-classnames";
import { formatWalletAddress } from "src/formatWalletAddress";
import Button from "src/ui/base/Button/Button";
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
const addressCellClassName = tw(
  baseCellClassName,
  "w-5/12"
  // "-ml-4",
  // "sm:ml-0",
);
export default function FeaturedDelegatesTable(): ReactElement {
  return (
    <div className={tw("flex", "flex-col", "items-start")}>
      <div className={tw("w-full", "-my-2", "overflow-x-auto")}>
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
                {delegates.map((delegate, index) => (
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
                {delegates.map((delegate, index) => (
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
          <div className={tw("hidden", "xs:block", "mr-2", "flex", "items-center")}>
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
