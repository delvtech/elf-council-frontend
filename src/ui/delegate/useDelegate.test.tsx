import { waitFor } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";

import { testProvider } from "src/elf/providers/providers";
import { DEFAULT_TEST_TIMEOUT } from "src/test/constants";
import { createSnapshot, restoreSnapshot } from "src/test/snapshots";
import { useDelegate } from "src/ui/delegate/useDelegate";
import { queryClientWrapper } from "src/test/helpers/queryClientWrapper";
import setup from "src/test/setup";

describe("useDelegate", () => {
  beforeAll(async () => {
    await setup();
  });
  beforeEach(async () => {
    await createSnapshot(testProvider);
  }, DEFAULT_TEST_TIMEOUT);
  afterEach(async () => {
    await restoreSnapshot(testProvider);
  }, DEFAULT_TEST_TIMEOUT);

  test("should return undefined if no delegate", () => {
    const wallets = testProvider.getWallets();
    const user2 = wallets[2];

    //render the hook
    const { result } = renderHook(() => useDelegate(user2.address), {
      wrapper: queryClientWrapper,
    });
    expect(result.current).toBe(undefined);
  });

  test("should return delegate", async () => {
    const wallets = testProvider.getWallets();
    const user1 = wallets[1];

    //render the hook
    const { result } = renderHook(() => useDelegate(user1.address), {
      wrapper: queryClientWrapper,
    });

    await waitFor(() => {
      expect(result.current).toBe("0x63FC2aD3d021a4D7e64323529a55a9442C444dA0");
    });
  });
});
