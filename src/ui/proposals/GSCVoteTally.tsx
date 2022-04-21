import { Provider } from "@ethersproject/providers";
import { ethers } from "ethers";
import { ReactElement } from "react";
import Button from "src/ui/base/Button/Button";
import { ButtonVariant } from "src/ui/base/Button/styles";
import { useFormattedWalletAddress } from "src/ui/ethereum/useFormattedWalletAddress";
import { WalletJazzicon } from "src/ui/wallet/WalletJazzicon";
import { t } from "ttag";

const forList = [
  ethers.Wallet.createRandom().address,
  ethers.Wallet.createRandom().address,
  ethers.Wallet.createRandom().address,
  ethers.Wallet.createRandom().address,
];
const againstList = [ethers.Wallet.createRandom().address];
const abstainList = [ethers.Wallet.createRandom().address];
const noVoteList = [
  ethers.Wallet.createRandom().address,
  ethers.Wallet.createRandom().address,
  ethers.Wallet.createRandom().address,
  ethers.Wallet.createRandom().address,
  ethers.Wallet.createRandom().address,
  ethers.Wallet.createRandom().address,
  ethers.Wallet.createRandom().address,
  ethers.Wallet.createRandom().address,
  ethers.Wallet.createRandom().address,
  ethers.Wallet.createRandom().address,
];
interface GSCVoteTallysProps {
  provider: Provider;
}

export function GSCVoteTallys(props: GSCVoteTallysProps): ReactElement {
  const { provider } = props;
  return (
    <div className="text-white">
      <h3 className="mt-4 mb-2">{t`For (4):`}</h3>
      <div className="grid w-full grid-cols-2 justify-between gap-1 lg:grid-cols-3">
        {forList.map((address) => (
          <GSCMember account={address} provider={provider} key={address} />
        ))}
      </div>
      <h3 className="mt-4 mb-2">{t`Against (1):`}</h3>
      <div className="grid w-full grid-cols-2 justify-between gap-1 lg:grid-cols-3">
        {againstList.map((address) => (
          <GSCMember account={address} provider={provider} key={address} />
        ))}
      </div>
      <h3 className="mt-4 mb-2">{t`Abstain (1):`}</h3>
      <div className="grid w-full grid-cols-2 justify-between gap-1 lg:grid-cols-3">
        {abstainList.map((address) => (
          <GSCMember account={address} provider={provider} key={address} />
        ))}
      </div>
      <h3 className="mt-4 mb-2">{t`No vote (10):`}</h3>
      <div className="grid w-full grid-cols-2 justify-between gap-1 lg:grid-cols-3">
        {noVoteList.map((address) => (
          <GSCMember account={address} provider={provider} key={address} />
        ))}
      </div>
    </div>
  );
}

export default GSCVoteTallys;

interface GSCMemberProps {
  account: string;
  provider: Provider;
}
function GSCMember(props: GSCMemberProps): ReactElement {
  const { account, provider } = props;

  const formattedAddress = useFormattedWalletAddress(account, provider);
  return (
    <Button variant={ButtonVariant.OUTLINE_WHITE}>
      <div className="flex w-full items-center overflow-hidden">
        <WalletJazzicon
          size={28}
          account={account}
          className="mr-4 flex-shrink-0 flex-grow-0"
        />
        <div className="max-w-0 flex-shrink text-sm font-thin">
          {formattedAddress}
        </div>
        {/* {formattedAddress} */}
      </div>
    </Button>
  );
}
