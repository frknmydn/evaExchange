import express from 'express'
import { PortfolioController } from '../Controller/portfolio.controller'
import { PortfolioService } from '../Services/portfolio.service';
import { UserService } from '../Services/user.service'; 
import authenticateToken from '../middleware/authenticateToken';

const router = express.Router();
const userService = new UserService(); // Instantiate your UserService
const portfolioService = new PortfolioService(userService); // Pass dependencies to PortfolioService

const portfolioController = new PortfolioController(portfolioService);

router.get('/portfolio/:userId',authenticateToken, (req, res) => portfolioController.getPortfolioByUserId(req, res));

export default router;
