import React, { ReactElement, ReactNode } from "react";
import { QueryClientProvider } from "react-query";

import { renderHook } from "@testing-library/react-hooks";
import { waitFor } from "@testing-library/react";

import { testProvider } from "src/elf/providers/providers";
import { queryClient } from "src/elf/queryClient";
import {
  deployGovernanace,
  GovernanceContracts,
} from "src/test/helpers/deployGovernance";
import { initializeGovernance } from "src/test/helpers/initializeGovernance";
import { createSnapshot, restoreSnapshot } from "src/test/snapshots";
import { useDelegate } from "src/ui/delegate/useDelegate";

const DEFAULT_TIMEOUT = 20000;

interface WrapperProps {
  children: ReactNode;
}

function wrapper({ children }: WrapperProps): ReactElement {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

describe("useDelegate", () => {
  let governanceContracts: GovernanceContracts = {} as GovernanceContracts;
  beforeAll(async () => {
    const wallets = testProvider.getWallets();
    const [owner] = wallets;
    governanceContracts = await deployGovernanace(owner, wallets);
    await initializeGovernance(governanceContracts);
  }, DEFAULT_TIMEOUT);
  beforeEach(async () => {
    await createSnapshot(testProvider);
  }, DEFAULT_TIMEOUT);
  afterEach(async () => {
    await restoreSnapshot(testProvider);
  }, DEFAULT_TIMEOUT);

  test("should return undefined if no delegate", () => {
    const wallets = testProvider.getWallets();
    const user2 = wallets[2];

    //render the hook
    const { result } = renderHook(() => useDelegate(user2.address), {
      wrapper,
    });
    expect(result.current).toBe(undefined);
  });

  test("should return delegate", async () => {
    const wallets = testProvider.getWallets();
    const user1 = wallets[1];

    //render the hook
    const { result } = renderHook(() => useDelegate(user1.address), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current).toBe("0x63FC2aD3d021a4D7e64323529a55a9442C444dA0");
    });
  });
});
