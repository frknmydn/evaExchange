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
exports.PortfolioController = void 0;
class PortfolioController {
    constructor(portfolioService) {
        this.portfolioService = portfolioService;
    }
    getPortfolioByUserId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = parseInt(req.params.userId);
            try {
                const portfolio = yield this.portfolioService.getUserStocks(userId);
                if (!portfolio) {
                    return res.status(404).json({ message: 'Portfolio not found' });
                }
                res.json(portfolio);
            }
            catch (error) {
                res.status(500).json({ message: 'Error fetching portfolio' });
            }
        });
    }
}
exports.PortfolioController = PortfolioController;
