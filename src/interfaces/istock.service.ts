export interface IStockService {
    getStock(symbol: string): Promise<any>;
    updateStockPrice(symbol: string, newPrice: number): Promise<any>;
}