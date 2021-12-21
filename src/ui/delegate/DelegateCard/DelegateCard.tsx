import {
  Fragment,
  ReactElement,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Signer } from "ethers";
import { ConnectWalletButton } from "src/ui/wallet/ConnectWalletButton/ConnectWalletButton";
import { ButtonVariant } from "src/ui/base/Button/styles";
import TextInput from "src/ui/base/Input/TextInput";
import { useChangeDelegation } from "src/ui/contracts/useChangeDelegation";
import { useDeposits } from "src/ui/contracts/useDeposits";
import { formatWalletAddress } from "src/formatWalletAddress";
import { isValidAddress } from "src/base/isValidAddress";
import { Delegate, delegates } from "src/elf-council-delegates/delegates";
import tw from "src/elf-tailwindcss-classnames";
import Button from "src/ui/base/Button/Button";
import { t } from "ttag";
import { CurrentDelegate } from "./CurrentDelegate";

interface DelegateCardProps {
  account: string | null | undefined;
  signer: Signer | undefined;
  currentDelegate: Delegate | undefined;
  setCurrentDelegate: (delegate: Delegate) => void;
}

function DelegateCard(props: DelegateCardProps): ReactElement {
  const { account, signer, currentDelegate, setCurrentDelegate } = props;

  const [delegateAddressInput, setDelegateAddressInput] = useState<
    string | undefined
  >();

  const { data: [delegateAddressOnChain, amountDelegated] = [] } =
    useDeposits(account);

  const { mutate: changeDelegation } = useChangeDelegation(signer);

  const onDelegateClick = useCallback(() => {
    if (delegateAddressInput && isValidAddress(delegateAddressInput)) {
      changeDelegation([delegateAddressInput]);
    }
  }, [changeDelegation, delegateAddressInput]);

  const walletLink = (
    <a
      className={tw("font-semibold", "text-brandDarkBlue", "hover:underline")}
      key="delegate-lnik"
      href={`https://etherscan.io/address/${delegateAddressOnChain}`}
    >
      {formatWalletAddress(delegateAddressOnChain || "")}
    </a>
  );

  useEffect(() => {
    if (
      delegateAddressOnChain &&
      delegates.map((d) => d.address).includes(delegateAddressOnChain)
    ) {
      const nextDelegate = delegates.find(
        (d) => d.address === delegateAddressOnChain
      );
      // The if conditional guarantees that nextDelegate won't be undefined
      setCurrentDelegate(nextDelegate as Delegate);
    }
  }, [delegateAddressOnChain, setCurrentDelegate]);

  return (
    <div className={tw({ "opacity-50": !account })}>
      <div className={tw("flex-1", "text-white", "text-xl")}>
        {t`Current Delegation`}
      </div>

      <div className={tw("flex", "gap-7", "mt-2")}>
        {/* Current Delegate Profile */}
        {currentDelegate && amountDelegated ? (
          <CurrentDelegate className={tw("w-1/2")} delegate={currentDelegate} />
        ) : (
          <NoDelegate />
        )}

        {/* Delegate Input */}
        <div className={tw("flex", "flex-col", "w-1/2")}>
          <TextInput
            screenReaderLabel={t`Enter delegate address`}
            id={"delegate-address"}
            name={t`Enter delegate address`}
            placeholder={t`Enter delegate address`}
            className={tw(
              "mb-4",
              "h-12",
              "text-left",
              "text-principalRoyalBlue",
              "placeholder-principalRoyalBlue"
            )}
            value={delegateAddressInput}
            onChange={(event) => setDelegateAddressInput(event.target.value)}
          />
          <div className={tw("text-center")}>
            <div className={tw("flex", "justify-end", "items-end")}>
              <Button
                onClick={onDelegateClick}
                variant={ButtonVariant.GRADIENT}
                className={tw("w-28", "justify-center")}
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
    <div
      className={tw(
        "grid",
        "place-items-center",
        "w-1/2",
        "bg-white",
        "rounded-md",
        "font-bold",
        "text-principalRoyalBlue",
        
      )}
    >
      <span>{t`No current delegation`}</span>
    </div>
  );
}

export default DelegateCard;
