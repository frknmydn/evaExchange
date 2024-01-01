"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../config/db"));
const stock_schema_1 = require("../Schema/stock.schema");
class Stock extends sequelize_1.Model {
}
Stock.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    symbol: {
        type: sequelize_1.DataTypes.STRING(3),
        allowNull: false,
        unique: true,
    },
    currentPrice: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
}, {
    sequelize: db_1.default,
    modelName: 'Stock',
    timestamps: true,
    hooks: {
        beforeValidate: (stock) => {
            const result = stock_schema_1.StockSchema.safeParse({
                name: stock.getDataValue('name'),
                symbol: stock.getDataValue('symbol'),
                currentPrice: stock.getDataValue('currentPrice'),
            });
            if (!result.success) {
                throw new Error(`Validation failed: ${result.error.message}`);
            }
        },
    },
});
exports.default = Stock;
