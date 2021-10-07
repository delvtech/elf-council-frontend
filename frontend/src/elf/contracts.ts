import { ERC20Permit__factory } from "elf-council-typechain";
import { defaultProvider } from "src/elf/providers/providers";
import tokenList from "src/tokenlist.json";

export const elementTokenContract = ERC20Permit__factory.connect(
  tokenList.tokens[0].address,
  defaultProvider
);
