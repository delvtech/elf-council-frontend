import { waitFor } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";

import { addressesJson } from "src/elf-council-addresses";
import { testProvider } from "src/elf/providers/providers";
import { DEFAULT_TEST_TIMEOUT } from "src/test/constants";
import { createDummyProposal } from "src/test/helpers/createDummyProposal";
import { queryClientWrapper } from "src/test/helpers/queryClientWrapper";
import setup from "src/test/setup";
import { createSnapshot, restoreSnapshot } from "src/test/snapshots";
import { useProposal } from "src/ui/proposals/useProposal";

describe("useProposal", () => {
  beforeAll(async () => {
    await setup();
  });
  beforeEach(async () => {
    await createSnapshot(testProvider);
  }, DEFAULT_TEST_TIMEOUT);
  afterEach(async () => {
    await restoreSnapshot(testProvider);
  }, DEFAULT_TEST_TIMEOUT);

  test("should return undefined if no proposal", () => {
    //render the hook
    const { result } = renderHook(() => useProposal("0"), {
      wrapper: queryClientWrapper,
    });
    expect(result.current).toBe(undefined);
  });

  test("should return a proposal", async () => {
    const wallets = testProvider.getWallets();
    const owner = wallets[0];
    const user1 = wallets[1];

    await createDummyProposal(owner, testProvider, addressesJson, {});
    //render the hook
    const { result } = renderHook(() => useProposal(user1.address), {
      wrapper: queryClientWrapper,
    });

    await waitFor(() => {
      expect(result.current).toBe("0x63FC2aD3d021a4D7e64323529a55a9442C444dA0");
    });
  });
});
