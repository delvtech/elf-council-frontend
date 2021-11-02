/**
 * Elf Council tokenlist type definitions.
 */
import { TokenInfo } from "@uniswap/token-lists";

export type ElementGovernanceTokenInfo = TokenInfo;

export interface CoreVotingContractTokenInfo extends TokenInfo {
  extensions: {
    dayInBlocks: number;
    baseQuorum: number;
    lockDuration: number;
    minProposalPower: number;
    extraVoteTime: number;
  };
}

export interface ElementLockingVaultTokenInfo extends TokenInfo {
  extensions: {
    token: string;
    staleBlockLag: number;
  };
}

export interface ElementOptimisticsRewardsVaultTokenInfo extends TokenInfo {
  extensions: {
    pendingRoot: string;
    proposalTime: number;
    proposer: string;
    challengePeriod: number;
    rewardsRoot: string;
    lockingVault: string;
    token: string;
  };
}
export interface ElementGSCVaultTokenInfo extends TokenInfo {
  extensions: {
    coreVoting: string;
    votingPowerBound: number;
    idleDuration: number;
  };
}

export type AnyTokenListInfo =
  | TokenInfo
  | ElementGovernanceTokenInfo
  | CoreVotingContractTokenInfo
  | ElementLockingVaultTokenInfo
  | ElementOptimisticsRewardsVaultTokenInfo
  | ElementGSCVaultTokenInfo;
