import CMCHelper from "@/utils/cmc_helper.ts"

export const getTokenPrice = async ( contractAddress: string) => {
  const cmcHelper = new CMCHelper("")
  return cmcHelper.getTokenPriceByContractAddress(contractAddress,56)
}
