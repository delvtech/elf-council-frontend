import { useQuery } from "react-query";

const NODE_ENV = process.env.NODE_ENV;
export function useBlockAtTimestamp(
  timestampInSeconds: number
): number | undefined {
  const { data: blockNumber } = useQuery({
    queryKey: ["block-at-timestamp", timestampInSeconds],
    queryFn: async () => fetchBlockAtTimestamp(timestampInSeconds),
  });

  // quick hack to just get all the blocks for development
  if (NODE_ENV === "development") {
    return 0;
  }

  return blockNumber;
}
interface EtherscanResponse {
  status: string;
  message: string;
  result: string;
}
async function fetchBlockAtTimestamp(
  timestampInSeconds: number
): Promise<number> {
  const response: Response = await fetch(
    `https://api.etherscan.io/api?module=block&action=getblocknobytime&timestamp=${timestampInSeconds}&closest=before`
  );
  const { result } = (await response.json()) as EtherscanResponse;

  return Number(result);
}
