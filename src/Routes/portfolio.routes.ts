import express from 'express'
import { PortfolioController } from '../Controller/portfolio.controller'
import { PortfolioService } from '../Services/portfolio.service';
import { UserService } from '../Services/user.service'; 
import authenticateToken from '../middleware/authenticateToken';

const router = express.Router();
const userService = new UserService(); // Instantiate your UserService
const portfolioService = new PortfolioService(userService); // Pass dependencies to PortfolioService

const portfolioController = new PortfolioController(portfolioService);

/**
 * @swagger
 * /portfolio/{userId}:
 *   get:
 *     summary: Belirli bir kullanıcının portföyünü getirir
 *     description: Verilen kullanıcı ID'sine sahip kullanıcının portföy bilgilerini getirir. JWT token gerektirir.
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
 *         description: Kullanıcı portföyü başarıyla getirildi.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Portfolio'
 *       401:
 *         description: Yetkilendirme hatası.
 *       404:
 *         description: Kullanıcı veya portföy bulunamadı.
 */

router.get('/portfolio/:userId',authenticateToken, (req, res) => portfolioController.getPortfolioByUserId(req, res));

export default router;
