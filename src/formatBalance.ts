import { commify } from "ethers/lib/utils";
import { format } from "d3-format";

/**
 * Used for final balance presentation since it cuts off decimals
 * @param balance
 * @param numDecimals max decimals, default is 4
 * @returns a formatted string with proper commas and {numDecimals} decimal places
 */
export function formatBalance(balance: string, numDecimals = 4): string {
  return commify(format(`.${numDecimals}~f`)(+balance));
}
