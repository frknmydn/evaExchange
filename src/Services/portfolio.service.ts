import Portfolio from "../Model/portfolio.model";
import { IPortfolioService } from "../interfaces/iportfolio.service";
import { IUserService } from "../interfaces/iuser.service";
import Stock from "../Model/stock.model";
import {InsufficientFundsError} from "../Errors/InsufficientFundsError"


export class PortfolioService implements IPortfolioService {
  private userService: IUserService;
  constructor(userService: IUserService) {
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
      throw new InsufficientFundsError("User does not have sufficient funds for the purchase");
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
  
    // this query finds portfolio for user beacuse if user buyed same coin before it shouldnt create new portfolio entity
    const existingPortfolioEntry = await Portfolio.findOne({
      where: {
        userId: userId,
        stockId: stockId,
      },
      transaction: transaction,
    });
  
    let portfolioEntry;
  
    if (existingPortfolioEntry) {
      // update previosly buyed protfoio entity
      existingPortfolioEntry.quantity += quantity;
      portfolioEntry = await existingPortfolioEntry.save({ transaction });
    } else {
      // if user didint buy before then create new
      portfolioEntry = await Portfolio.create({
        userId: userId,
        stockId: stockId,
        quantity: quantity,
      }, { transaction: transaction });
    }
  
    
    await this.userService.decreaseUserBalance(userId, amount);
  
    return portfolioEntry;
  }
  
  public async updatePortfolioForSell(
    userId: number,
    stockId: number,
    quantity: number,
    currentPrice: number,
    transaction?: any
  ): Promise<any> {
    const amount = quantity * currentPrice;
    console.log(amount);
    
    const findingPortfolio = await Portfolio.findOne({
      where: {
        userId: userId,
        stockId: stockId,
      },
      transaction: transaction,
      
    });
  
    
    if (!findingPortfolio) {
      throw new InsufficientFundsError(`User ID ${userId} does not own stock ID ${stockId}`);
    }

    if (findingPortfolio.quantity < quantity) {
      throw new InsufficientFundsError(
        `User ID ${userId} does not have enough shares of stock ID ${stockId} to sell`
      );
    }

    findingPortfolio.quantity -= quantity;
    await this.userService.increaseUserBalance(userId, amount);
    await findingPortfolio.save({ transaction });

    
    

    return findingPortfolio;
  }

  public async checkUserCanAffordSell(
    userId: number,
    stockId: number,
    quantity: number,
    currentPrice: number,
    transaction?: any
  ): Promise<void> {
    const findingPortfolio = await Portfolio.findOne({
      where: {
        userId: userId,
        stockId: stockId,
      },
      transaction,
    });

    if (!findingPortfolio) {
      throw new Error(`User ID ${userId} does not own stock ID ${stockId}`);
    }

    if (findingPortfolio.quantity < quantity) {
      throw new Error(
        `User ID ${userId} does not have enough shares of stock ID ${stockId} to sell`
      );
    }
  }


  public async getUserStocks(userId:number){
    try{
      const findingPortfolioForUser = await Portfolio.findAll({
        where:{userId:userId}
      });

      const userStocks = await Promise.all(findingPortfolioForUser.map(async (finding) =>{
        const stock = await Stock.findByPk(finding.stockId);
        if(stock){
          return {
            stockName: stock.name,
            stockSymbol: stock.symbol,
            stockPrice: stock.currentPrice,
            quantity: finding.quantity
          };
        }
      
      }));
      return userStocks;
    }catch(error){
      console.log('Error fetchuing user stocks')
      throw error
    }
  
}
}
