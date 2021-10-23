import { useQuery, UseQueryResult } from "react-query";

import {
  fetchSnapshotProposals,
  SnapshotProposal,
} from "src/elf-snapshot/queries/proposals";

export function useSnapshotProposals(
  proposalIds: string[]
): UseQueryResult<SnapshotProposal[]> {
  return useQuery({
    queryKey: ["snapshot-proposals", proposalIds],
    queryFn: async () => {
      const proposals = await fetchSnapshotProposals(proposalIds);
      return proposals;
    },
  });
}
