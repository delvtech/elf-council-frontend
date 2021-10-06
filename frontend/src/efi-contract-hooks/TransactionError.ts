import { ContractReceipt, ContractTransaction } from "ethers";
import { Logger } from "ethers/lib/utils";

// union type of TransactionError's that we can grow.
export type TransactionError = TransactionReplacedError;

export interface TransactionReplacedError extends Error {
  code: "TRANSACTION_REPLACED";
  // The reason why the transaction was replaced
  // - "repriced" is generally nothing of concern, the
  //   only difference in the transaction is the gasPrice
  // - "cancelled" means the `to` has been set to the `from`,
  //   the data has been set to `0x` and value set to 0
  // - "replaced" means that the transaction is unrelated to
  //   the original transaction
  reason: "repriced" | "cancelled" | "replaced";
  // This is a short-hand property as the effects of either a
  // "cancelled" or "replaced" tx are effectively cancelled
  cancelled: boolean;
  // The TransactionResponse which replaced the original
  replacement: ContractTransaction;
  // The TransactionReceipt of the replacement transaction
  receipt: ContractReceipt;
}

export function isTransactionReplacedError(
  error: TransactionError
): error is TransactionReplacedError {
  if (error.code === Logger.errors.TRANSACTION_REPLACED) {
    return true;
  }
  return false;
}
