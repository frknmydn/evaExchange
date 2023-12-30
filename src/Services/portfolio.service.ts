import Portfolio from "../Model/portfolio.model";
import { IPortfolioService } from "../interfaces/iportfolio.service";
import { IStockService } from "../interfaces/istock.service";
import { IUserService } from "../interfaces/iuser.service";

export class PortfolioService implements IPortfolioService {
  private stockService: IStockService;
  private userService: IUserService;
  constructor(
    portfolioService: IPortfolioService,
    stockService: IStockService,
    userService: IUserService
  ) {
    this.stockService = stockService;
    this.userService = userService;
  }
  public async getPortfolioByUserId(userId: number): Promise<Portfolio | null> {
    try {
      const portfolio = await Portfolio.findOne({ where: { userId } });
      return portfolio;
    } catch (error) {
      throw new Error("Error fetching portfolio");
    }
  }

  public async validatePortfolio(
    userId: number,
    transaction?: any
  ): Promise<void> {
    const portfolio = await Portfolio.findOne({
      where: { userId },
      transaction,
    });
    if (!portfolio) {
      throw new Error(`Portfolio for user ID ${userId} not found`);
    }
    // Additional validations can be added here
  }

  public async checkUserCanAffordPurchase(
    userId: number,
    stockId: number,
    quantity: number,
    pricePerShare: number,
    transaction?: any
  ): Promise<void> {
    const requiredAmount = quantity * pricePerShare;

    const user = await this.userService.getUserById(userId);
    const balance = user.balance;

    if (balance < requiredAmount) {
      throw new Error("User does not have sufficient funds for the purchase");
    }
  }

  public async updatePortfolioForBuy(
    userId: number,
    stockId: number,
    quantity: number,
    currentPrice: number,
    transaction?: any
  ): Promise<any> {
    const amount = quantity * currentPrice;

    try {
      const portfolioEntry = await Portfolio.create({
        userId: userId,
        stockId: stockId,
        quantity: quantity,
      });

      if (transaction) {
        await transaction.commit();
      }

      await this.userService.changeUserBalance(userId, amount);

      return portfolioEntry;
    } catch (error) {
      if (transaction) {
        await transaction.rollback();
      }
      throw error;
    }
  }
}
