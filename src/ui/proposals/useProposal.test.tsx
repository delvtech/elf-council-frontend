import { waitFor } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";

import { addressesJson } from "src/elf-council-addresses";
import { testProvider } from "src/elf/providers/providers";
import { DEFAULT_TEST_TIMEOUT } from "src/test/constants";
import { createDummyProposal } from "src/test/helpers/createDummyProposal";
import { renderHookWrapper } from "src/test/helpers/renderHookWrapper";
import setupFixture from "src/test/setupFixture";
import { createSnapshot, restoreSnapshot } from "src/test/snapshots";
import { useProposal } from "src/ui/proposals/useProposal";

describe("useProposal", () => {
  beforeAll(async () => {
    await setupFixture();
  });

  beforeEach(async () => {
    await createSnapshot(testProvider);
  }, DEFAULT_TEST_TIMEOUT);
  afterEach(async () => {
    await restoreSnapshot(testProvider);
  }, DEFAULT_TEST_TIMEOUT);

  test("should return an empty proposal", async () => {
    // if a proposal isn't found for a given proposalId, then we should receive an empty proposal
    // response.

    const { result } = renderHook(() => useProposal("0"), {
      wrapper: renderHookWrapper,
    });

    await waitFor(() => {
      expect(result.current).toMatchObject(EMPTY_PROPOSAL);
    });
  });

  // TODO: fix this test.  creating a dummy proposal is failing.
  test("should return a proposal", async () => {
    const wallets = testProvider.getWallets();
    const asdf = testProvider.callHistory;
    console.log("asdf", asdf);
    const owner = wallets[0];

    // TODO: use this to compare values from the useProposal hook
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const unusedProposal = await createDummyProposal(
      owner,
      testProvider,
      addressesJson,
      {},
    );
    const { result } = renderHook(() => useProposal("0"), {
      wrapper: renderHookWrapper,
    });

    await waitFor(() => {
      expect(result.current).toBe(EMPTY_PROPOSAL);
    });
  });
});

const EMPTY_PROPOSAL = {
  "0": "0x0000000000000000000000000000000000000000000000000000000000000000",
  "1": { _hex: "0x00", _isBigNumber: true },
  "2": { _hex: "0x00", _isBigNumber: true },
  "3": { _hex: "0x00", _isBigNumber: true },
  "4": { _hex: "0x00", _isBigNumber: true },
  "5": { _hex: "0x00", _isBigNumber: true },
  created: 0,
  expiration: 0,
  lastCall: 0,
  proposalHash:
    "0x0000000000000000000000000000000000000000000000000000000000000000",
  quorum: "0.0",
  unlock: 0,
};
