import { Tooltip } from "@material-ui/core";
import ContentCopyIcon from "@material-ui/icons/FileCopyOutlined";
import React, { ReactElement, useCallback, useState } from "react";
import { copyToClipboard } from "src/base/copyToClipboard";
import { isValidAddress } from "src/base/isValidAddress";
import { delegates } from "src/elf-council-delegates/delegates";
import tw from "src/elf-tailwindcss-classnames";
import { formatWalletAddress } from "src/formatWalletAddress";
import Button from "src/ui/base/Button/Button";
import { ButtonVariant } from "src/ui/base/Button/styles";
import Card, { CardVariant } from "src/ui/base/Card/Card";
import TextInput from "src/ui/base/Input/TextInput";
import { useVotingPowerForAccount } from "src/ui/voting/useVotingPowerForAccount";
import { ConnectWalletButton } from "src/ui/wallet/ConnectWalletButton/ConnectWalletButton";
import { t } from "ttag";

interface DelegateStepCardProps {}

export function DelegateStepCard({}: DelegateStepCardProps): ReactElement {
  const [delegateAddress, setDelegateAddress] = useState("");
  return (
    <Card
      variant={CardVariant.BLUE}
      className={tw("flex", "flex-col", "text-white", "text-center")}
    >
      <div className={tw("text-center", "text-sm", "mb-4")}>
        <div
          className={tw("font-semibold", "tracking-wider")}
        >{t`Delegate your voting power`}</div>
      </div>
      <div className={tw("space-y-4")}>
        <TextInput
          screenReaderLabel={t`Delegate address`}
          id={"delegate-address-input"}
          name={""}
          onChange={(e) => setDelegateAddress(e.target.value)}
          value={delegateAddress}
          placeholder={t`Copy and paste your delegate's address here`}
        />
        <div className={tw("bg-white", "bg-opacity-20")}>
          <FeaturedDelegatesTable />
        </div>
        <div className={tw("flex", "justify-end", "w-full")}>
          <Button className={tw("mr-4")} variant={ButtonVariant.MINIMAL}>
            <span className={tw("text-white", "text-xs")}>{t`Claim only`}</span>
          </Button>
          <Button
            disabled={!isValidAddress(delegateAddress)}
            variant={ButtonVariant.GRADIENT}
          >{t`Claim and delegate`}</Button>
        </div>
      </div>
    </Card>
  );
}

// const headerClassName = tw(
//   "px-6",
//   "py-3",
//   "text-left",
//   "text-xs",
//   "font-medium",
//   "text-gray-500",
//   "uppercase",
//   "tracking-wider"
// );
// const cellClassName = tw(
//   "px-6",
//   "py-4",
//   "whitespace-nowrap",
//   "text-sm",
//   "font-medium",
//   "text-gray-900"
// );
function FeaturedDelegatesTable(): ReactElement {
  return (
    <div className={tw("flex", "flex-col", "text-white")}>
      <div className={tw("-my-2", "overflow-x-auto", "sm:-mx-6", "lg:-mx-8")}>
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
            {/* <table className={tw("m-auto", "divide-y", "divide-gray-200")}>
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
                      <NumDelegatedVotes account={delegate.address} />
                    </td>
                    <td className={tw("w-48", cellClassName)}>
                      <div className={tw("flex", "justify-center")}>
                        <CopyAddressButton address={delegate.address} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table> */}
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

interface NumDelegatedVotesProps {
  account: string;
}
function NumDelegatedVotes(props: NumDelegatedVotesProps): ReactElement {
  const { account } = props;
  const votePower = useVotingPowerForAccount(account);
  return <span>{votePower}</span>;
}
