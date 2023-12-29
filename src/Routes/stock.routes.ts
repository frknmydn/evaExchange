import express from 'express'
import { StockController } from '../Controller/stock.controller'
import { StockService } from '../Services/stock.service'

const router = express.Router();
const stockController = new StockController(new StockService);

router.get('/stocks/:symbol', stockController.getStock);
router.put('/stocks/:symbol', stockController.updateStockPrice);

export default router;