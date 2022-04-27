import {
  MerkleRewards,
  MockERC20,
  MockERC20__factory,
} from "@elementfi/elf-council-typechain";
import { BigNumber, ethers, Wallet } from "ethers";
import { parseEther } from "ethers/lib/utils";
import { Account, getMerkleTree } from "src/base/merkle";

import { deployAirdrop } from "./deployAirdrop";
import { deployCoreVoting } from "./deployCoreVoting";
import { deployGSCVault } from "./deployGSCVault";
import { deployLockingVault } from "./deployLockingVault";
import { deployTimelock } from "./deployTimelock";
import { deployTreasury } from "./deployTreasury";
import { deployVestingVault } from "./deployVestingVault";
import { deployVotingToken } from "./deployVotingToken";

const FIFTY_VOTING_TOKENS = parseEther("50");
const STALE_BLOCK_LAG = 10000;

// addresses of deployed contracts
export interface GovernanceContracts {
  elementToken: string;
  coreVoting: string;
  gscCoreVoting: string;
  gscVault: string;
  timeLock: string;
  lockingVault: string;
  vestingVault: string;
  optimisticRewardsVault: string;
  optimisticGrants: string;
  treasury: string;
  airdrop: string;
}

export async function deployGovernanace(
  signer: Wallet,
  signers: Wallet[],
): Promise<GovernanceContracts> {
  const votingToken = await deployVotingToken(signer);

  // deploy core voting contract, we'll have to fill in address values later
  const coreVoting = await deployCoreVoting(
    signer,
    [],
    signer.address,
    // set quorum to 50 ELFI so any test account can pass a vote
    "50",
    // set minProposalPower to 50 ELFI so any test account can make a proposal
    "50",
    // don't care about the gsc vault yet, that will get set after we deploy the gsc vault
    ethers.constants.AddressZero,
    // can execute a proposal 10 blocks after it gets created
    "10",
    // can vote on a proposal up to 15 blocks from when it gets created
    "15",
  );

  // deploy the core voting vault controlled by the GSC Vault
  const gscCoreVoting = await deployCoreVoting(
    signer,
    [],
    // QUESTION: setting the signer here to the timelock owner here so I can use 'authorize' later.
    // is this right?
    signer.address,
    // what values should I be setting these to in order to test GSC powers in developmet?
    // for now, set to 1 so that GSC can pass things easily in development
    "1",
    "1",
    ethers.constants.AddressZero,
  );

  const timeLock = await deployTimelock(
    signer,
    // can execute a proposal 10 blocks after it gets created
    "10",
    signer.address,
    signer.address,
  );

  const gscVault = await deployGSCVault(
    signer,
    gscCoreVoting.address,
    // any test account can get onto GSC with this much vote power
    "100",
    timeLock.address,
  );

  // deploy locking vault behind a proxy so it's upgradeable
  const lockingVault = await deployLockingVault(
    signer,
    votingToken.address,
    timeLock.address,
    STALE_BLOCK_LAG,
  );

  // deploy vesting vault
  const vestingVault = await deployVestingVault(
    signer,
    votingToken.address,
    timeLock.address,
    STALE_BLOCK_LAG,
  );

  // give out some grants to signers[2] and signers[3]

  const accounts: Account[] = [];
  for (const i in signers) {
    accounts.push({
      address: signers[i].address,
      value: FIFTY_VOTING_TOKENS,
    });
  }

  const merkleTree = getMerkleTree(accounts);

  const airdropContract = await deployAirdrop(
    signer,
    votingToken.address,
    coreVoting.address,
    merkleTree,
    lockingVault.address,
  );

  const treasuryContract = await deployTreasury(signer, timeLock.address);

  await giveRewardsVaultTokens(accounts, votingToken, signer, airdropContract);

  // add approved governance vaults. signer is still the owner so we can set these
  await coreVoting.changeVaultStatus(lockingVault.address, true);
  await coreVoting.changeVaultStatus(airdropContract.address, true);
  await coreVoting.changeVaultStatus(vestingVault.address, true);

  // NOTE: these are disabled right now because we need ownership of the contracts to set values
  // such that we can create expired proposals etc. to set up the tesnet

  // finalize permissions for coreVoting contract, gscCoreVoting is authorized to make proposoals
  // without needing minimum proposal power, setting the owner to timelock so that it can execute
  // proposals.
  // await coreVoting.authorize(gscCoreVoting.address);
  // await coreVoting.setOwner(timeLock.address);

  // finalize permissions for timeLock contract, coreVoting is the owner so that it can post proposals
  // to the timelock.  gsc is authorized for some reason.  remove the address that deployed this contract.
  // await timeLock.deauthorize(signer.address);
  // await timeLock.authorize(gscCoreVoting.address);
  // await timeLock.setOwner(coreVoting.address);

  // finalize permissions for gscCoreVoting contract, gscVault authorized to make proposals without
  // vote.  timelock set as owner so it can execute proposals.
  // await gscCoreVoting.authorize(gscVault.address);
  // await gscCoreVoting.setOwner(timeLock.address);

  return {
    elementToken: votingToken.address,
    coreVoting: coreVoting.address,
    gscCoreVoting: gscCoreVoting.address,
    gscVault: gscVault.address,
    timeLock: timeLock.address,
    lockingVault: lockingVault.address,
    vestingVault: vestingVault.address,
    optimisticRewardsVault: ethers.constants.AddressZero,
    airdrop: airdropContract.address,
    optimisticGrants: ethers.constants.AddressZero,
    treasury: treasuryContract.address,
  };
}

async function giveRewardsVaultTokens(
  accounts: Account[],
  votingToken: MockERC20,
  signer: Wallet,
  optimisticRewardsVault: MerkleRewards,
) {
  const totalValueBN = accounts.reduce((total: BigNumber, account: Account) => {
    const { value } = account;
    return total.add(value);
  }, BigNumber.from(0));
  const tokenContract = MockERC20__factory.connect(votingToken.address, signer);
  const setBalanceTx = await tokenContract.setBalance(
    optimisticRewardsVault.address,
    totalValueBN,
  );
  await setBalanceTx.wait(1);
}
