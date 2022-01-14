import { parseEther } from "@ethersproject/units";
import { AddressesJsonFile } from "elf-council-tokenlist";
import { CoreVoting__factory } from "elf-council-typechain";
import { MockProvider } from "ethereum-waffle";
import { BytesLike, ethers, Wallet } from "ethers";

import timelockInterface from "src/test/interfaces/Timelock.json";

const ONE_WEEK = 7;
interface ProposalOptions {
  ballot?: number;

  // ether value of quorum, i.e. '50' will be 50e18
  quorum?: string;

  expired?: boolean;
}

export async function testProposal(
  owner: Wallet,
  provider: MockProvider,
  addressesJson: AddressesJsonFile,
  options: ProposalOptions,
): Promise<void> {
  // 2 is abstain
  const { quorum, ballot = 2, expired } = options;

  const {
    addresses: { lockingVault, timeLock, coreVoting },
  } = addressesJson;

  /********************************************************************************
   * Set up a new proposal.  This proposal will update the wait time for the Timelock contract.  The
   * wait time is the number of blocks that must pass before a proposal can be  executed*
   ********************************************************************************/
  const coreVotingContract = CoreVoting__factory.connect(coreVoting, owner);

  // for testnet we set this to 10 since blocks aren't automined.
  const newWaitTime = 10;
  const tInterface = new ethers.utils.Interface(timelockInterface.abi);

  // setup calldata for timelock's setTime function.
  const calldataTimelock = tInterface.encodeFunctionData("setWaitTime", [
    newWaitTime,
  ]);

  // get the callhash, this is how Timelock determines if the call is valid before it executes it
  const callHash = await createCallHash([calldataTimelock], [timeLock]);

  // calldata for the coreVoting contract
  const calldataCoreVoting = tInterface.encodeFunctionData("registerCall", [
    callHash,
  ]);

  const votingVaults = [lockingVault];

  // note that lockingVault doesn't require extra data when querying vote power, so we stub with "0x00"
  const extraVaultData = ["0x00"];
  const targets = [timeLock];
  const callDatas = [calldataCoreVoting];
  const currentBlock = await provider.getBlockNumber();
  const oneDayInBlocks = await coreVotingContract.DAY_IN_BLOCKS();
  const lastCall = oneDayInBlocks.toNumber() * ONE_WEEK + currentBlock;

  // record base quorum and set custom quorum if provided
  const baseQuorum = await coreVotingContract.baseQuorum();
  if (quorum) {
    (await coreVotingContract.setDefaultQuorum(parseEther(quorum))).wait(1);
  }

  // record lock duration and extra vote time, set custom if provided
  const baseLockDuration = await coreVotingContract.lockDuration();
  const baseVoteTime = await coreVotingContract.extraVoteTime();
  if (expired) {
    (await coreVotingContract.setLockDuration(1)).wait(1);
    (await coreVotingContract.changeExtraVotingTime(1)).wait(1);
  }

  const tx = await coreVotingContract.proposal(
    votingVaults,
    extraVaultData,
    targets,
    callDatas,
    lastCall,
    ballot,
  );
  await tx.wait(1);

  // reset quorum to original value
  if (quorum) {
    (await coreVotingContract.setDefaultQuorum(baseQuorum)).wait(1);
  }

  // reset lock duration and extra vote time to to original values
  if (expired) {
    (await coreVotingContract.setLockDuration(baseLockDuration)).wait(1);
    (await coreVotingContract.changeExtraVotingTime(baseVoteTime)).wait(1);
  }
}

export async function createCallHash(
  calldata: BytesLike[],
  targets: string[],
): Promise<string> {
  const toBeHashed = ethers.utils.defaultAbiCoder.encode(
    ["address[]", "bytes[]"],
    [targets, calldata],
  );
  return ethers.utils.keccak256(toBeHashed);
}
