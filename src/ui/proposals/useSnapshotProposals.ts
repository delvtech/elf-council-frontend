import { useQuery, UseQueryResult } from "react-query";

import {
  fetchSnapshotProposals,
  SnapshotProposal,
} from "src/elf-snapshot/queries/proposals";

export function useSnapshotProposals(
  snapshotIds: string[] | undefined,
): UseQueryResult<SnapshotProposal[]> {
  return useQuery({
    queryKey: ["snapshot-proposals", snapshotIds],
    queryFn: async () => {
      const proposals = await fetchSnapshotProposals(snapshotIds as string[]);
      return proposals;
    },
    enabled: !!snapshotIds,
  });
}
