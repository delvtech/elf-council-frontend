import { ReactElement, useCallback, useState } from "react";
import ContentCopyIcon from "@material-ui/icons/FileCopyOutlined";
import { t } from "ttag";
import { delegates } from "src/elf-council-delegates/delegates";
import { formatWalletAddress } from "src/formatWalletAddress";
import tw from "src/elf-tailwindcss-classnames";
import Button from "src/ui/base/Button/Button";
import { ButtonVariant } from "src/ui/base/Button/styles";
import { copyToClipboard } from "../../base/browser/copyToClipboard";
import { Tooltip } from "@material-ui/core";

const headerClassName = tw(
  "px-6",
  "py-3",
  "text-left",
  "text-xs",
  "font-medium",
  "text-gray-500",
  "uppercase",
  "tracking-wider"
);
const cellClassName = tw(
  "px-6",
  "py-4",
  "whitespace-nowrap",
  "text-sm",
  "font-medium",
  "text-gray-900"
);
export default function FeaturedDelegatesTable(): ReactElement {
  return (
    <div className={tw("flex", "flex-col")}>
      <div className={tw("-my-2", "overflow-x-auto", "sm:-mx-6", "lg:-mx-8")}>
        <div
          className={tw(
            "py-2",
            "align-middle",
            "inline-block",
            "min-w-full",
            "sm:px-6",
            "lg:px-8"
          )}
        >
          <div className={tw("overflow-hidden", "border", "rounded-lg")}>
            <table className={tw("min-w-full", "divide-y", "divide-gray-200")}>
              <thead>
                <tr>
                  <th scope="col" className={headerClassName}>
                    #
                  </th>
                  <th scope="col" className={headerClassName}>
                    {t`Delegate Profile`}
                  </th>
                  <th
                    scope="col"
                    className={tw("hidden", "md:table-cell", headerClassName)}
                  >
                    {t`Votes`}
                  </th>
                  <th
                    scope="col"
                    className={tw(
                      "w-4",
                      "hidden",
                      "lg:table-cell",
                      headerClassName
                    )}
                  >
                    {t`Proposals Voted`}
                  </th>
                  <th scope="col" className={tw("w-48", headerClassName)}>
                    {t`Address`}
                  </th>
                </tr>
              </thead>
              <tbody>
                {delegates.map((delegate, index) => (
                  <tr key={delegate.address}>
                    <td className={cellClassName}>{index + 1}</td>
                    <td className={cellClassName}>{delegate.name}</td>
                    <td
                      className={tw("hidden", "md:table-cell", cellClassName)}
                    >
                      {delegate.numDelegatedVotes}
                    </td>
                    <td
                      className={tw("hidden", "lg:table-cell", cellClassName)}
                    >
                      {delegate.numProposalsVoted}
                    </td>
                    <td className={tw("w-48", cellClassName)}>
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
          <div className={tw("mr-2", "flex", "items-center")}>
            {formatWalletAddress(address)}
          </div>
          <ContentCopyIcon />
        </Button>
      </div>
    </Tooltip>
  );
}
