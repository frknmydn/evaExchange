import { Request, Response } from 'express';
import { IPortfolioService } from '../interfaces/iportfolio.service';

export class PortfolioController {
    private portfolioService: IPortfolioService;

    constructor(portfolioService: IPortfolioService) {
        this.portfolioService = portfolioService;
    }

    public async getPortfolioByUserId(req: Request, res: Response) {
        const userId = parseInt(req.params.userId);
        try {
            const portfolio = await this.portfolioService.getPortfolioByUserId(userId);
            if (!portfolio) {
                return res.status(404).json({ message: 'Portfolio not found' });
            }
            res.json(portfolio);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching portfolio' });
        }
    }

}
