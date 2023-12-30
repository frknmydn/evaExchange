import express from 'express'
import { TransactionController } from '../Controller/transaction.controller'
import { TransactionService } from '../Services/transaction.service';



const router = express.Router();
const transactionService = new TransactionService();
const transactionController = new TransactionController(transactionService);

router.post('/transactions', (req, res) => transactionController.createTransaction(req, res));
router.get('/transactions/user/:userId', (req, res) => transactionController.getTransactionsByUserId(req, res));

export default router;