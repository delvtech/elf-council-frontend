import React, { ReactElement, useCallback } from "react";

import {
  useSmartContractReadCall,
  useSmartContractTransaction,
} from "@elementfi/react-query-typechain";
import { ChevronDownIcon } from "@heroicons/react/solid";
import classNames from "classnames";
import { BigNumber, Signer } from "ethers";
import { parseEther } from "ethers/lib/utils";
import { t } from "ttag";

import { addressesJson } from "src/elf-council-addresses";
import {
  gscVaultContract,
  lockingVaultContract,
  vestingContract,
} from "src/elf/contracts";
import PopoverButton from "src/ui/base/Button/PopoverButton";
import { ButtonVariant } from "src/ui/base/Button/styles";
import Card, { CardVariant } from "src/ui/base/Card/Card";
import { useGSCVotePowerThreshold } from "src/ui/gsc/useGSCVotePowerThreshold";
import { useIsGSCMember } from "src/ui/gsc/useIsGSCMember";
import { useQueryVotePowerView } from "src/ui/voting/useQueryVotePower";
import { useVotingPowerForAccountAtLatestBlock } from "src/ui/voting/useVotingPowerForAccount";

const { lockingVault, vestingVault } = addressesJson.addresses;
interface JoinGSCButtonProps {
  account: string | null | undefined;
  signer: Signer | undefined;
  variant?: ButtonVariant;
}

export function JoinGSCButton(props: JoinGSCButtonProps): ReactElement {
  const { account, signer, variant = ButtonVariant.PRIMARY } = props;

  const votePower = useVotingPowerForAccountAtLatestBlock(account);
  const { data: threshold = BigNumber.from(0) } = useGSCVotePowerThreshold();
  const isOnGSC = useIsGSCMember(account);

  const hasEnoughToJoinGSC = parseEther(votePower).gte(threshold);
  const canLeaveGSC = isOnGSC && parseEther(votePower).lt(threshold);

  const handleJoin = useHandleJoin(account, signer);
  const handleLeave = useHandleLeave(account, signer);

  return (
    <PopoverButton
      variant={variant}
      disabled={false}
      className="p-0"
      popover={
        <Card variant={CardVariant.HACKER_SKY}>
          <div className="-mx-4 -my-5 flex flex-col py-2 text-white">
            <DropdownItem
              disabled={!hasEnoughToJoinGSC}
              label={t`Join`}
              onSelectItem={handleJoin}
            />
            <DropdownItem
              disabled={!canLeaveGSC}
              label={t`leave`}
              onSelectItem={handleLeave}
            />
          </div>
        </Card>
      }
    >
      {(open: boolean) => (
        <div className="flex w-[90px] items-center justify-center">
          <span>{t`Choose`}</span>

          <ChevronDownIcon
            className={classNames(
              open ? classNames("rotate-180 transform") : "",
              "ml-2 h-5 w-5 transition duration-150 ease-in-out",
            )}
            aria-hidden="true"
          />
        </div>
      )}
    </PopoverButton>
  );
}
interface DropdownItemProps {
  label: string;
  disabled?: boolean;
  onSelectItem: (choice: string) => void;
}

function DropdownItem(props: DropdownItemProps) {
  const { label, onSelectItem, disabled } = props;

  const handleSelectItem = useCallback(() => {
    onSelectItem(label);
  }, [label, onSelectItem]);

  return (
    <button
      disabled={disabled}
      className="flex w-[125px] items-center justify-between rounded px-3 py-2 hover:bg-principalRoyalBlue hover:bg-opacity-20"
      onClick={handleSelectItem}
    >
      <span className="mr-2 text-principalRoyalBlue">{label}</span>
    </button>
  );
}

const EMPTY_BYTE = "0x00";
function useHandleJoin(
  account: string | null | undefined,
  signer: Signer | undefined,
) {
  const { mutate: join } = useSmartContractTransaction(
    gscVaultContract,
    "proveMembership",
    signer,
  );

  const lockingVaultVotePower = useQueryVotePowerView(
    account,
    lockingVaultContract,
  );
  const vestingVaultVotePower = useQueryVotePowerView(account, vestingContract);

  const handleJoin = useCallback(async () => {
    const vaults: string[] = [];

    if (!!Number(lockingVaultVotePower)) {
      vaults.push(lockingVault);
    }

    if (!!Number(vestingVaultVotePower)) {
      vaults.push(vestingVault);
    }

    // stub out empty bytes for the extra data since neither locking nor vesting use it
    const extraData = vaults.map(() => EMPTY_BYTE);
    join([vaults, extraData]);
  }, [join, lockingVaultVotePower, vestingVaultVotePower]);

  return handleJoin;
}

function useHandleLeave(
  account: string | null | undefined,
  signer: Signer | undefined,
) {
  const { data: userVaults } = useSmartContractReadCall(
    gscVaultContract,
    "getUserVaults",
    { callArgs: [account as string], enabled: !!account },
  );

  const { mutate: kick } = useSmartContractTransaction(
    gscVaultContract,
    "kick",
    signer,
  );

  const handleLeave = useCallback(() => {
    if (!account) {
      return;
    }

    // stub out extra data since neither locking vault nor vesting vault use it
    const extraData = userVaults?.map(() => EMPTY_BYTE) || [];
    kick([account, extraData]);
  }, [account, kick, userVaults]);

  return handleLeave;
}
