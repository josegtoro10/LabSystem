import {Sequelize} from "sequelize";
import dotenv from "dotenv";
dotenv.config();


const db = new Sequelize(process.env.BD, process.env.USER, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: process.env.DIALECT
});

export default db;