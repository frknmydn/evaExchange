"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const portfolio_controller_1 = require("../Controller/portfolio.controller");
const portfolio_service_1 = require("../Services/portfolio.service");
const user_service_1 = require("../Services/user.service");
const authenticateToken_1 = __importDefault(require("../middleware/authenticateToken"));
const router = express_1.default.Router();
const userService = new user_service_1.UserService(); // Instantiate your UserService
const portfolioService = new portfolio_service_1.PortfolioService(userService); // Pass dependencies to PortfolioService
const portfolioController = new portfolio_controller_1.PortfolioController(portfolioService);
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
router.get('/portfolio/:userId', authenticateToken_1.default, (req, res) => portfolioController.getPortfolioByUserId(req, res));
exports.default = router;
