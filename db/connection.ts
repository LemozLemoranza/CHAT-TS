import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();


const db = new Sequelize(

    process.env.DB as string, 

    process.env.USUARIO as string, 

    process.env.PASS as string, 


{
    host:process.env.HOST as string,
    dialect: 'mysql'
})

export default db;