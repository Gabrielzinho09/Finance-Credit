import nodemailer from 'nodemailer'
//USAMOS LAS VARIABLES DE ENTORNO 
import dotenv from 'dotenv'
dotenv.config()
//CONEXION A NODEMAILER
const config = () => {
    return {
        host: process.env.EMAIL_HOST,
        //infiere que es de tipo number el signo +
        port: +process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
        tls: {
            ciphers: 'SSLv3'
        }
    }
}
// Looking to send emails in production? Check out our Email API/SMTP product!
export const transport = nodemailer.createTransport(config());