import { ReactElement, useState, useEffect } from "react";
import { jt, t } from "ttag";
import { ethers, Signer } from "ethers";
import { commify, parseEther, formatEther } from "ethers/lib/utils";
import { format } from "d3-format";
import Link from "next/link";
import { Delegate } from "src/elf-council-delegates/delegates";
import { addressesJson } from "src/elf-council-addresses";
import { DepositInput } from "src/ui/overview/DepositCard/DepositInput";
import { useTokenAllowance } from "src/elf/token/useTokenAllowance";
import { elementTokenContract } from "src/elf/contracts";
import { useDepositIntoLockingVault } from "src/ui/rewards/useDepositIntoLockingVault";
import { useSetTokenAllowance } from "src/ui/base/token/useSetTokenAllowance";
import { useNumericInputValue } from "src/ui/base/Input/useNumericInputValue";
import Button from "src/ui/base/Button/Button";
import { ButtonVariant } from "src/ui/base/Button/styles";
import { DepositButton } from "src/ui/overview/DepositCard/DepositButton";

const { elementToken, lockingVault } = addressesJson.addresses;

interface DepositSectionProps {
  account: string | null | undefined;
  signer: Signer | undefined;
  currentDelegate: Delegate | undefined;
  walletBalance: string;
}

const MAX_INPUT = 1000000000;
const MAX_PRECISION = 18;

function DepositSection(props: DepositSectionProps): ReactElement {
  const { account, signer, currentDelegate, walletBalance } = props;
  const [depositInProgress, setDepositInProgress] = useState(false);

  const { value: depositAmount, setNumericValue: setDepositAmount } =
    useNumericInputValue({ max: MAX_INPUT, maxPrecision: MAX_PRECISION });

  const clearDepositInput = () => setDepositAmount("");

  const onDepositSuccess = () => {
    clearDepositInput();
    setDepositInProgress(false);
  };

  const { mutate: deposit, isLoading: depositLoading } =
    useDepositIntoLockingVault(signer, account, onDepositSuccess);

  const { data: allowanceBN } = useTokenAllowance(
    elementTokenContract,
    account,
    lockingVault,
  );

  const isAllowed = allowanceBN?.gt(parseEther(depositAmount || "0")) || false;
  const allowance = formatEther(allowanceBN || 0);

  const { mutate: allow, isLoading: allowanceLoading } = useSetTokenAllowance(
    signer,
    elementToken,
  );

  const onSetAllowance = () => {
    if (!account || !signer || !lockingVault) {
      return;
    }
    allow([lockingVault, ethers.constants.MaxUint256]);
  };

  const onDeposit = () => {
    if (!account || !signer || !currentDelegate) {
      return;
    }
    setDepositInProgress(true);
    deposit([account, parseEther(depositAmount), currentDelegate.address]);
  };

  useEffect(() => {
    // If the deposit failed
    if (!depositLoading && depositInProgress) {
      setDepositInProgress(false);
    }
  }, [depositInProgress, depositLoading]);

  return (
    <div>
      <PortfolioDepositText />
      <div className="mt-3">
        <div className="text-white text-sm mb-2">
          {t`Tokens Eligible to Deposit: ${commify(
            format(".4~f")(+walletBalance),
          )}
`}
        </div>
        <DepositInput
          depositAmount={depositAmount}
          balance={walletBalance}
          onDeposit={setDepositAmount}
          id={"deposit-amount"}
          name={t`Deposit amount`}
          placeholder={t`Insert amount to deposit`}
          screenReaderLabel={t`Amount to deposit`}
        />
      </div>
      <div className="w-full flex justify-end mt-4 gap-4">
        {!isAllowed ? (
          <Button
            onClick={onSetAllowance}
            disabled={!account}
            loading={allowanceLoading}
            variant={ButtonVariant.GRADIENT}
            className="w-28 justify-center"
          >
            {t`Allow`}
          </Button>
        ) : null}

        <DepositButton
          account={account}
          allowance={allowance}
          balance={walletBalance}
          depositAmount={depositAmount}
          isDelegated={!!currentDelegate}
          delegateAddress={currentDelegate?.address || ""}
          onDeposit={onDeposit}
          isLoading={depositLoading}
          buttonVariant={ButtonVariant.GRADIENT}
          buttonClassName="w-28 justify-center"
        />
      </div>
    </div>
  );
}

function PortfolioDepositText(): ReactElement {
  const deposit = (
    <span key="bold-deposit" className="font-bold">{t`deposit`}</span>
  );

  return (
    <p className="text-white font-light leading-5 text-sm">
      {jt`To protect our governance system, we ask our users to ${deposit} their tokens when they have the intention to vote and/or delegate.`}{" "}
      <span className="font-bold">
        {t`This verifies your eligibility to vote and/or delegate.`}
      </span>
      <span className="inline-block">
        <Link href="/resources">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a className="text-goldYellow">
            {t`To learn more about our vaults read here.`}
          </a>
        </Link>
      </span>
    </p>
  );
}

export default DepositSection;
