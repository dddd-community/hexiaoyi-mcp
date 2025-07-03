import axios, { AxiosInstance } from 'axios';

class CMCHelper {
  private readonly apiKey: string;
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
  ): Promise<any> {
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
        console.warn('get token price by contract address:price info not found');
        return null;
      }
    } catch (error: any) {
      console.error('get token price by contract address error:', error.message);
      return null;
    }
  }

  public async getTokenPriceBySymbol(symbol: string): Promise<any> {
    this.initClient();
    try {
      const response = await this.client!.get('/v1/cryptocurrency/quotes/latest', {
        params: {
          slug:symbol,
          convert: 'USD',
        },
      });
      const data = response.data;
      if (data && data.data) {
        return data.data;
      } else {
        console.warn('get token price by symbol:price info not found');
        return null;
      }
    } catch (error: any) {
      console.error('get token price by symbol error:', error.message);
      return null;
    }
  }
}

let cmcApiKey = process.env.CMC_API_KEY;
if (!cmcApiKey) {
  console.error('CMC_API_KEY is not in environment variables');
  cmcApiKey="";
}

export const cmcHelperInstance = new CMCHelper(cmcApiKey);

export default CMCHelper;
