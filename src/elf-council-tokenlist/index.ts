import { TokenInfo, TokenList } from "@uniswap/token-lists";
import keyBy from "lodash.keyby";
import { AnyTokenListInfo } from "src/elf-council-tokenlist/types";

// Default to the testnet in this repo so `npm start` Just Works without having
// to specify it on the command line.
// TODO: Add this env variable (ie: "mainnet") to .env file when we're ready
const chainName = process.env.NEXT_PUBLIC_CHAIN_NAME || "testnet";

// Import statements in TS are statically checked, and will throw compile-time
// errors if the file doesn't exist. Require statements on the other hand are
// dynamic and will throw an error at runtime. For tools like eslint and
// dependency-cruiser, we don't need to run the app, but we need TS to compile
// correctly, so we use a require() statement here.
// eslint-disable-next-line @typescript-eslint/no-var-requires
export const tokenListJson: TokenList = require(`src/elf-council-tokenlist/${chainName}.tokenlist.json`);

// Do not export this, use getTokenInfo<T> instead
const tokenMetadata: Record<string, AnyTokenListInfo> = keyBy(
  tokenListJson.tokens,
  "address",
);

export function getTokenInfo<T extends TokenInfo>(address: string): T {
  return tokenMetadata[address] as T;
}
