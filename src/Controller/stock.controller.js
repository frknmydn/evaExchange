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
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockController = void 0;
class StockController {
    constructor(stockService) {
        this.stockService = stockService;
    }
    createStock(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const stock = yield this.stockService.createStock(req.body);
                res.status(201).json(stock);
            }
            catch (error) {
                console.error("Error creating stock:", error); // Detailed logging
                res.status(400).json({ message: error || "Unknown error occurred" });
            }
        });
    }
    getStockBySymbol(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const symbol = req.params.symbol;
            try {
                const stock = yield this.stockService.getStockBySymbol(symbol);
                if (!stock) {
                    return res.status(404).json({ message: 'Stock not found' });
                }
                res.json(stock);
            }
            catch (error) {
                res.status(500).json({ message: 'Error fetching stock' });
            }
        });
    }
    updateStockPrice(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const symbol = req.params.symbol;
            const { newPrice } = req.body;
            if (newPrice === undefined || typeof newPrice !== 'number') {
                return res.status(400).json({ message: 'Invalid new price provided' });
            }
            try {
                const updatedStock = yield this.stockService.updateStockPrice(symbol, newPrice);
                res.status(200).json(updatedStock);
            }
            catch (error) {
                res.status(404).json({ message: error });
            }
        });
    }
    getStockById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ message: 'Invalid stock ID' });
            }
            try {
                const stock = yield this.stockService.getStockByID(id);
                if (!stock) {
                    return res.status(404).json({ message: 'Stock not found' });
                }
                res.json(stock);
            }
            catch (error) {
                res.status(500).json({ message: 'Error fetching stock' });
            }
        });
    }
}
exports.StockController = StockController;
