import { transport } from "../config/nodemailer"

type EmailType = {
    name: string
    email: string
    token: string

}
export class AuthEmail {
    static sendConfirmationEmail = async (user: EmailType) => {
        console.log('TEST', user)

        const email = await transport.sendMail({
            from: 'CashFinance <kevinguaman@outlook.com>',
            to: user.email, 
            subject: 'CashFinance - Confirma tu cuenta',
            html: `
                <h1>Hola: ${user.name},</h1>
                <p>Gracias por registrarte en CashFinance.</p>
                <p>Haz clic en el siguiente enlace para confirmar tu cuenta:</p>
                <p>Ingresa el codigo: <b>${user.token}</b></p>

                git remote add origin https://github.com/Gabrielzinho09/Finance-Credit
                https://github.com/Gabrielzinho09/Finance-Credit
                <a href="#">Confirmar cuenta</a>
            `,
        })

        console.log("Correo enviado:", email.messageId)
    }
}