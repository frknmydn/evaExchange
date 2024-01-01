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
exports.TransactionService = void 0;
const transaction_model_1 = __importDefault(require("../Model/transaction.model"));
const db_1 = __importDefault(require("../config/db"));
class TransactionService {
    constructor(portfolioService, stockService, userService) {
        this.portfolioService = portfolioService;
        this.stockService = stockService;
    }
    executeTrade(transactionData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId, stockId, type, quantity } = transactionData;
            const t = yield db_1.default.transaction();
            let transactionCommitted = false;
            try {
                // Validate stock and portfolio
                yield this.stockService.validateStock(stockId, t);
                // Fetch current stock price
                const currentPrice = yield this.stockService.fetchCurrentStockPrice(stockId, t);
                if (type === 'buy') {
                    // Check user's funds (if applicable)                
                    yield this.portfolioService.checkUserCanAffordPurchase(userId, stockId, quantity, currentPrice, t);
                    yield this.portfolioService.updatePortfolioForBuy(userId, stockId, quantity, currentPrice, t);
                }
                else if (type === 'sell') {
                    yield this.portfolioService.checkUserCanAffordSell(userId, stockId, quantity, currentPrice, t);
                    yield this.portfolioService.updatePortfolioForSell(userId, stockId, quantity, currentPrice, t);
                }
                // Record transaction
                const transaction = yield transaction_model_1.default.create({
                    userId, stockId, type, quantity, price: currentPrice
                }, { transaction: t });
                yield t.commit();
                transactionCommitted = true;
                return transaction;
            }
            catch (error) {
                if (!transactionCommitted) {
                    yield t.rollback();
                }
                throw error;
            }
        });
    }
    getTransactionsByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield transaction_model_1.default.findAll({
                    where: { userId }
                });
            }
            catch (error) {
                throw new Error('Error fetching transactions');
            }
        });
    }
}
exports.TransactionService = TransactionService;
