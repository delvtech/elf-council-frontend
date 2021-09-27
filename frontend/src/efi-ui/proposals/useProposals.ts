import { useQuery } from "react-query";

import request, { gql } from "graphql-request";

export function useProposals(): any {
  return useQuery(["proposals"], async () => {
    const { proposals } = await request(
      endpoint,
      gql`
        query {
          proposals(
            first: 20
            skip: 0
            # where: { space_in: ["balancer", "yam.eth"], state: "closed" }
            orderBy: "created"
            orderDirection: desc
          ) {
            id
            title
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
  });
}

const endpoint = "https://hub.snapshot.org/graphql";
