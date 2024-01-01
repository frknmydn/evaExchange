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
exports.TransactionController = void 0;
class TransactionController {
    constructor(transactionService) {
        this.transactionService = transactionService;
    }
    executeTrade(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const transaction = yield this.transactionService.executeTrade(req.body);
                res.status(201).json(transaction);
            }
            catch (error) {
                res.status(500).send(error);
                console.log(error.message);
            }
        });
    }
    getTransactionsByUserId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = parseInt(req.params.userId);
            try {
                const transactions = yield this.transactionService.getTransactionsByUserId(userId);
                res.json(transactions);
            }
            catch (error) {
                res.status(500).json({ message: 'Error fetching transactions' });
            }
        });
    }
}
exports.TransactionController = TransactionController;
