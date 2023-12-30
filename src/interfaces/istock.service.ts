export interface IStockService {
    createStock(stockData: any): Promise<any>;
    getStockBySymbol(symbol: string): Promise<any>;
    getStockByID(id:number): Promise<any>;
    updateStockPrice(symbol: string, newPrice: number): Promise<any>;
    validateStock(stockId: number, transaction?: any): Promise<void>;
    fetchCurrentStockPrice(stockId:number,transaction?:any): Promise<any>;
}