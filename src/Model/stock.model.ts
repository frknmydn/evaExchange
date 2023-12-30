import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db';
import { StockSchema } from '../Schema/stock.schema';

interface StockAttributes {
  id?: number; // Optional because it's auto-generated
  name: string;
  symbol: string;
  currentPrice: number;
}

class Stock extends Model<StockAttributes, StockAttributes> {
  id?: number;
  name!: string;
  symbol!: string;
  currentPrice!: number; // Add type assertion here to indicate currentPrice exists
}

Stock.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    symbol: {
      type: DataTypes.STRING(3),
      allowNull: false,
      unique: true,
    },
    currentPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Stock',
    timestamps: true,
    hooks: {
      beforeValidate: (stock: Stock) => {
        const result = StockSchema.safeParse({
          name: stock.getDataValue('name'),
          symbol: stock.getDataValue('symbol'),
          currentPrice: stock.getDataValue('currentPrice'),
        });

        if (!result.success) {
          throw new Error(`Validation failed: ${result.error.message}`);
        }
      },
    },
  }
);

export default Stock;
