import { MockProvider } from "ethereum-waffle";

const snapshotIdStack: number[] = [];
export async function createSnapshot(provider: MockProvider): Promise<void> {
  const id = await provider.send("evm_snapshot", []);
  snapshotIdStack.push(id);
}

export async function restoreSnapshot(provider: MockProvider): Promise<void> {
  const id = snapshotIdStack.pop();
  try {
    await provider.send("evm_revert", [id]);
  } catch (ex) {
    throw new Error(`Snapshot with id #${id} failed to revert`);
  }
}
