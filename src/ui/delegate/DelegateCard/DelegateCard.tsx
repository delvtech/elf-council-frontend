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

  const [editDelegate, setEditDelegate] = useState(false);

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
    <Fragment>
      <div className={tw("flex-1", "text-white", "font-light")}>
        {delegateAddressOnChain
          ? t`Current Delegate`
          : t`Currently No Delegation`}
      </div>

      {currentDelegate && amountDelegated ? (
        <Fragment>
          <CurrentDelegate
            delegate={currentDelegate}
            setEditDelegate={setEditDelegate}
          />
        </Fragment>
      ) : null}

      {/* Current Delegate Profile */}
      {!currentDelegate || editDelegate ? (
        <Fragment>
          <TextInput
            screenReaderLabel={t`Enter delegate address`}
            id={"delegate-address"}
            name={t`Enter delegate address`}
            placeholder={t`Enter delegate address`}
            className={tw(
              "my-4",
              "h-12",
              "text-left",
              "text-principalRoyalBlue",
              "placeholder-principalRoyalBlue"
            )}
            value={delegateAddressInput}
            onChange={(event) => setDelegateAddressInput(event.target.value)}
          />
          <div className={tw("text-center")}>
            {account ? (
              <div className={tw("w-full", "flex", "justify-end")}>
                <Button
                  onClick={onDelegateClick}
                  variant={ButtonVariant.WHITE}
                >{t`Delegate`}</Button>
              </div>
            ) : (
              <ConnectWalletButton
                label={t`Connect your wallet to delegate your vote`}
                variant={ButtonVariant.WHITE}
              />
            )}
          </div>
        </Fragment>
      ) : null}
    </Fragment>
  );
}

export default DelegateCard;
