import colors from 'colors'
import app from './server'


//obtener el puerto desde variable .env caso contrario escucha puerto 4000
const port = process.env.PORT || 4000

// rest api se escucha en puerto 4000 
app.listen(port, () => {
    console.log( colors.cyan.bold( `REST API en el puerto ${port}`))
})
