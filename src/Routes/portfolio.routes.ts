import express from 'express'
import { PortfolioController } from '../Controller/portfolio.controller'
import { PortfolioService } from '../Services/portfolio.service';

const router = express.Router();
const portfolioService = new PortfolioService();
const portfolioController = new PortfolioController(portfolioService);

router.get('/portfolio/:userId', (req, res) => portfolioController.getPortfolioByUserId(req, res));

export default router;