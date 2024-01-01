"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: '../.env' });
console.log("Current working directory:", process.cwd());
const db_1 = __importDefault(require("./config/db"));
const associations_1 = __importDefault(require("./Model/associations"));
const express_1 = __importDefault(require("express"));
const user_router_1 = __importDefault(require("./Routes/user.router"));
const stock_routes_1 = __importDefault(require("./Routes/stock.routes"));
const portfolio_routes_1 = __importDefault(require("./Routes/portfolio.routes"));
const transaction_routes_1 = __importDefault(require("./Routes/transaction.routes"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swaggerDefinition_1 = __importDefault(require("./swaggerDefinition"));
//For testing users and stocks bcuz task says that 
const stock_service_1 = require("./Services/stock.service");
const user_service_1 = require("./Services/user.service");
const stockService = new stock_service_1.StockService();
const userService = new user_service_1.UserService();
const testStocks = [
    { symbol: 'ABC', name: 'Alpha Beta Corp', currentPrice: 100.00 },
    { symbol: 'XYZ', name: 'XX YY ZZ CORP', currentPrice: 150.00 }
];
const testUsers = [
    { name: 'furkan meydan', email: 'furkan@test.com', password: 'password123', balance: 1500 },
    { name: 'test user1', email: 'test@test.com', password: 'password123', balance: 1100 },
    { name: 'test user2', email: 'test2@test.com', password: 'password123', balance: 11500 },
    { name: 'test user 3', email: 'test3@test.com', password: 'password123', balance: 100 },
    { name: 'testy user4', email: 'test4@test.com', password: 'password123', balance: 275 },
];
const app = (0, express_1.default)();
app.use(express_1.default.json());
const swaggerSpec = (0, swagger_jsdoc_1.default)(swaggerDefinition_1.default);
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
app.use(user_router_1.default);
app.use(stock_routes_1.default);
app.use(portfolio_routes_1.default);
app.use(transaction_routes_1.default);
const PORT = process.env.PORT || 3000;
(0, associations_1.default)();
db_1.default.authenticate()
    .then(() => {
    console.log('Veritabanına başarıyla bağlanıldı.');
    return db_1.default.sync({ force: true }); // sequelize.sync() should be in here 
})
    .then(() => {
    console.log('Tablolar başarıyla oluşturuldu.');
    // Initialize test data after tables are created
    return initializeDbTestData();
})
    .then(() => {
    console.log('Test data created successfully');
})
    .catch(err => console.error('Veritabanı bağlantı hatası:', err));
app.listen(PORT, () => {
    console.log(`server is running ${PORT}`);
});
function initializeDbTestData() {
    return __awaiter(this, void 0, void 0, function* () {
        for (const stockData of testStocks) {
            try {
                const stock = yield stockService.createStock(stockData);
                //console.log('Stock created:', stock);
            }
            catch (error) {
                //console.error('Error creating stock:', error);
            }
        }
        for (const userData of testUsers) {
            try {
                const user = yield userService.createUser(userData);
                //console.log('User created:', user);
            }
            catch (error) {
                //console.error('Error creating user:', error);
            }
        }
    });
}
