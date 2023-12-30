import express from 'express'
import { StockController } from '../Controller/stock.controller'
import { StockService } from '../Services/stock.service'

const router = express.Router();
const storckService = new StockService();
const stockController = new StockController(storckService);

router.post('/stocks',(req, res) => stockController.createStock(req, res));
router.get('/stocks/:symbol', (req, res) => stockController.getStockBySymbol(req, res));
router.get('/stocksWithid/:id',(req, res) => stockController.getStockById(req, res))
router.put('/stocks/:symbol', (req, res) => stockController.updateStockPrice(req, res));

export default router;