import { ERC20Permit__factory } from "elf-council-typechain";
import { addressesJson } from "src/elf-council-addresses";
import { defaultProvider } from "src/elf/providers/providers";

export const elementTokenContract = ERC20Permit__factory.connect(
  addressesJson.addresses.elementToken,
  defaultProvider
);
