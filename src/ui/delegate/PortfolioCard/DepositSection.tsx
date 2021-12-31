import { ReactElement } from "react";
import { jt, t } from "ttag";
import { ethers, Signer } from "ethers";
import { parseEther, formatEther } from "ethers/lib/utils";
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

function DepositSection(props: DepositSectionProps): ReactElement {
  const { account, signer, currentDelegate, walletBalance } = props;

  const { value: depositAmount, setNumericValue: setDepositAmount } =
    useNumericInputValue();

  const clearDepositInput = () => setDepositAmount("");

  const { mutate: deposit, isLoading } = useDepositIntoLockingVault(
    signer,
    clearDepositInput,
  );

  const { data: allowanceBN } = useTokenAllowance(
    elementTokenContract,
    account,
    lockingVault,
  );

  const isAllowed = allowanceBN?.gt(parseEther(depositAmount || "0")) || false;
  const allowance = formatEther(allowanceBN || 0);

  const { mutate: allow } = useSetTokenAllowance(signer, elementToken);

  const onSetAllowance = () => {
    if (!account || !signer || !lockingVault) return;

    allow([lockingVault, ethers.constants.MaxUint256]);
  };

  const onDeposit = () => {
    if (!account || !signer || !currentDelegate) return;
    deposit([account, parseEther(depositAmount), currentDelegate.address]);
  };

  return (
    <div>
      <PortfolioDepositText />
      <div className="mt-3">
        <div className="text-white text-sm mb-2">
          {t`Tokens Eligible to Deposit: ${walletBalance}`}
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
          isLoading={isLoading}
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
      <div>
        <Link href="/resources">
          <a className="text-goldYellow">
            {t`To learn more about our vaults read here.`}
          </a>
        </Link>
      </div>
    </p>
  );
}

export default DepositSection;
