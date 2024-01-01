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
exports.StockService = void 0;
const stock_model_1 = __importDefault(require("../Model/stock.model"));
const StockNotFoundError_1 = require("../Errors/StockNotFoundError");
class StockService {
    createStock(stockData) {
        return __awaiter(this, void 0, void 0, function* () {
            const stock = yield stock_model_1.default.create(stockData);
            return stock;
        });
    }
    getStockBySymbol(symbol) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const stock = yield stock_model_1.default.findOne({
                    where: { symbol }
                });
                return stock;
            }
            catch (error) {
                throw new StockNotFoundError_1.StockNotFoundError('Stock Not Found');
            }
        });
    }
    updateStockPrice(symbol, newPrice) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Find the stock by its symbol
                const stock = yield stock_model_1.default.findOne({
                    where: { symbol }
                });
                // If the stock doesn't exist, throw an error
                if (!stock) {
                    throw new StockNotFoundError_1.StockNotFoundError(`Stock with symbol ${symbol} not found`);
                }
                // Update the stock's price
                stock.currentPrice = newPrice;
                // Save the changes
                const updatedStock = yield stock.save();
                // Return the updated stock
                return updatedStock;
            }
            catch (error) {
                // Handle any other errors
                if (error instanceof StockNotFoundError_1.StockNotFoundError) {
                    throw error;
                }
                else {
                    throw new Error(`Error updating stock price: ${error}`);
                }
            }
        });
    }
    getStockByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const stock = yield stock_model_1.default.findByPk(id);
                return stock;
            }
            catch (error) {
                throw new Error('Error fetching stock by ID');
            }
        });
    }
    validateStock(stockId, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const stock = yield stock_model_1.default.findByPk(stockId, { transaction });
            if (!stock) {
                throw new StockNotFoundError_1.StockNotFoundError(`Stock with ID ${stockId} not found`);
            }
        });
    }
    fetchCurrentStockPrice(stockId, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const stock = yield stock_model_1.default.findByPk(stockId, { transaction });
                if (!stock) {
                    throw new StockNotFoundError_1.StockNotFoundError(`Stock with ID ${stockId} not found`);
                }
                const currentPrice = stock.currentPrice;
                return currentPrice;
            }
            catch (error) {
                throw new StockNotFoundError_1.StockNotFoundError(`Error fetching current stock price: ${error}`);
            }
        });
    }
}
exports.StockService = StockService;
