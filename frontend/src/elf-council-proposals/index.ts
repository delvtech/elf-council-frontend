import { testnetProposals } from "elf-council-proposals";
import keyBy from "lodash.keyby";

// TODO: Choose the right proposalsJson based on environment
export const proposalsJson = testnetProposals;

export const proposalsBySnapShotId = keyBy(
  proposalsJson.proposals,
  "snapshotId"
);

export const proposalsByOnChainId = keyBy(
  proposalsJson.proposals,
  "proposalId"
);
