import { useQuery } from "react-query";
import { useLatestBlockNumber } from "src/ui/ethereum/useLatestBlockNumber";

const NODE_ENV = process.env.NODE_ENV;
export function useBlockAtTimestamp(
  timestampInSeconds: number,
): number | undefined {
  const { data: blockNumber } = useQuery({
    queryKey: ["block-at-timestamp", timestampInSeconds],
    queryFn: async () => fetchBlockAtTimestamp(timestampInSeconds),
  });

  // quick hack to get some blocks for development
  const { data: latestBlockNumber = 100 } = useLatestBlockNumber();
  if (NODE_ENV === "development") {
    return latestBlockNumber - 100;
  }

  return blockNumber;
}
interface EtherscanResponse {
  status: string;
  message: string;
  result: string;
}
async function fetchBlockAtTimestamp(
  timestampInSeconds: number,
): Promise<number> {
  const response: Response = await fetch(
    `https://api.etherscan.io/api?module=block&action=getblocknobytime&timestamp=${timestampInSeconds}&closest=before`,
  );
  const { result } = (await response.json()) as EtherscanResponse;

  return Number(result);
}
