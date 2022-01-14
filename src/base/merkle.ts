import { MerkleTree } from "merkletreejs";
import { BigNumberish, ethers } from "ethers";

export interface Account {
  address: string;
  value: BigNumberish;
}

export function getMerkleTree(accounts: Account[]): MerkleTree {
  const leaves = accounts.map((account) => hashAccount(account));
  return new MerkleTree(leaves, keccak256Custom, {
    hashLeaves: false,
    sortPairs: true,
  });
}

export function hashAccount(account: Account): string {
  return ethers.utils.solidityKeccak256(
    ["address", "uint256"],
    [account.address, account.value],
  );
}

// Horrible hack because the keccak256 package as used by openzepplin in tests is failing on our
// system somehow
function keccak256Custom(bytes: Buffer) {
  const buffHash = ethers.utils.solidityKeccak256(
    ["bytes"],
    [`0x${bytes.toString("hex")}`],
  );
  return Buffer.from(buffHash.slice(2), "hex");
}

// Examples:
//
// const proof = merkleTree.getHexProof(
//   await hashAccount({
//     address: signers[0].address,
//     value: FIFTY_ETHER,
//   })
// );

// const extraData = ethers.utils.defaultAbiCoder.encode(
//   ["uint256", "bytes32[]"],
//   [FIFTY_ETHER, proof]
// );
