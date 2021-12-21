import { ReactElement, useCallback, useEffect, useState } from "react";
import { Signer } from "ethers";
import { ButtonVariant } from "src/ui/base/Button/styles";
import TextInput from "src/ui/base/Input/TextInput";
import { useChangeDelegation } from "src/ui/contracts/useChangeDelegation";
import { useDeposits } from "src/ui/contracts/useDeposits";
import { formatWalletAddress } from "src/formatWalletAddress";
import { isValidAddress } from "src/base/isValidAddress";
import { Delegate, delegates } from "src/elf-council-delegates/delegates";
import tw, {
  fontWeight,
  textColor,
  textDecoration,
  flex,
  opacity,
  margin,
  height,
  textAlign,
  placeholderColor,
  width,
  display,
  justifyContent,
  fontSize,
  gap,
  flexDirection,
  alignItems,
  placeItems,
  backgroundColor,
  borderRadius,
} from "src/elf-tailwindcss-classnames";
import Button from "src/ui/base/Button/Button";
import { t } from "ttag";
import CurrentDelegate from "src/ui/delegate/DelegateCard/CurrentDelegate";

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
      className={tw(
        fontWeight("font-semibold"),
        textColor("text-brandDarkBlue"),
        textDecoration("hover:underline"),
      )}
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
        (d) => d.address === delegateAddressOnChain,
      );
      // The if conditional guarantees that nextDelegate won't be undefined
      setCurrentDelegate(nextDelegate as Delegate);
    }
  }, [delegateAddressOnChain, setCurrentDelegate]);

  return (
    <div className={tw(opacity({ "opacity-50": !account }))}>
      <div
        className={tw(
          flex("flex-1"),
          textColor("text-white"),
          fontSize("text-xl"),
        )}
      >
        {t`Current Delegation`}
      </div>

      <div className={tw(display("flex"), gap("gap-7"), margin("mt-2"))}>
        {/* Current Delegate Profile */}
        {currentDelegate && amountDelegated ? (
          <CurrentDelegate
            className={tw(width("w-1/2"))}
            delegate={currentDelegate}
          />
        ) : (
          <NoDelegate />
        )}

        {/* Delegate Input */}
        <div
          className={tw(
            display("flex"),
            flexDirection("flex-col"),
            width("w-1/2"),
          )}
        >
          <TextInput
            screenReaderLabel={t`Enter delegate address`}
            id={"delegate-address"}
            name={t`Enter delegate address`}
            placeholder={t`Enter delegate address`}
            className={tw(
              margin("mb-4"),
              height("h-12"),
              textAlign("text-left"),
              textColor("text-principalRoyalBlue"),
              placeholderColor("placeholder-principalRoyalBlue"),
            )}
            value={delegateAddressInput}
            onChange={(event) => setDelegateAddressInput(event.target.value)}
          />
          <div className={tw(textAlign("text-center"))}>
            <div
              className={tw(
                display("flex"),
                justifyContent("justify-end"),
                alignItems("items-end"),
              )}
            >
              <Button
                onClick={onDelegateClick}
                variant={ButtonVariant.GRADIENT}
                className={tw(width("w-28"), justifyContent("justify-center"))}
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
        display("grid"),
        placeItems("place-items-center"),
        width("w-1/2"),
        backgroundColor("bg-white"),
        borderRadius("rounded-md"),
        fontWeight("font-bold"),
        textColor("text-principalRoyalBlue"),
      )}
    >
      <span>{t`No current delegation`}</span>
    </div>
  );
}

export default DelegateCard;
