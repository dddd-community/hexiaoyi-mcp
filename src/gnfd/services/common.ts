import { BaseAccount } from "@bnb-chain/greenfield-cosmos-types/cosmos/auth/v1beta1/auth"
import { type TxResponse } from "@bnb-chain/greenfield-js-sdk"
import type { Hex } from "viem"

import Logger_util from "@/utils/logger_util.ts"
import { response, type ApiResponse } from "../util"

/**
 * Execute a transaction with proper error handling
 * @param tx Transaction to execute
 * @param account Account details
 * @param privateKey Private key for signing
 * @param operationName Name of operation for logging
 * @param successDetail Additional details for success message
 */
export const executeTransaction = async <T = void>(
  tx: TxResponse,
  account: BaseAccount,
  privateKey: Hex,
  operationName: string,
  successDetail: string
): Promise<ApiResponse<T> & { txHash?: string }> => {
  const denom = "BNB"

  try {
    // Simulate transaction to get gas estimate
    const simulateTx = await tx.simulate({
      denom
    })

    // Broadcast transaction
    const txRes = await tx.broadcast({
      denom,
      gasLimit: Number(simulateTx?.gasLimit),
      gasPrice: simulateTx?.gasPrice || "5000000000",
      payer: account.address,
      granter: "",
      privateKey: privateKey
    })

    if (txRes.code === 0) {
      Logger_util.debug(`${operationName} ${successDetail} success`)
      return response.success<T>(`${operationName} successful`, {
        txHash: txRes.transactionHash
      } as T)
    } else {
      Logger_util.error(`${operationName} failed: ${JSON.stringify(txRes)}`)
      return response.fail(
        `${operationName} failed: code=${txRes.code}, hash=${txRes.transactionHash}`
      ) as ApiResponse<T>
    }
  } catch (error) {
    Logger_util.error(`${operationName} failed: ${error}`)
    return response.fail(`${operationName} failed: ${error}`) as ApiResponse<T>
  }
}
