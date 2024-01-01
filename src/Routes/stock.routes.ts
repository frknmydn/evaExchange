import express from 'express'
import { StockController } from '../Controller/stock.controller'
import { StockService } from '../Services/stock.service'

const router = express.Router();
const storckService = new StockService();
const stockController = new StockController(storckService);
/**
 * @swagger
 * /stocks:
 *   post:
 *     summary: Yeni bir hisse oluşturur
 *     description: Yeni hisse senedi bilgilerini kaydeder.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - symbol
 *               - currentPrice
 *             properties:
 *               name:
 *                 type: string
 *                 description: Hisse senedinin adı.
 *               symbol:
 *                 type: string
 *                 description: Hisse senedinin sembolü.
 *               currentPrice:
 *                 type: number
 *                 description: Hisse senedinin şu anki fiyatı.
 *     responses:
 *       201:
 *         description: Hisse senedi başarıyla oluşturuldu.
 */
router.post('/stocks',(req, res) => stockController.createStock(req, res));
/**
 * @swagger
 * /stocks/{symbol}:
 *   get:
 *     summary: Belirli bir sembole sahip hisseyi getirir
 *     description: Verilen sembole sahip hisse senedinin bilgilerini getirir.
 *     parameters:
 *       - in: path
 *         name: symbol
 *         required: true
 *         schema:
 *           type: string
 *         description: Hisse senedinin sembolü.
 *     responses:
 *       200:
 *         description: Hisse senedi bilgileri başarıyla getirildi.
 *       404:
 *         description: Hisse senedi bulunamadı.
 */

router.get('/stocks/:symbol', (req, res) => stockController.getStockBySymbol(req, res));
/**
 * @swagger
 * /stocksWithid/{id}:
 *   get:
 *     summary: Belirli bir ID'ye sahip hisseyi getirir
 *     description: Verilen ID'ye sahip hisse senedinin bilgilerini getirir.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Hisse senedinin ID'si.
 *     responses:
 *       200:
 *         description: Hisse senedi bilgileri başarıyla getirildi.
 *       404:
 *         description: Hisse senedi bulunamadı.
 */

router.get('/stocksWithid/:id',(req, res) => stockController.getStockById(req, res))
/**
 * @swagger
 * /stocks/{symbol}:
 *   put:
 *     summary: Bir hisse senedinin fiyatını günceller
 *     description: Belirtilen sembole sahip hisse senedinin fiyatını günceller.
 *     parameters:
 *       - in: path
 *         name: symbol
 *         required: true
 *         schema:
 *           type: string
 *         description: Hisse senedinin sembolü.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - currentPrice
 *             properties:
 *               currentPrice:
 *                 type: number
 *                 description: Yeni hisse senedi fiyatı.
 *     responses:
 *       200:
 *         description: Hisse senedi fiyatı başarıyla güncellendi.
 *       404:
 *         description: Hisse senedi bulunamadı.
 */

router.put('/stocks/:symbol', (req, res) => stockController.updateStockPrice(req, res));

export default router;