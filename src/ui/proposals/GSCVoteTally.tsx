import { Provider } from "@ethersproject/providers";
import { ethers } from "ethers";
import { ReactElement } from "react";
import { t } from "ttag";
import { GSCMember } from "./GSCMember";

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
