import 'dotenv/config';
import sequelize from './config/db'; // Dikkat: İthal ettiğiniz değişken adı 'sequalize' yerine 'sequelize' olmalı.
import setupAssociations from './Model/associations';
import express from "express";
import userRoutes from "./Routes/user.router";
import stockRoutes from "./Routes/stock.routes"
import portfolioRoutes from "./Routes/portfolio.routes"
import transactionRoutes from "./Routes/transaction.routes"

const app = express();
app.use(express.json());
app.use(userRoutes);
app.use(stockRoutes);
app.use(portfolioRoutes);
app.use(transactionRoutes);
const PORT = process.env.PORT || 3000;

setupAssociations();

sequelize.authenticate()
  .then(() => {
    console.log('Veritabanına başarıyla bağlanıldı.');
    return sequelize.sync({ force: true }); // sequelize.sync() burada çağrılıyor.
  })
  .then(() => {
    console.log('Tablolar başarıyla oluşturuldu.');
  })
  .catch(err => console.error('Veritabanı bağlantı hatası:', err));

app.listen(PORT, ()=>{
    console.log(`server is running ${PORT}`)
});

