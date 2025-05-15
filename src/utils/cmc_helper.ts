import axios from 'axios';

class CMCHelper {

  private readonly apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  private async fetchData(url: string): Promise<any> {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch data: ${error}`);
    }
  }

  async getPriceData(tokenSymbol: string): Promise<any> {
    const baseUrl = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest';
    const params = {
      symbol: tokenSymbol,
      convert: 'USD',
      cmc_pro_api_key: this.apiKey,
    };
    const url = `${baseUrl}?${new URLSearchParams(params).toString()}`;

    const data = await this.fetchData(url);

    const capitalizedSymbol = tokenSymbol.toUpperCase();
    const tokenData = data.data[capitalizedSymbol]?.quote?.USD;

    if (!tokenData) {
      throw new Error(`Token data for symbol ${tokenSymbol} not found.`);
    }
    return tokenData;
  }
}

export default CMCHelper;
