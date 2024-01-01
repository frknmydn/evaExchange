import dotenv from 'dotenv'
dotenv.config({path:'../.env'})
console.log("Current working directory:", process.cwd());
import sequelize from './config/db'; 
import setupAssociations from './Model/associations';
import express from "express";
import userRoutes from "./Routes/user.router";
import stockRoutes from "./Routes/stock.routes"
import portfolioRoutes from "./Routes/portfolio.routes"
import transactionRoutes from "./Routes/transaction.routes"

import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import swaggerOptions from "./swaggerDefinition";

//For testing users and stocks bcuz task says that 
import { StockService } from './Services/stock.service';
import { UserService } from './Services/user.service';
const stockService = new StockService();
const userService = new UserService();
const testStocks = [
  { symbol: 'ABC', name: 'Alpha Beta Corp', currentPrice: 100.00 },
  { symbol: 'XYZ', name: 'XX YY ZZ CORP', currentPrice: 150.00 }
];
const testUsers = [
  { name: 'furkan meydan', email: 'furkan@test.com', password: 'password123',balance:1500 },
  { name: 'test user1', email: 'test@test.com', password: 'password123',balance:1100 },
  { name: 'test user2', email: 'test2@test.com', password: 'password123',balance:11500 },
  { name: 'test user 3', email: 'test3@test.com', password: 'password123',balance:100 },
  { name: 'testy user4', email: 'test4@test.com', password: 'password123',balance:275 },
];


const app = express();
app.use(express.json());
const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(userRoutes);
app.use(stockRoutes);
app.use(portfolioRoutes);
app.use(transactionRoutes);
const PORT = process.env.PORT || 3000;

setupAssociations();

sequelize.authenticate()
  .then(() => {
    console.log('Veritabanına başarıyla bağlanıldı.');
    return sequelize.sync({ force: true }); // sequelize.sync() should be in here 
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

app.listen(PORT, ()=>{
    console.log(`server is running ${PORT}`)
});

async function initializeDbTestData() {
  for (const stockData of testStocks) {
    try {
      const stock = await stockService.createStock(stockData);
      //console.log('Stock created:', stock);
    } catch (error) {
      //console.error('Error creating stock:', error);
    }
  }

  for (const userData of testUsers) {
    try {
      const user = await userService.createUser(userData);
      //console.log('User created:', user);
    } catch (error) {
      //console.error('Error creating user:', error);
    }
  }
}