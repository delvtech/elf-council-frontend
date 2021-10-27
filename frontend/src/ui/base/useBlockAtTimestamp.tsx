import { useQuery } from "react-query";

export function useBlockAtTimestamp(
  timestampInSeconds: number
): number | undefined {
  const { data: blockNumber } = useQuery({
    queryKey: ["block-at-timestamp", timestampInSeconds],
    queryFn: async () => fetchBlockAtTimestamp(timestampInSeconds),
  });
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
