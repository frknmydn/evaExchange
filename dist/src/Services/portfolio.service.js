"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PortfolioService = void 0;
const portfolio_model_1 = __importDefault(require("../Model/portfolio.model"));
const stock_model_1 = __importDefault(require("../Model/stock.model"));
const InsufficientFundsError_1 = require("../Errors/InsufficientFundsError");
class PortfolioService {
    constructor(userService) {
        this.userService = userService;
    }
    getPortfolioByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const portfolio = yield portfolio_model_1.default.findOne({ where: { userId } });
                return portfolio;
            }
            catch (error) {
                throw new Error("Error fetching portfolio");
            }
        });
    }
    validatePortfolio(userId, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const portfolio = yield portfolio_model_1.default.findOne({
                where: { userId },
                transaction,
            });
            if (!portfolio) {
                throw new Error(`Portfolio for user ID ${userId} not found`);
            }
        });
    }
    checkUserCanAffordPurchase(userId, stockId, quantity, pricePerShare, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const requiredAmount = quantity * pricePerShare;
            const user = yield this.userService.getUserById(userId);
            const balance = user.balance;
            if (balance < requiredAmount) {
                throw new InsufficientFundsError_1.InsufficientFundsError("User does not have sufficient funds for the purchase");
            }
        });
    }
    updatePortfolioForBuy(userId, stockId, quantity, currentPrice, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const amount = quantity * currentPrice;
            // this query finds portfolio for user beacuse if user buyed same coin before it shouldnt create new portfolio entity
            const existingPortfolioEntry = yield portfolio_model_1.default.findOne({
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
                portfolioEntry = yield existingPortfolioEntry.save({ transaction });
            }
            else {
                // if user didint buy before then create new
                portfolioEntry = yield portfolio_model_1.default.create({
                    userId: userId,
                    stockId: stockId,
                    quantity: quantity,
                }, { transaction: transaction });
            }
            yield this.userService.decreaseUserBalance(userId, amount);
            return portfolioEntry;
        });
    }
    updatePortfolioForSell(userId, stockId, quantity, currentPrice, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const amount = quantity * currentPrice;
            console.log(amount);
            const findingPortfolio = yield portfolio_model_1.default.findOne({
                where: {
                    userId: userId,
                    stockId: stockId,
                },
                transaction: transaction,
            });
            if (!findingPortfolio) {
                throw new InsufficientFundsError_1.InsufficientFundsError(`User ID ${userId} does not own stock ID ${stockId}`);
            }
            if (findingPortfolio.quantity < quantity) {
                throw new InsufficientFundsError_1.InsufficientFundsError(`User ID ${userId} does not have enough shares of stock ID ${stockId} to sell`);
            }
            findingPortfolio.quantity -= quantity;
            yield this.userService.increaseUserBalance(userId, amount);
            yield findingPortfolio.save({ transaction });
            return findingPortfolio;
        });
    }
    checkUserCanAffordSell(userId, stockId, quantity, currentPrice, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const findingPortfolio = yield portfolio_model_1.default.findOne({
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
                throw new Error(`User ID ${userId} does not have enough shares of stock ID ${stockId} to sell`);
            }
        });
    }
    getUserStocks(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const findingPortfolioForUser = yield portfolio_model_1.default.findAll({
                    where: { userId: userId }
                });
                const userStocks = yield Promise.all(findingPortfolioForUser.map((finding) => __awaiter(this, void 0, void 0, function* () {
                    const stock = yield stock_model_1.default.findByPk(finding.stockId);
                    if (stock) {
                        return {
                            stockName: stock.name,
                            stockSymbol: stock.symbol,
                            stockPrice: stock.currentPrice,
                            quantity: finding.quantity
                        };
                    }
                })));
                return userStocks;
            }
            catch (error) {
                console.log('Error fetchuing user stocks');
                throw error;
            }
        });
    }
}
exports.PortfolioService = PortfolioService;
