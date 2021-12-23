import { parseEther } from "@ethersproject/units";
import { Tooltip } from "@material-ui/core";
import ContentCopyIcon from "@material-ui/icons/FileCopyOutlined";
import { Signer } from "ethers";
import React, { ReactElement, useCallback, useState } from "react";
import { copyToClipboard } from "src/base/copyToClipboard";
import { isValidAddress } from "src/base/isValidAddress";
import { delegates } from "src/elf-council-delegates/delegates";
import tw, {
  display,
  flexDirection,
  textColor,
  textAlign,
  fontSize,
  margin,
  letterSpacing,
  space,
  backgroundColor,
  backgroundOpacity,
  padding,
  borderRadius,
  boxShadow,
  height,
  overflow,
  justifyContent,
  alignItems,
  width,
  flex,
  fontWeight,
  whitespace,
  divideWidth,
  divideColor,
} from "src/elf-tailwindcss-classnames";
import { useMerkleInfo } from "src/elf/merkle/useMerkleInfo";
import { formatWalletAddress } from "src/formatWalletAddress";
import { AirdropFullyClaimedCard } from "src/ui/airdrop/AirdropFullyClaimedCard/AirdropFullyClaimedCard";
import { useClaimAirdrop } from "src/ui/airdrop/useClaimAirdrop";
import { useClaimAndDepositAirdrop } from "src/ui/airdrop/useClaimAndDepositAirdrop";
import { useUnclaimedAirdrop } from "src/ui/airdrop/useUnclaimedAirdrop";
import Button from "src/ui/base/Button/Button";
import { ButtonVariant } from "src/ui/base/Button/styles";
import Card, { CardVariant } from "src/ui/base/Card/Card";
import TextInput from "src/ui/base/Input/TextInput";
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
  const { data: merkleInfo } = useMerkleInfo(account);
  const { mutate: claim } = useClaimAirdrop(signer);

  const claimableBalance = useUnclaimedAirdrop(account, merkleInfo);
  const onClaimOnlyClick = useCallback(() => {
    if (account && merkleInfo) {
      claim([
        parseEther(merkleInfo.leaf.value),
        parseEther(merkleInfo.leaf.value),
        merkleInfo.proof,
        account,
      ]);
    }
  }, [account, claim, merkleInfo]);

  const { mutate: claimAndDeposit } = useClaimAndDepositAirdrop(signer);
  const onClaimAndDepositClick = useCallback(() => {
    if (account && merkleInfo) {
      claimAndDeposit([
        parseEther(merkleInfo.leaf.value),
        delegateAddress,
        parseEther(merkleInfo.leaf.value),
        merkleInfo.proof,
        account,
      ]);
    }
  }, [account, claimAndDeposit, delegateAddress, merkleInfo]);

  // user has no airdrop if they have a merkle value but have already claimed
  // the full amount
  if (merkleInfo && parseEther(claimableBalance).isZero()) {
    return <AirdropFullyClaimedCard account={account} />;
  }
  return (
    <Card
      variant={CardVariant.BLUE}
      className={tw(
        display("flex"),
        flexDirection("flex-col"),
        textColor("text-white"),
        textAlign("text-center"),
      )}
    >
      <div
        className={tw(
          textAlign("text-center"),
          fontSize("text-sm"),
          margin("mb-4"),
        )}
      >
        <div
          className={letterSpacing("tracking-wide")}
        >{t`Delegate your voting power`}</div>
      </div>
      <div className={space("space-y-4")}>
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
            backgroundColor("bg-white"),
            backgroundOpacity("bg-opacity-20"),
            padding("p-1"),
            borderRadius("rounded-xl"),
            boxShadow("shadow"),
            height("h-96"),
            overflow("overflow-auto"),
          )}
        >
          <FeaturedDelegatesTable />
        </div>
        <div
          className={tw(
            display("flex"),
            justifyContent("justify-end"),
            alignItems("items-center"),
            width("w-full"),
          )}
        >
          <div
            className={tw(
              flex("flex-1"),
              fontWeight("font-semibold"),
              textAlign("text-left"),
            )}
          >{`${merkleInfo?.leaf.value} ELFI`}</div>
          <Button
            onClick={onClaimOnlyClick}
            className={margin("mr-4")}
            variant={ButtonVariant.MINIMAL}
          >
            <span
              className={tw(textColor("text-white"), fontSize("text-xs"))}
            >{t`Claim only`}</span>
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
  padding("px-6", "py-3"),
  textAlign("text-left"),
  fontSize("text-xs"),
  letterSpacing("tracking-wide"),
);
const cellClassName = tw(
  padding("px-6", "py-4"),
  whitespace("whitespace-nowrap"),
  fontSize("text-sm"),
  fontWeight("font-medium"),
);
function FeaturedDelegatesTable(): ReactElement {
  return (
    <table
      className={tw(divideWidth("divide-y"), divideColor("divide-gray-200"))}
    >
      <thead>
        <tr>
          <th scope="col" className={headerClassName}>
            {t`Delegate`}
          </th>
          <th
            scope="col"
            className={tw(headerClassName, display("hidden", "md:table-cell"))}
          >
            {t`Votes`}
          </th>
          <th
            scope="col"
            className={tw(headerClassName, width("w-48"), padding("pl-11"))}
          >
            {t`Address`}
          </th>
        </tr>
      </thead>
      <tbody>
        {delegates.map((delegate) => (
          <tr
            key={delegate.address}
            className={tw(
              backgroundColor("hover:bg-white"),
              backgroundOpacity("hover:bg-opacity-20"),
            )}
          >
            <td className={cellClassName}>{delegate.name}</td>
            <td
              className={tw(cellClassName, display("hidden", "md:table-cell"))}
            >
              <NumDelegatedVotes account={delegate.address} />
            </td>
            <td className={tw(cellClassName, width("w-48"))}>
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
          className={boxShadow("shadow-none")}
          variant={ButtonVariant.MINIMAL}
          onClick={onCopyAddress}
        >
          <div
            className={tw(
              margin("mr-2"),
              display("flex"),
              alignItems("items-center"),
              textColor("text-white"),
            )}
          >
            {formatWalletAddress(address)}
          </div>
          <ContentCopyIcon className={textColor("text-white")} />
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
