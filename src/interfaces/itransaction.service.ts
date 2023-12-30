export interface ITransactionService {
    executeTrade(transactionData: any): Promise<any>;
    getTransactionsByUserId(userId: number): Promise<any[]>;
}
