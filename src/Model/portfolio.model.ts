import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db';

class Portfolio extends Model {
  public userId!: number; 
  public stockId!: number;
  public quantity!: number;
}

Portfolio.init({
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users', // Bu modelin adı veritabanınızdaki tablo adı ile eşleşmeli
      key: 'id'
    },
    primaryKey: true
  },
  stockId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Stocks', // Bu modelin adı veritabanınızdaki tablo adı ile eşleşmeli
      key: 'id'
    },
    primaryKey: true
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Portfolio',
  timestamps: true,
  //freezeTableName: true
});


export default Portfolio;
