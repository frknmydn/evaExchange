"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const transaction_controller_1 = require("../Controller/transaction.controller");
const transaction_service_1 = require("../Services/transaction.service");
const portfolio_service_1 = require("../Services/portfolio.service"); // Import your PortfolioService
const stock_service_1 = require("../Services/stock.service"); // Import your StockService
const user_service_1 = require("../Services/user.service"); // Import your UserService
const authenticateToken_1 = __importDefault(require("../middleware/authenticateToken"));
const router = express_1.default.Router();
// Create instances of your services
const stockService = new stock_service_1.StockService();
const userService = new user_service_1.UserService();
const portfolioService = new portfolio_service_1.PortfolioService(userService);
// Provide the services to the TransactionService constructor
const transactionService = new transaction_service_1.TransactionService(portfolioService, stockService, userService);
const transactionController = new transaction_controller_1.TransactionController(transactionService);
/**
 * @swagger
 * /transactions/user/{userId}:
 *   get:
 *     summary: Bir kullanıcının tüm işlemlerini getirir
 *     description: Belirli bir kullanıcıya ait tüm hisse işlemlerini listeler.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Kullanıcının ID'si.
 *     responses:
 *       200:
 *         description: Kullanıcının işlemleri başarıyla getirildi.
 *       404:
 *         description: Kullanıcı bulunamadı.
 */
router.post('/transactions', authenticateToken_1.default, (req, res) => transactionController.executeTrade(req, res));
/**
 * @swagger
 * /transactions/user/{userId}:
 *   get:
 *     summary: Bir kullanıcının tüm işlemlerini getirir
 *     description: Belirli bir kullanıcıya ait tüm hisse işlemlerini listeler.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Kullanıcının ID'si.
 *     responses:
 *       200:
 *         description: Kullanıcının işlemleri başarıyla getirildi.
 *       404:
 *         description: Kullanıcı bulunamadı.
 */
router.get('/transactions/user/:userId', authenticateToken_1.default, (req, res) => transactionController.getTransactionsByUserId(req, res));
exports.default = router;
