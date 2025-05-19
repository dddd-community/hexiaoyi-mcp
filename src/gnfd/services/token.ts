import {cmcHelperInstance} from "@/utils/cmc_helper.ts"

export const getTokenPriceByCMC = async ( contractAddress: string,networkId: number) => {
  return cmcHelperInstance.getTokenPriceByContractAddress(contractAddress,networkId)
}
