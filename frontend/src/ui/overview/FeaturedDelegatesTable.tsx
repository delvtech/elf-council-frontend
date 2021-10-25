import { ReactElement } from "react";
import ContentCopyIcon from "@material-ui/icons/FileCopyOutlined";
import { t } from "ttag";
import { delegates } from "src/elf-council-delegates/delegates";
import { formatWalletAddress } from "src/formatWalletAddress";
import tw from "src/elf-tailwindcss-classnames";

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
                  <th
                    scope="col"
                    className={tw(
                      "px-6",
                      "py-3",
                      "text-left",
                      "text-xs",
                      "font-medium",
                      "text-gray-500",
                      "uppercase",
                      "tracking-wider"
                    )}
                  >
                    #
                  </th>
                  <th
                    scope="col"
                    className={tw(
                      "px-6",
                      "py-3",
                      "text-left",
                      "text-xs",
                      "font-medium",
                      "text-gray-500",
                      "uppercase",
                      "tracking-wider"
                    )}
                  >
                    {t`Delegate Profile`}
                  </th>
                  <th
                    scope="col"
                    className={tw(
                      "px-6",
                      "py-3",
                      "text-left",
                      "text-xs",
                      "font-medium",
                      "text-gray-500",
                      "uppercase",
                      "tracking-wider"
                    )}
                  >
                    {t`Votes`}
                  </th>
                  <th
                    scope="col"
                    className={tw(
                      "px-6",
                      "py-3",
                      "text-left",
                      "text-xs",
                      "font-medium",
                      "text-gray-500",
                      "uppercase",
                      "tracking-wider"
                    )}
                  >
                    {t`Proposals Voted`}
                  </th>
                  <th
                    scope="col"
                    className={tw(
                      "px-6",
                      "py-3",
                      "text-left",
                      "text-xs",
                      "font-medium",
                      "text-gray-500",
                      "uppercase",
                      "tracking-wider"
                    )}
                  >
                    {t`Address`}
                  </th>
                </tr>
              </thead>
              <tbody>
                {delegates.map((delegate, index) => (
                  <tr key={delegate.address}>
                    <td
                      className={tw(
                        "px-6",
                        "py-4",
                        "whitespace-nowrap",
                        "text-sm",
                        "font-medium",
                        "text-gray-900"
                      )}
                    >
                      {index + 1}
                    </td>
                    <td
                      className={tw(
                        "px-6",
                        "py-4",
                        "whitespace-nowrap",
                        "text-sm",
                        "font-medium",
                        "text-gray-900"
                      )}
                    >
                      {delegate.name}
                    </td>
                    <td
                      className={tw(
                        "px-6",
                        "py-4",
                        "whitespace-nowrap",
                        "text-sm",
                        "text-gray-500"
                      )}
                    >
                      {delegate.numDelegatedVotes}
                    </td>
                    <td
                      className={tw(
                        "px-6",
                        "py-4",
                        "whitespace-nowrap",
                        "text-sm",
                        "text-gray-500"
                      )}
                    >
                      {delegate.numProposalsVoted}
                    </td>
                    <td
                      className={tw(
                        "px-6",
                        "py-4",
                        "whitespace-nowrap",
                        "text-sm",
                        "text-gray-500"
                      )}
                    >
                      <div className={tw("flex", "justify-between")}>
                        {formatWalletAddress(delegate.address)}{" "}
                        <ContentCopyIcon />
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
