import { commify } from "ethers/lib/utils";
import { format } from "d3-format";

/**
 * Used for final balance presentation since it cuts off decimals
 * @param balance
 * @returns a formatted string with proper commas and 4 decimal places
 */
export function formatBalance(balance: string): string {
  return commify(format(".4~f")(+balance));
}
