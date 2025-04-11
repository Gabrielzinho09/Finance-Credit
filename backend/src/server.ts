import express from 'express'
import colors from 'colors'
import morgan from 'morgan'
import { db } from './config/db';
//usamos archivo router credit
import creditRouter from './routes/creditRouter';

async function connectDB() {
    try {
        //autenticacion de PG
        await db.authenticate()
        //una vez que se crea los modelos el metodo sync nos crea las tablas en la bdd
        console.log(colors.blue.bold('Conexion exitosa a la BD'))
        db.sync()
        
    } catch (error) {
        console.log('Error en la conexion BD: ', error)
        console.log(colors.blue.bold('Fallo la conexion a la BD'))
    }
}
connectDB()

const app = express()

app.use(morgan('dev'))

app.use(express.json())

// nombramos la ruta y llamamos  
app.use('/api/credits', creditRouter)

export default app