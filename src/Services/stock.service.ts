import { IStockService } from "../interfaces/istock.service";
import Stock from '../Model/stock.model'
import {StockNotFoundError} from "../Errors/StockNotFoundError"

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
          throw new StockNotFoundError('Stock Not Found');
        }
      }
    

    async updateStockPrice(symbol: string, newPrice: number): Promise<any> {
      try {
        // Find the stock by its symbol
        const stock = await Stock.findOne({
          where: { symbol }
        });
  
        // If the stock doesn't exist, throw an error
        if (!stock) {
          throw new StockNotFoundError(`Stock with symbol ${symbol} not found`);
        }
  
        // Update the stock's price
        stock.currentPrice = newPrice;
  
        // Save the changes
        const updatedStock = await stock.save();
  
        // Return the updated stock
        return updatedStock;
      } catch (error) {
        // Handle any other errors
        if (error instanceof StockNotFoundError) {
          throw error;
        } else {
          throw new Error(`Error updating stock price: ${error}`);
        }
      }
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
        throw new StockNotFoundError(`Stock with ID ${stockId} not found`);
    }
}    

public async fetchCurrentStockPrice(stockId: number, transaction?: any): Promise<number> {
  try {
    const stock = await Stock.findByPk(stockId, { transaction });

    if (!stock) {
      throw new StockNotFoundError(`Stock with ID ${stockId} not found`);
    }

    const currentPrice = stock.currentPrice;

    return currentPrice;
  } catch (error) {
    throw new StockNotFoundError(`Error fetching current stock price: ${error}`);
  }
}

  
}