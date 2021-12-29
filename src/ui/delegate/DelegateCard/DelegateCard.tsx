import { ReactElement, useState, useCallback, useEffect } from "react";
import { Signer } from "ethers";
import { ButtonVariant } from "src/ui/base/Button/styles";
import TextInput from "src/ui/base/Input/TextInput";
import { useChangeDelegation } from "src/ui/contracts/useChangeDelegation";
import { useDeposits } from "src/ui/contracts/useDeposits";
import { formatWalletAddress } from "src/formatWalletAddress";
import { isValidAddress } from "src/base/isValidAddress";
import { Delegate, delegates } from "src/elf-council-delegates/delegates";
import Button from "src/ui/base/Button/Button";
import { t } from "ttag";
import CurrentDelegate from "src/ui/delegate/DelegateCard/CurrentDelegate";
import classNames from "classnames";
import { BadgeCheckIcon, CheckIcon } from "@heroicons/react/solid";

interface DelegateCardProps {
  account: string | null | undefined;
  signer: Signer | undefined;
  vaultBalance: string;
  currentDelegate: Delegate | undefined;
  setCurrentDelegate: (delegate: Delegate) => void;
  delegateAddressInput: string;
  setDelegateAddressInput: (address: string) => void;
  verifiedDelegate: string;
}

function DelegateCard(props: DelegateCardProps): ReactElement {
  const {
    account,
    signer,
    vaultBalance,
    currentDelegate,
    setCurrentDelegate,
    delegateAddressInput,
    setDelegateAddressInput,
    verifiedDelegate,
  } = props;

  const [delegateChanged, setDelegateChanged] = useState(false);

  const { data: [delegateAddressOnChain, amountDelegated] = [] } =
    useDeposits(account);

  const { mutate: changeDelegation, isSuccess } = useChangeDelegation(signer);

  const onDelegateClick = useCallback(() => {
    if (delegateAddressInput && isValidAddress(delegateAddressInput)) {
      changeDelegation([delegateAddressInput]);
    }
  }, [changeDelegation, delegateAddressInput]);

  const walletLink = (
    <a
      className="font-semibold text-brandDarkBlue hover:underline"
      key="delegate-link"
      href={`https://etherscan.io/address/${delegateAddressOnChain}`}
    >
      {formatWalletAddress(delegateAddressOnChain || "")}
    </a>
  );

  const toggleDelegateChange = () => {
    setDelegateChanged(true);
    setTimeout(() => {
      setDelegateChanged(false);
    }, 2000);
  };

  useEffect(() => {
    if (delegateAddressOnChain && isSuccess) {
      const nextDelegate = delegates.find(
        (d) => d.address === delegateAddressOnChain,
      );

      if (nextDelegate) {
        setDelegateAddressInput("");
        setCurrentDelegate(nextDelegate);
        toggleDelegateChange();
      }
    }
  }, [
    isSuccess,
    delegateAddressOnChain,
    setCurrentDelegate,
    setDelegateAddressInput,
  ]);

  return (
    <div className={classNames({ "opacity-50": !account })}>
      <div className="flex gap-7 flex-1 text-white text-xl">
        <div className="w-1/2">
          <span>{t`Current Delegation`}</span>
        </div>
        <div className="w-1/2 leading-5">
          <span>{t`Change Delegation`}</span>
          <span className="inline-block text-sm">{t`Tokens Eligible to Delegate: ${vaultBalance}`}</span>
        </div>
      </div>

      <div className="flex gap-7 mt-2">
        {/* Current Delegate Profile */}
        {currentDelegate && amountDelegated ? (
          <CurrentDelegate className="w-1/2" delegate={currentDelegate} />
        ) : (
          <NoDelegate />
        )}

        {/* Delegate Input */}
        <div className="flex flex-col w-1/2">
          <div className="relative mb-4 rounded-md overflow-hidden">
            <TextInput
              screenReaderLabel={t`Enter delegate address`}
              id={"delegate-address"}
              name={t`Enter delegate address`}
              placeholder={t`Enter delegate address`}
              className={classNames(
                "h-12 text-left text-principalRoyalBlue placeholder-principalRoyalBlue",
                { "pr-12": !!verifiedDelegate },
              )}
              value={delegateAddressInput}
              onChange={(event) => setDelegateAddressInput(event.target.value)}
              disabled={!account}
            />

            {!!verifiedDelegate ? (
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 mr-4">
                <CheckIcon className="fill-topaz h-6" />
              </div>
            ) : null}

            {delegateChanged ? (
              <div className="flex absolute inset-0 bg-topaz items-center justify-center gap-2">
                <span className="text-white">Delegate Succession</span>
                <BadgeCheckIcon className="fill-white h-6" />
              </div>
            ) : null}
          </div>
          <div className="text-center">
            <div className="flex justify-end items-end">
              <Button
                onClick={onDelegateClick}
                variant={ButtonVariant.GRADIENT}
                className="w-28 justify-center"
                disabled={!account}
              >{t`Delegate`}</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NoDelegate(): ReactElement {
  return (
    <div className="grid place-items-center w-1/2 bg-white rounded-md font-bold text-principalRoyalBlue">
      <span>{t`No current delegation`}</span>
    </div>
  );
}

export default DelegateCard;
