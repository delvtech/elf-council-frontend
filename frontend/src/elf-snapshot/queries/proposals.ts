import { gql, request } from "graphql-request";
import { SNAPSHOT_GRAPHQL_ENDPOINT } from "src/elf-snapshot/endpoints";

export interface SnapshotProposal {
  /**
   * Wallet address
   */
  author: string;
  body: string;
  /**
   * Human readable choices,
   * eg: ['Aprove', 'Deny'], ['Keep $BANANAS', 'Eat $BANANAS']
   */
  choices: string[];
  /**
   * Time in seconds
   */
  end: number;
  id: string;
  link: string;
  snapshot: string;
  space: { id: string; name: string };
  /**
   * Time in seconds
   */
  start: string;
  state: "active" | "closed" | "pending";
  title: string;
}

export async function fetchSnapshotProposals(
  proposalIds: string[]
): Promise<SnapshotProposal> {
  const { proposals } = await request(
    SNAPSHOT_GRAPHQL_ENDPOINT,
    gql`
      query {
        proposals(
          where: { id_in: ${JSON.stringify(proposalIds)} }
        ) {
          id
          title
          link
          body
          choices
          start
          end
          snapshot
          state
          author
          space {
            id
            name
          }
        }
      }
    `
  );
  return proposals;
}
