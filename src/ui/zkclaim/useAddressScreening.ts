import { useQuery } from "react-query";

interface APIResponse {
  status: number;
  data: boolean | null;
  error: string | null;
}

interface UseAddressScreening {
  pass: boolean | null | undefined;
  error: unknown;
}

export default function useAddressScreening(
  address: string | null | undefined,
): UseAddressScreening {
  const { data: result, error } = useQuery<APIResponse>({
    queryKey: ["address-screen", address],
    queryFn: () =>
      fetch("https://6zqnxzsgja.execute-api.us-east-2.amazonaws.com/screen", {
        method: "POST",
        body: JSON.stringify({ address }),
      }).then((res) => res.json()),
    staleTime: Infinity,
    enabled: !!address,
    retry: 6,
  });
  return {
    pass: result?.data || undefined,
    error: result?.error || error,
  };
}
