"use strict";
// models/associations.js
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("./user.model"));
const stock_model_1 = __importDefault(require("./stock.model"));
const transaction_model_1 = __importDefault(require("./transaction.model"));
const portfolio_model_1 = __importDefault(require("./portfolio.model"));
const setupAssociations = () => {
    user_model_1.default.hasMany(transaction_model_1.default, { foreignKey: 'userId' });
    transaction_model_1.default.belongsTo(user_model_1.default, { foreignKey: 'userId' });
    user_model_1.default.hasMany(portfolio_model_1.default, { foreignKey: 'userId' });
    portfolio_model_1.default.belongsTo(user_model_1.default, { foreignKey: 'userId' });
    stock_model_1.default.hasMany(transaction_model_1.default, { foreignKey: 'stockId' });
    transaction_model_1.default.belongsTo(stock_model_1.default, { foreignKey: 'stockId' });
    stock_model_1.default.hasMany(portfolio_model_1.default, { foreignKey: 'stockId' });
    portfolio_model_1.default.belongsTo(stock_model_1.default, { foreignKey: 'stockId' });
};
exports.default = setupAssociations;
