// models/associations.js

import User from './user.model';
import Stock from './stock.model';
import Transaction from './transaction.model';
import Portfolio from './portfolio.model';

const setupAssociations = () => {
  User.hasMany(Transaction, { foreignKey: 'userId' });
  Transaction.belongsTo(User, { foreignKey: 'userId' });

  User.hasMany(Portfolio, { foreignKey: 'userId' });
  Portfolio.belongsTo(User, { foreignKey: 'userId' });

  Stock.hasMany(Transaction, { foreignKey: 'stockId' });
  Transaction.belongsTo(Stock, { foreignKey: 'stockId' });

  Stock.hasMany(Portfolio, { foreignKey: 'stockId' });
  Portfolio.belongsTo(Stock, { foreignKey: 'stockId' });
};

export default setupAssociations;
