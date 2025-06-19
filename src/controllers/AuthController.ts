import type { Request, Response } from 'express'
import User from '../models/User'
import { hashPassword } from '../utils/auth'
import { generateToken } from '../utils/token';
import { AuthEmail } from '../emails/AuthEmail';

//el controlador será una clase 
export class AuthController {
    //el metodo estatico no requiere instanciar la clase 
    //obtener los creditos
    static createAccount = async (req: Request, res: Response) => {
        //extraemos email
        //desestructuramos el email del request emitido por peticion http post
        const { email, password } = req.body

        //prevenir duplicados
        //buscamos un usuario por su email
        const userExist = await User.findOne({ where: { email } })
        //en caso de existir usuario por ese email enviamos una excepeción 
        if (userExist) {
            const error = new Error('Usuario con ese email ya existe')
            res.status(409).json({ error: error.message })
            return

        }
        try {
            const user = new User(req.body)
            //encriptamos el password
            user.password = await hashPassword(password)
            //const token = generateToken()
            user.token = generateToken()
            await user.save()
            await AuthEmail.sendConfirmationEmail({
                name : user.name,
                email: user.email,
                token: user.token
            })
            res.status(201).json({ message: 'Usuario registrado con exito', user })
        } catch (error) {
            //console.log(error)

            res.status(500).json({ error: 'Hubo un error' })
        }
    }


}