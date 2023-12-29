import { IStockService } from "../interfaces/istock.service";
import Stock from '../Model/stock.model'

export class StockService implements IStockService{
    async getStock(symbol: string): Promise<Stock>{
        //hata return yuzunden
    }

    async updateStockPrice(symbol: string, newPrice: number): Promise<any> {
        //
    }

}