import {
  AddressesJsonFile,
  mainnetAddressList,
  goerliAddressList,
} from "elf-council-tokenlist";

// For local hardhat only, this is inlined as an object to preserve type safety
const testnetAddressList: AddressesJsonFile = {
  chainId: 31337,
  addresses: {
    elementToken: "0x3Aa5ebB10DC797CAC828524e59A333d0A371443c",
    coreVoting: "0xc6e7DF5E7b4f2A278906862b61205850344D4e7d",
    gscCoreVoting: "0x322813Fd9A801c5507c9de605d63CEA4f2CE6c44",
    gscVault: "0x09635F643e140090A9A8Dcd712eD6285858ceBef",
    timeLock: "0x7a2088a1bFc9d81c55368AE168C2C02570cB814F",
    lockingVault: "0x67d269191c92Caf3cD7723F116c85e6E9bf55933",
    vestingVault: "0xE6E340D132b5f46d1e472DebcD681B2aBc16e57E",
    optimisticRewardsVault: "0x0000000000000000000000000000000000000000",
    airdrop: "0x9E545E3C0baAB3E08CdfD552C960A1050f373042",
    optimisticGrants: "0x0000000000000000000000000000000000000000",
    treasury: "0xa82fF9aFd8f496c3d6ac40E2a0F282E47488CFc9",
    spender: "0x0000000000000000000000000000000000000000",
  },
};

// For testing only, this is inlined as an object to preserve type safety
const waffleAddressList: AddressesJsonFile = {
  addresses: {
    airdrop: "0x0BDb999cFA9c47d6d62323a1905F8Eb7B3c9B119",
    coreVoting: "0xFDFEF9D10d929cB3905C71400ce6be1990EA0F34",
    elementToken: "0xA193E42526F1FEA8C99AF609dcEabf30C1c29fAA",
    gscCoreVoting: "0xFf807885934003A35b1284d7445fc83Fd23417e5",
    gscVault: "0x84e924C5E04438D2c1Df1A981f7E7104952e6de1",
    lockingVault: "0x4E0597863fA1AA7B6b95a887AD9fEee038815642",
    optimisticGrants: "0x0000000000000000000000000000000000000000",
    optimisticRewardsVault: "0x0000000000000000000000000000000000000000",
    timeLock: "0xdCCc660F92826649754E357b11bd41C31C0609B9",
    treasury: "0x6f2fa37EBfaf089C4Fd7e6124C1028306943D11d",
    vestingVault: "0x2061701b22095418514C0D4a28366C54B1464C17",
    spender: "0x0000000000000000000000000000000000000000",
  },
  chainId: 31337,
};

// Default to the testnet in this repo so `npm start` Just Works without having
// to specify it on the command line. This requires a local hardhat node to be running.
const chainName = process.env.NEXT_PUBLIC_CHAIN_NAME || "testnet";

export const addressesJson = getAddressesList();

function getAddressesList(): AddressesJsonFile {
  if (process.env.NODE_ENV === "test") {
    return waffleAddressList;
  }

  // local hardhat
  if (chainName === "testnet") {
    return testnetAddressList;
  }

  if (chainName === "goerli") {
    return goerliAddressList;
  }

  if (chainName === "mainnet") {
    return mainnetAddressList;
  }

  // Should not happen because of chainName has a default value set, regardless
  // we can just default to local hardhat
  return testnetAddressList;
}
