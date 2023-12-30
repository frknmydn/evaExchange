import { IStockService } from "../interfaces/istock.service";
import Stock from '../Model/stock.model'

export class StockService implements IStockService{

  

    async createStock(stockData: any): Promise<any>{
        const stock = await Stock.create(stockData);
        return stock;
    }
    
    public async getStockBySymbol(symbol: string): Promise<Stock | null> {
        try {
          const stock = await Stock.findOne({
            where: { symbol }
          });
          return stock;
        } catch (error) {
          throw new Error('Error fetching stock by symbol');
        }
      }
    

    async updateStockPrice(symbol: string, newPrice: number): Promise<any> {
        //
    }

    public async getStockByID(id: number): Promise<Stock | null> {
      try {
          const stock = await Stock.findByPk(id);
          return stock;
      } catch (error) {
          throw new Error('Error fetching stock by ID');
      }
  }

  public async validateStock(stockId: number, transaction?: any): Promise<void> {
    const stock = await Stock.findByPk(stockId, { transaction });
    if (!stock) {
        throw new Error(`Stock with ID ${stockId} not found`);
    }
}    

public async fetchCurrentStockPrice(stockId: number, transaction?: any): Promise<number> {
  try {
    const stock = await Stock.findByPk(stockId, { transaction });

    if (!stock) {
      throw new Error(`Stock with ID ${stockId} not found`);
    }

    // Assuming 'currentPrice' is a field in your Stock model
    const currentPrice = stock.currentPrice;

    // Return the current price as a number
    return currentPrice;
  } catch (error) {
    throw new Error(`Error fetching current stock price: ${error}`);
  }
}

    

}