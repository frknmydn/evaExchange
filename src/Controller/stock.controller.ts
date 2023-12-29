import { Request,Response } from "express";
import { StockService } from "../Services/stock.service";

export class StockController{
    private stockService: StockService

    constructor(stockService: StockService){
        this.stockService=stockService;
    }

    async getStock(req:Request,res:Response){
        // TODO: implement logic
    }

    async updateStockPrice(req:Request, res:Response){
        //TODO: implement logic
    }
}