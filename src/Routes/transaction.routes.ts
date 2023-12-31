import express from 'express';
import { TransactionController } from '../Controller/transaction.controller';
import { TransactionService } from '../Services/transaction.service';
import { PortfolioService } from '../Services/portfolio.service'; // Import your PortfolioService
import { StockService } from '../Services/stock.service'; // Import your StockService
import { UserService } from '../Services/user.service'; // Import your UserService
import authenticateToken from '../middleware/authenticateToken';

const router = express.Router();

// Create instances of your services

const stockService = new StockService();
const userService = new UserService();
const portfolioService = new PortfolioService(userService);

// Provide the services to the TransactionService constructor
const transactionService = new TransactionService(portfolioService, stockService, userService);

const transactionController = new TransactionController(transactionService);

router.post('/transactions',authenticateToken, (req, res) => transactionController.executeTrade(req, res));
router.get('/transactions/user/:userId',authenticateToken, (req, res) => transactionController.getTransactionsByUserId(req, res));

export default router;
