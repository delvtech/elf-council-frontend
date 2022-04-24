import React, { ReactElement } from "react";

import { Provider } from "@ethersproject/providers";
import { Signer } from "ethers";
import { parseEther } from "ethers/lib/utils";
import { t } from "ttag";

import { getEtherscanAddress } from "src/elf-etherscan/domain";
import { MerkleRewardType, useMerkleInfo } from "src/elf/merkle/useMerkleInfo";
import { useUnclaimedAirdrop } from "src/ui/airdrop/useUnclaimedAirdrop";
import { BalanceWithLabel } from "src/ui/base/BalanceWithLabel/BalanceWithLabel";
import LinkButton from "src/ui/base/Button/LinkButton";
import { ButtonVariant } from "src/ui/base/Button/styles";
import Card, { CardVariant } from "src/ui/base/Card/Card";
import ExternalLink from "src/ui/base/ExternalLink/ExternalLink";
import { useDeposited } from "src/ui/base/lockingVault/useDeposited";
import { useFormattedWalletAddress } from "src/ui/ethereum/useFormattedWalletAddress";
import { JoinGSCButton } from "src/ui/gsc/JoinGSCButton";
import { useGSCVotePowerThreshold } from "src/ui/gsc/useGSCVotePowerThreshold";
import { useIsGSCMember } from "src/ui/gsc/useIsGSCMember";
import { TooltipDefinition } from "src/ui/voting/tooltipDefinitions";
import { useVotingPowerForAccountAtLatestBlock } from "src/ui/voting/useVotingPowerForAccount";

interface PortfolioCardProps {
  account: string | undefined | null;
  provider?: Provider;
  signer: Signer | undefined;
}

export function PortfolioCard(props: PortfolioCardProps): ReactElement {
  const { account, provider, signer } = props;
  const formattedAddress = useFormattedWalletAddress(account, provider);

  const amountDeposited = useDeposited(account) || "0";

  const { data: merkleInfo } = useMerkleInfo(account, MerkleRewardType.RETRO);
  const unclaimedAirdrop = useUnclaimedAirdrop(account, merkleInfo);
  const votingPower = useVotingPowerForAccountAtLatestBlock(account);
  const showJoinButton = useShowJoinButton(account);

  return (
    <Card
      variant={CardVariant.GRADIENT}
      className="w-full shadow-md xl:max-w-[512px]"
    >
      <div>
        <span className="text-xl font-bold tracking-widest text-white">{t`Portfolio`}</span>
        {account && (
          <span className="ml-2 text-white">
            (
            <ExternalLink
              href={getEtherscanAddress(account)}
              text={formattedAddress || ""}
              className="inline-flex text-sm font-light text-white"
            />
            )
          </span>
        )}
      </div>
      <div className="mb-8 flex min-h-full flex-col align-bottom">
        <BalanceWithLabel
          className="mt-8 w-full"
          balance={amountDeposited}
          tooltipText={t`${TooltipDefinition.OWNED_ELFI}`}
          label={t`ELFI`}
        />
        <BalanceWithLabel
          className="mt-8 w-full"
          balance={votingPower}
          tooltipText={t`${TooltipDefinition.OWNED_VOTING_POWER}`}
          label={t`Your Voting Power`}
        />
        {!!Number(unclaimedAirdrop) && (
          <div className="mt-4 flex items-center justify-between border-t border-white pt-4">
            <BalanceWithLabel
              balance={unclaimedAirdrop}
              label={t`Unclaimed ELFI`}
            />
            <LinkButton
              link="/airdrop"
              className="mb-5 self-end"
              variant={ButtonVariant.OUTLINE_WHITE}
            >{t`Claim`}</LinkButton>
          </div>
        )}
        {showJoinButton && <JoinGSCButton account={account} signer={signer} />}
      </div>
    </Card>
  );
}

function useShowJoinButton(account: string | null | undefined) {
  const votePower = useVotingPowerForAccountAtLatestBlock(account);
  const { data: threshold, isSuccess } = useGSCVotePowerThreshold();
  const isOnGSC = useIsGSCMember(account);

  if (isSuccess && !!Number(votePower) && !!threshold) {
    const hasEnoughToJoinGSC = parseEther(votePower).gte(threshold);
    const canLeaveGSC = isOnGSC && parseEther(votePower).lt(threshold);

    return hasEnoughToJoinGSC || canLeaveGSC;
  }
}
