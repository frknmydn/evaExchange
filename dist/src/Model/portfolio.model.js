"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../config/db"));
class Portfolio extends sequelize_1.Model {
}
Portfolio.init({
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users', // Bu modelin adı veritabanınızdaki tablo adı ile eşleşmeli
            key: 'id'
        },
        primaryKey: true
    },
    stockId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Stocks', // Bu modelin adı veritabanınızdaki tablo adı ile eşleşmeli
            key: 'id'
        },
        primaryKey: true
    },
    quantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize: db_1.default,
    modelName: 'Portfolio',
    timestamps: true,
    //freezeTableName: true
});
exports.default = Portfolio;
