import { useQuery, UseQueryResult } from "react-query";

import {
  fetchSnapshotProposals,
  SnapshotProposal,
} from "src/elf-snapshot/queries/proposals";

export function useSnapshotProposals(
  snapshotIds: string[],
): UseQueryResult<SnapshotProposal[]> {
  return useQuery({
    queryKey: ["snapshot-proposals", snapshotIds],
    queryFn: async () => {
      const proposals = await fetchSnapshotProposals(snapshotIds);
      return proposals;
    },
  });
}
