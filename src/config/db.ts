import dotenv from 'dotenv'
dotenv.config({path:'../.env'})

import { Dialect, Sequelize } from "sequelize";


const dbName = process.env.DB_NAME || 'default_db_name';
const dbUser = process.env.DB_USER || 'default_user';
const dbPassword = process.env.DB_PASSWORD || 'default_password';
const dbHost = process.env.DB_HOST || 'localhost';

const dbDialect = (process.env.DB_DIALECT || 'postgres') as Dialect;

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: dbDialect,
    logging: false, 
});

export default sequelize;
