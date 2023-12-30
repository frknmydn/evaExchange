import { Request, Response } from 'express';
import { ITransactionService } from '../interfaces/itransaction.service';

export class TransactionController {
    private transactionService: ITransactionService;

    constructor(transactionService: ITransactionService) {
        this.transactionService = transactionService;
    }

    public async executeTrade(req: Request, res: Response) {
        try {
            const transaction = await this.transactionService.executeTrade(req.body);
            res.status(201).json(transaction);
        } catch (error:any) {
            res.status(500).send(error)
            console.log(error.message)
        }
    }

    public async getTransactionsByUserId(req: Request, res: Response) {
        const userId = parseInt(req.params.userId);
        try {
            const transactions = await this.transactionService.getTransactionsByUserId(userId);
            res.json(transactions);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching transactions' });
        }
    }
}
