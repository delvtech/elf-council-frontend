import { ERC20Permit__factory } from "elf-council-typechain";
import { tokenListJson } from "src/elf-council-tokenlist";
import { defaultProvider } from "src/elf/providers/providers";

export const elementTokenContract = ERC20Permit__factory.connect(
  tokenListJson.tokens[0].address,
  defaultProvider
);
