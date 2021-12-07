import { parseEther } from "@ethersproject/units";
import { Tooltip } from "@material-ui/core";
import ContentCopyIcon from "@material-ui/icons/FileCopyOutlined";
import { Signer } from "ethers";
import React, { ReactElement, useCallback, useState } from "react";
import { copyToClipboard } from "src/base/copyToClipboard";
import { isValidAddress } from "src/base/isValidAddress";
import { delegates } from "src/elf-council-delegates/delegates";
import tw from "src/elf-tailwindcss-classnames";
import { useMerkleInfo } from "src/elf/merkle/useMerkleInfo";
import { formatWalletAddress } from "src/formatWalletAddress";
import { useClaimAirdrop } from "src/ui/airdrop/useClaimAirdrop";
import { useClaimAndDepositAirdrop } from "src/ui/airdrop/useClaimAndDepositAirdrop";
import Button from "src/ui/base/Button/Button";
import { ButtonVariant } from "src/ui/base/Button/styles";
import Card, { CardVariant } from "src/ui/base/Card/Card";
import TextInput from "src/ui/base/Input/TextInput";
import { useClaimAndDepositRewards } from "src/ui/rewards/useClaimAndDepositRewards";
import { useVotingPowerForAccount } from "src/ui/voting/useVotingPowerForAccount";
import { t } from "ttag";

interface DelegateStepCardProps {
  account: string | null | undefined;
  signer: Signer | undefined;
}

export function DelegateStepCard({
  account,
  signer,
}: DelegateStepCardProps): ReactElement {
  const [delegateAddress, setDelegateAddress] = useState("");
  const { data: merkleData } = useMerkleInfo(account);
  const { mutate: claim } = useClaimAirdrop(signer);
  const onClaimOnlyClick = useCallback(() => {
    if (account && merkleData) {
      claim([
        parseEther(merkleData.leaf.value),
        parseEther(merkleData.leaf.value),
        merkleData.proof,
        account,
      ]);
    }
  }, [account, claim, merkleData]);

  const { mutate: claimAndDeposit } = useClaimAndDepositAirdrop(signer);
  const onClaimAndDepositClick = useCallback(() => {
    if (account && merkleData) {
      claimAndDeposit([
        parseEther(merkleData.leaf.value),
        delegateAddress,
        parseEther(merkleData.leaf.value),
        merkleData.proof,
        account,
      ]);
    }
  }, [account, claimAndDeposit, delegateAddress, merkleData]);

  return (
    <Card
      variant={CardVariant.BLUE}
      className={tw("flex", "flex-col", "text-white", "text-center")}
    >
      <div className={tw("text-center", "text-sm", "mb-4")}>
        <div
          className={tw("tracking-wide")}
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
        <div
          className={tw(
            "bg-white",
            "bg-opacity-20",
            "p-1",
            "rounded-xl",
            "shadow",
            "h-96",
            "overflow-auto"
          )}
        >
          <FeaturedDelegatesTable />
        </div>
        <div className={tw("flex", "justify-end", "items-center", "w-full")}>
          <div
            className={tw("flex-1", "font-semibold", "text-left")}
          >{`${merkleData?.leaf.value} ELFI`}</div>
          <Button
            onClick={onClaimOnlyClick}
            className={tw("mr-4")}
            variant={ButtonVariant.MINIMAL}
          >
            <span className={tw("text-white", "text-xs")}>{t`Claim only`}</span>
          </Button>
          <Button
            disabled={!isValidAddress(delegateAddress)}
            onClick={onClaimAndDepositClick}
            variant={ButtonVariant.GRADIENT}
          >{t`Claim and delegate`}</Button>
        </div>
      </div>
    </Card>
  );
}

const headerClassName = tw(
  "px-6",
  "py-3",
  "text-left",
  "text-xs",
  "tracking-wide"
);
const cellClassName = tw(
  "px-6",
  "py-4",
  "whitespace-nowrap",
  "text-sm",
  "font-medium"
);
function FeaturedDelegatesTable(): ReactElement {
  return (
    <table className={tw("divide-y", "divide-gray-200")}>
      <thead>
        <tr>
          <th scope="col" className={headerClassName}>
            {t`Delegate`}
          </th>
          <th
            scope="col"
            className={tw("hidden", "md:table-cell", headerClassName)}
          >
            {t`Votes`}
          </th>
          <th scope="col" className={tw("w-48", "pl-11", headerClassName)}>
            {t`Address`}
          </th>
        </tr>
      </thead>
      <tbody>
        {delegates.map((delegate) => (
          <tr
            key={delegate.address}
            className={tw("hover:bg-white", "hover:bg-opacity-20")}
          >
            <td className={cellClassName}>{delegate.name}</td>
            <td className={tw("hidden", "md:table-cell", cellClassName)}>
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
    </table>
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
          <div className={tw("mr-2", "flex", "items-center", "text-white")}>
            {formatWalletAddress(address)}
          </div>
          <ContentCopyIcon className={tw("text-white")} />
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
