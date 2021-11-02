# elf-council-addresses

## Background

This directory stores the `*.addresses.json` files used to run the app. 


Currently we only have a `testnet.addresses.json`.

## Usage

In your `.env` file, set the variable: `NEXT_PUBLIC_CHAIN_NAME`. If unset, this
defaults to the local `testnet`.

```
NEXT_NEXT_PUBLIC_CHAIN_NAME=<chain-name-here>
```

Now when you run the app, you can import the `<chain-name-here>.addresses.json` file normally, ie:

```ts
import { addressesJson } from "src/elf-council-addresses";

console.log("chainId", addressesJson.chainId);
console.log("Element Token address", addressesJson.addresses.elementToken);
```

## Note on adding new chains
Each `*.addresses.json` file must match the `AddressesJsonFile.ts` interface.