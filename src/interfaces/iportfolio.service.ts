export interface IPortfolioService {
    getPortfolioByUserId(userId: number): Promise<any | null>;
    validatePortfolio(userId: number, transaction?: any): Promise<void>;
    checkUserCanAffordPurchase(userId: number, stockId: number, quantity: number, pricePerShare: number, transaction?: any) : Promise<any>;
    checkUserCanAffordSell(userId: number, stockId: number, quantity: number, pricePerShare: number, transaction?: any) : Promise<any>;
    updatePortfolioForBuy(userId: number, stockId: number, quantity: number,currentPrice:number,transaction?: any): Promise<any>;
    updatePortfolioForSell(userId: number, stockId: number, quantity: number,currentPrice:number,transaction?: any): Promise<any>;
    getUserStocks(userId:number): Promise<any>;
}