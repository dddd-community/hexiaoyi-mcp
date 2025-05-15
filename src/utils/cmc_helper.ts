import axios, { AxiosInstance } from 'axios';

class CMCHelper {
  private apiKey: string;
  private client: AxiosInstance | null = null;
  private baseURL: string = 'https://pro-api.coinmarketcap.com';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  private initClient() {
    if (!this.client) {
      this.client = axios.create({
        baseURL: this.baseURL,
        headers: {
          'X-CMC_PRO_API_KEY': this.apiKey,
          Accept: 'application/json',
        },
      });
    }
  }

  /**
   * 获取指定合约地址的代币价格信息
   * @param contractAddress 合约地址
   * @param networkId 网络ID
   * @returns 返回代币价格信息或null
   */
  public async getTokenPriceByContractAddress(
    contractAddress: string,
    networkId: number
  ): Promise<number | null> {
    this.initClient();
    try {
      const response = await this.client!.get('/v4/dex/pairs/quotes/latest', {
        params: {
          contract_address: contractAddress,
          network_id: networkId,
        },
      });
      const data = response.data;
      if (data && data.data) {
        return data.data;
      } else {
        console.warn('未找到代币价格信息');
        return null;
      }
    } catch (error: any) {
      console.error('获取代币价格信息时出错：', error.message);
      return null;
    }
  }

}

export default CMCHelper;
