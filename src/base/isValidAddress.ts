import { getAddress } from "ethers/lib/utils";

export function isValidAddress(address: string): boolean {
  try {
    const convertedAddress = getAddress(address);
    return !!convertedAddress;
  } catch (e) {
    return false;
  }
}
