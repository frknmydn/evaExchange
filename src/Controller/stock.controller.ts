import { Request,Response } from "express";
import { IStockService } from "../interfaces/istock.service";

export class StockController{
    private stockService: IStockService

    constructor(stockService: IStockService){
        this.stockService=stockService;
    }

    async createStock(req: Request, res: Response) {
        try {
            const stock = await this.stockService.createStock(req.body);
            res.status(201).json(stock);
        } catch (error) {
            console.error("Error creating stock:", error); // Detailed logging
            res.status(400).json({ message: error || "Unknown error occurred" });
        }
    }
    

    public async getStockBySymbol(req: Request, res: Response) {
        const symbol = req.params.symbol;
        try {
          const stock = await this.stockService.getStockBySymbol(symbol);
          if (!stock) {
            return res.status(404).json({ message: 'Stock not found' });
          }
          res.json(stock);
        } catch (error) {
          res.status(500).json({ message: 'Error fetching stock' });
        }
      }

    async updateStockPrice(req:Request, res:Response){
        //TODO: implement logic
    }

    public async getStockById(req: Request, res: Response) {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
          return res.status(400).json({ message: 'Invalid stock ID' });
      }

      try {
          const stock = await this.stockService.getStockByID(id);
          if (!stock) {
              return res.status(404).json({ message: 'Stock not found' });
          }
          res.json(stock);
      } catch (error) {
          res.status(500).json({ message: 'Error fetching stock' });
      }
  }
}