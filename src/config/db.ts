import { Sequelize } from "sequelize-typescript";
import dotenv from 'dotenv';
//toma el archivo dotenv desde la raiz por eso no escoge directorio
dotenv.config()

const isLocal = process.env.DATABASE_URL?.includes('localhost');

export const db = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',

    //debemos decirle a sequelize donde van a estar los modelos
    //e incluye todos los archivos que esten en models
    models: [__dirname + '/../models/**/*'],
    //en localhost no requerimos ssl
    dialectOptions: isLocal ? {} : {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        }
    },
    logging: false,
})