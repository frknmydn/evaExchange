import Transaction from '../Model/transaction.model';
import { ITransactionService } from '../interfaces/itransaction.service';
import sequelize from '../config/db';
import { IPortfolioService } from '../interfaces/iportfolio.service';
import { IStockService } from '../interfaces/istock.service';
import { IUserService } from '../interfaces/iuser.service';

export class TransactionService implements ITransactionService {
    private portfolioService :IPortfolioService;
    private stockService: IStockService;

    

    constructor(portfolioService: IPortfolioService,stockService:IStockService,userService:IUserService) {
        this.portfolioService = portfolioService;
        this.stockService=stockService;
    }

    public async executeTrade(transactionData: any): Promise<Transaction> {
        const { userId, stockId, type, quantity } = transactionData;
        const t = await sequelize.transaction();

        try {
            // Validate stock and portfolio
            await this.stockService.validateStock(stockId, t);
            await this.portfolioService.validatePortfolio(userId, t);

            // Fetch current stock price
            const currentPrice = await this.stockService.fetchCurrentStockPrice(stockId, t);
                
            if (type === 'buy') {
                // Check user's funds (if applicable)                
                await this.portfolioService.checkUserCanAffordPurchase(userId,stockId,quantity,currentPrice);
                await this.portfolioService.updatePortfolioForBuy(userId, stockId, quantity, currentPrice, t);
            } else if (type === 'sell') {
                // Check if the user has sufficient shares
                
            }

            // Record transaction
            const transaction = await Transaction.create({
                userId, stockId, type, quantity, price: currentPrice
            }, { transaction: t });

            await t.commit();
            return transaction;
        } catch (error) {
            await t.rollback();
            throw error;
        }
    }

    public async getTransactionsByUserId(userId: number): Promise<Transaction[]> {
        try {
            return await Transaction.findAll({
                where: { userId }
            });
        } catch (error) {
            throw new Error('Error fetching transactions');
        }
    }
}
